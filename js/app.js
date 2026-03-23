/* ════════════════════════════════════════════
   PCK Study Tool — Application Logic
   ════════════════════════════════════════════ */

(function () {
  'use strict';

  /* ── Utility: Levenshtein distance ── */
  function levenshtein(a, b) {
    var m = a.length, n = b.length;
    var dp = [];
    for (var i = 0; i <= m; i++) {
      dp[i] = [i];
      for (var j = 1; j <= n; j++) {
        dp[i][j] = i === 0 ? j : 0;
      }
    }
    for (var i = 1; i <= m; i++) {
      for (var j = 1; j <= n; j++) {
        if (a[i - 1] === b[j - 1]) {
          dp[i][j] = dp[i - 1][j - 1];
        } else {
          dp[i][j] = 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);
        }
      }
    }
    return dp[m][n];
  }

  /* ── Utility: Normalize text for search (lowercase, strip hyphens/punctuation, collapse whitespace) ── */
  function searchNormalize(s) {
    return s.toLowerCase().replace(/[-\/\\.,;:!?'"()[\]{}]/g, '').replace(/\s+/g, ' ').trim();
  }

  /* ── Utility: Strip HTML tags for search ── */
  function stripHtml(html) {
    var tmp = document.createElement('div');
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || '';
  }

  /* ── Utility: Check if query word matches any word in a word list (substring match, no edit distance) ── */
  function wordFuzzyMatch(queryWord, targetWords) {
    for (var i = 0; i < targetWords.length; i++) {
      if (targetWords[i].indexOf(queryWord) !== -1) return true;
    }
    return false;
  }

  /* ── Utility: Get searchable text from a note ── */
  function getNoteSearchText(note) {
    var parts = [note.title, note.chapter, note.type];
    var c = note.content;
    if (typeof c === 'string') {
      parts.push(stripHtml(c));
    } else if (c && c.misconception) {
      parts.push(stripHtml(c.misconception), stripHtml(c.correction));
    } else if (c && c.left) {
      parts.push(c.left.label, stripHtml(c.left.text), c.right.label, stripHtml(c.right.text));
    } else if (c && c.headers) {
      parts.push(c.headers.join(' '));
      c.rows.forEach(function (r) { parts.push(r.join(' ')); });
    } else if (Array.isArray(c)) {
      c.forEach(function (item) { parts.push(stripHtml(item)); });
    }
    return parts.join(' ');
  }

  /* ── Utility: Get normalized tag words from a note ── */
  function getNoteTags(note) {
    if (!note.tags || !note.tags.length) return [];
    return note.tags.map(function (t) { return searchNormalize(t); });
  }

  /* ── Search: Score a note against a query. Returns 0 (no match) or positive score (higher = better match) ── */
  function scoreNote(note, queryWords) {
    if (!queryWords.length) return 1; // no query = show all, equal score
    var tagText = getNoteTags(note);
    var tagWords = tagText.join(' ').split(/\s+/).filter(Boolean);
    var contentText = searchNormalize(getNoteSearchText(note));
    var contentWords = contentText.split(/\s+/).filter(Boolean);
    var score = 0;
    for (var i = 0; i < queryWords.length; i++) {
      var qw = queryWords[i];
      var matched = false;
      // Check tags first (higher weight)
      // Exact tag-level match (query matches a full normalized tag)
      for (var t = 0; t < tagText.length; t++) {
        if (tagText[t] === qw || tagText[t].indexOf(qw) !== -1) {
          score += 10;
          matched = true;
          break;
        }
      }
      if (!matched && wordFuzzyMatch(qw, tagWords)) {
        score += 5;
        matched = true;
      }
      // Check content (lower weight)
      if (!matched && contentText.indexOf(qw) !== -1) {
        score += 3;
        matched = true;
      }
      if (!matched && wordFuzzyMatch(qw, contentWords)) {
        score += 1;
        matched = true;
      }
      if (!matched) return 0; // all query words must match something
    }
    return score;
  }

  /* ══════════════════════════════════════════
     MODE SWITCHING
     ══════════════════════════════════════════ */

  var modes = ['browse', 'flashcards', 'quiz'];
  var tabs = document.querySelectorAll('.nav-tab');

  tabs.forEach(function (tab) {
    tab.addEventListener('click', function () {
      var mode = this.getAttribute('data-mode');
      modes.forEach(function (m) {
        document.getElementById('mode-' + m).classList.toggle('active', m === mode);
      });
      tabs.forEach(function (t) {
        t.classList.toggle('active', t.getAttribute('data-mode') === mode);
      });
    });
  });

  /* Keyboard shortcut: / to focus search */
  document.addEventListener('keydown', function (e) {
    if (e.key === '/' && document.activeElement.tagName !== 'INPUT' && document.activeElement.tagName !== 'TEXTAREA') {
      e.preventDefault();
      var searchInput = document.getElementById('browse-search');
      if (searchInput) searchInput.focus();
    }
  });

  /* ══════════════════════════════════════════
     BROWSE MODE
     ══════════════════════════════════════════ */

  var activeChapter = null;

  function initBrowse() {
    buildChapterTags();
    renderCards();

    document.getElementById('browse-search').addEventListener('input', function () {
      renderCards();
    });
  }

  function buildChapterTags() {
    var container = document.getElementById('chapter-tags');
    container.innerHTML = '';
    var chapters = Object.keys(CHAPTER_LABELS);
    chapters.forEach(function (ch) {
      var btn = document.createElement('button');
      btn.className = 'tag-pill';
      btn.setAttribute('data-color', CHAPTER_COLORS[ch]);
      btn.setAttribute('data-chapter', ch);
      btn.textContent = CHAPTER_LABELS[ch];
      btn.addEventListener('click', function () {
        if (activeChapter === ch) {
          activeChapter = null;
          btn.classList.remove('active');
        } else {
          /* Deselect previous */
          var prev = container.querySelector('.tag-pill.active');
          if (prev) prev.classList.remove('active');
          activeChapter = ch;
          btn.classList.add('active');
        }
        renderCards();
      });
      container.appendChild(btn);
    });
  }

  function filterNotes() {
    var query = document.getElementById('browse-search').value.trim();
    var queryWords = query ? searchNormalize(query).split(/\s+/).filter(Boolean) : [];
    var scored = [];
    for (var i = 0; i < NOTES.length; i++) {
      var note = NOTES[i];
      if (activeChapter && note.chapter !== activeChapter) continue;
      var s = scoreNote(note, queryWords);
      if (s > 0) scored.push({ note: note, score: s });
    }
    // Sort by score descending when there's a query, otherwise keep original order
    if (queryWords.length) {
      scored.sort(function (a, b) { return b.score - a.score; });
    }
    return scored.map(function (item) { return item.note; });
  }

  function renderCards() {
    var grid = document.getElementById('card-grid');
    var filtered = filterNotes();
    var count = document.getElementById('results-count');
    count.textContent = 'Showing ' + filtered.length + ' card' + (filtered.length !== 1 ? 's' : '');

    grid.innerHTML = '';
    filtered.forEach(function (note) {
      grid.appendChild(createCardEl(note));
    });
  }

  function createCardEl(note) {
    var card = document.createElement('div');
    card.className = 'browse-card';

    var color = CHAPTER_COLORS[note.chapter] || 'slate';
    var header = document.createElement('div');
    header.className = 'card-header hdr-' + color;

    var title = document.createElement('span');
    title.className = 'card-header-title';
    title.textContent = note.title;

    var typeBadge = document.createElement('span');
    typeBadge.className = 'card-header-type';
    typeBadge.textContent = note.type;

    header.appendChild(title);
    header.appendChild(typeBadge);
    card.appendChild(header);

    var content = document.createElement('div');
    content.className = 'card-content';
    content.appendChild(renderCardContent(note));
    card.appendChild(content);

    return card;
  }

  function renderCardContent(note) {
    var c = note.content;
    var type = note.type;
    var frag = document.createDocumentFragment();

    if (type === 'definition') {
      var div = document.createElement('div');
      div.className = 'card-term';
      div.innerHTML = typeof c === 'string' ? c : '';
      frag.appendChild(div);

    } else if (type === 'comparison' && c && c.left) {
      var grid = document.createElement('div');
      grid.className = 'card-comparison';

      var colL = document.createElement('div');
      colL.className = 'card-compare-col';
      var labelL = document.createElement('div');
      labelL.className = 'card-compare-label';
      labelL.style.color = '#818CF8';
      labelL.textContent = c.left.label;
      colL.appendChild(labelL);
      colL.insertAdjacentHTML('beforeend', c.left.text);

      var colR = document.createElement('div');
      colR.className = 'card-compare-col';
      var labelR = document.createElement('div');
      labelR.className = 'card-compare-label';
      labelR.style.color = '#A78BFA';
      labelR.textContent = c.right.label;
      colR.appendChild(labelR);
      colR.insertAdjacentHTML('beforeend', c.right.text);

      grid.appendChild(colL);
      grid.appendChild(colR);
      frag.appendChild(grid);

    } else if (type === 'list' && Array.isArray(c)) {
      var ul = document.createElement('ul');
      ul.className = 'card-list';
      c.forEach(function (item) {
        var li = document.createElement('li');
        li.innerHTML = item;
        ul.appendChild(li);
      });
      frag.appendChild(ul);

    } else if (type === 'table' && c && c.headers) {
      var table = document.createElement('table');
      table.className = 'card-table';
      var thead = document.createElement('tr');
      c.headers.forEach(function (h) {
        var th = document.createElement('th');
        th.textContent = h;
        thead.appendChild(th);
      });
      table.appendChild(thead);
      c.rows.forEach(function (row) {
        var tr = document.createElement('tr');
        row.forEach(function (cell) {
          var td = document.createElement('td');
          td.innerHTML = cell;
          tr.appendChild(td);
        });
        table.appendChild(tr);
      });
      frag.appendChild(table);

    } else if (type === 'misconception' && c && c.misconception) {
      var label = document.createElement('div');
      label.className = 'card-misconception-label';
      label.textContent = 'Common Misconception';
      frag.appendChild(label);

      var body = document.createElement('div');
      body.className = 'card-body';
      body.innerHTML = c.misconception;
      frag.appendChild(body);

      var correction = document.createElement('div');
      correction.className = 'card-correction';
      correction.innerHTML = c.correction;
      frag.appendChild(correction);

    } else {
      /* concept, technique, principle, example — generic body */
      var div = document.createElement('div');
      div.className = 'card-body';
      div.innerHTML = typeof c === 'string' ? c : '';
      frag.appendChild(div);
    }

    return frag;
  }

  /* ══════════════════════════════════════════
     FLASHCARD MODE — Spaced Repetition Drill
     ══════════════════════════════════════════ */

  var FC_STORAGE_KEY = 'pck-drill-state';

  var fcDrill = {
    primaryQueue: [],    /* [{cardId, easyCount}] */
    secondaryQueue: [],  /* [{cardId, easyCount}] */
    masteredCount: 0,
    totalCards: 0,
    topicFilter: 'all',
    flipped: false
  };

  function fcSaveState() {
    try {
      localStorage.setItem(FC_STORAGE_KEY, JSON.stringify({
        primaryQueue: fcDrill.primaryQueue,
        secondaryQueue: fcDrill.secondaryQueue,
        masteredCount: fcDrill.masteredCount,
        totalCards: fcDrill.totalCards,
        topicFilter: fcDrill.topicFilter
      }));
    } catch (e) {}
  }

  function fcLoadState() {
    try {
      var raw = localStorage.getItem(FC_STORAGE_KEY);
      if (!raw) return false;
      var data = JSON.parse(raw);
      fcDrill.primaryQueue = data.primaryQueue || [];
      fcDrill.secondaryQueue = data.secondaryQueue || [];
      fcDrill.masteredCount = data.masteredCount || 0;
      fcDrill.totalCards = data.totalCards || 0;
      fcDrill.topicFilter = data.topicFilter || 'all';
      return true;
    } catch (e) { return false; }
  }

  function fcBuildDeck() {
    var filter = fcDrill.topicFilter;
    var cards = filter === 'all'
      ? FLASHCARDS.slice()
      : FLASHCARDS.filter(function (fc) { return fc.chapter === filter; });
    fcDrill.totalCards = cards.length;
    fcDrill.primaryQueue = cards.map(function (fc) { return { cardId: fc.id, easyCount: 0 }; });
    fcDrill.secondaryQueue = [];
    fcDrill.masteredCount = 0;
  }

  function fcGetCard(id) {
    for (var i = 0; i < FLASHCARDS.length; i++) {
      if (FLASHCARDS[i].id === id) return FLASHCARDS[i];
    }
    return null;
  }

  function fcInsertAt(entry, position) {
    var pos = Math.min(position, fcDrill.primaryQueue.length);
    fcDrill.primaryQueue.splice(pos, 0, entry);
  }

  function fcPromoteIfNeeded() {
    if (fcDrill.primaryQueue.length === 0 && fcDrill.secondaryQueue.length > 0) {
      fcDrill.primaryQueue = fcDrill.secondaryQueue.slice();
      fcDrill.secondaryQueue = [];
    }
  }

  function fcRate(rating) {
    if (fcDrill.primaryQueue.length === 0) return;
    var entry = fcDrill.primaryQueue.shift();

    if (rating === 'easy') {
      entry.easyCount = (entry.easyCount || 0) + 1;
      if (entry.easyCount >= 2) {
        fcDrill.masteredCount++;
      } else {
        fcInsertAt(entry, 16);
      }
    } else {
      var positions = { again: 2, hard: 4, good: 8 };
      fcInsertAt(entry, positions[rating]);
    }

    fcPromoteIfNeeded();
    fcDrill.flipped = false;
    fcSaveState();
    renderFcDrill();
  }

  function fcSkip() {
    if (fcDrill.primaryQueue.length === 0) return;
    var entry = fcDrill.primaryQueue.shift();
    fcDrill.secondaryQueue.push(entry);
    fcPromoteIfNeeded();
    fcDrill.flipped = false;
    fcSaveState();
    renderFcDrill();
  }

  function fcReset() {
    try { localStorage.removeItem(FC_STORAGE_KEY); } catch (e) {}
    fcBuildDeck();
    fcDrill.flipped = false;
    fcSaveState();
    renderFcDrill();
  }

  function renderFcDrill() {
    var card = document.getElementById('fc-card');
    var front = document.getElementById('fc-front');
    var back = document.getElementById('fc-back');
    var tag = document.getElementById('fc-topic-tag');
    var counter = document.getElementById('fc-counter');
    var mastered = document.getElementById('fc-mastered');
    var progress = document.getElementById('fc-progress');
    var ratingRow = document.getElementById('fc-rating');
    var skipBtn = document.getElementById('fc-skip');

    var isDone = fcDrill.totalCards > 0 &&
      fcDrill.primaryQueue.length === 0 &&
      fcDrill.secondaryQueue.length === 0;

    var pct = fcDrill.totalCards > 0 ? (fcDrill.masteredCount / fcDrill.totalCards * 100) : 0;
    progress.style.width = pct + '%';

    if (fcDrill.totalCards === 0) {
      card.classList.remove('flipped');
      front.textContent = 'No flashcards for this topic.';
      back.innerHTML = '';
      tag.textContent = '';
      counter.textContent = '0 remaining';
      mastered.textContent = '';
      ratingRow.style.display = 'none';
      skipBtn.style.visibility = 'hidden';
      return;
    }

    if (isDone) {
      card.classList.remove('flipped');
      front.textContent = 'All ' + fcDrill.totalCards + ' cards mastered!';
      back.innerHTML = '';
      tag.textContent = '';
      counter.textContent = '0 remaining';
      mastered.textContent = fcDrill.masteredCount + '/' + fcDrill.totalCards + ' mastered';
      ratingRow.style.display = 'none';
      skipBtn.style.visibility = 'hidden';
      return;
    }

    var entry = fcDrill.primaryQueue[0];
    var fc = fcGetCard(entry.cardId);
    if (!fc) return;

    var remaining = fcDrill.primaryQueue.length + fcDrill.secondaryQueue.length;
    counter.textContent = remaining + ' remaining';
    mastered.textContent = fcDrill.masteredCount + '/' + fcDrill.totalCards + ' mastered';

    card.classList.toggle('flipped', fcDrill.flipped);
    front.textContent = fc.front;
    back.innerHTML = fc.back;
    tag.textContent = CHAPTER_LABELS[fc.chapter] || fc.chapter;

    ratingRow.style.display = fcDrill.flipped ? 'flex' : 'none';
    skipBtn.style.visibility = '';
  }

  function populateFcFilter() {
    var select = document.getElementById('fc-topic-filter');
    select.innerHTML = '<option value="all">All Topics</option>';
    var chapters = [];
    FLASHCARDS.forEach(function (fc) {
      if (chapters.indexOf(fc.chapter) === -1) chapters.push(fc.chapter);
    });
    chapters.forEach(function (ch) {
      var opt = document.createElement('option');
      opt.value = ch;
      opt.textContent = CHAPTER_LABELS[ch] || ch;
      select.appendChild(opt);
    });
  }

  function initFlashcards() {
    populateFcFilter();

    var loaded = fcLoadState();
    if (!loaded) {
      fcBuildDeck();
      fcSaveState();
    }

    document.getElementById('fc-topic-filter').value = fcDrill.topicFilter;

    renderFcDrill();

    document.getElementById('fc-card').addEventListener('click', function () {
      if (fcDrill.primaryQueue.length === 0) return;
      fcDrill.flipped = !fcDrill.flipped;
      renderFcDrill();
    });

    document.getElementById('fc-again').addEventListener('click', function () { fcRate('again'); });
    document.getElementById('fc-hard').addEventListener('click', function () { fcRate('hard'); });
    document.getElementById('fc-good').addEventListener('click', function () { fcRate('good'); });
    document.getElementById('fc-easy').addEventListener('click', function () { fcRate('easy'); });

    document.getElementById('fc-skip').addEventListener('click', fcSkip);
    document.getElementById('fc-reset').addEventListener('click', fcReset);

    document.getElementById('fc-topic-filter').addEventListener('change', function () {
      fcDrill.topicFilter = this.value;
      fcBuildDeck();
      fcDrill.flipped = false;
      fcSaveState();
      renderFcDrill();
    });

    /* Keyboard: space to flip */
    document.addEventListener('keydown', function (e) {
      var fcSection = document.getElementById('mode-flashcards');
      if (!fcSection.classList.contains('active')) return;
      if (document.activeElement.tagName === 'INPUT' || document.activeElement.tagName === 'TEXTAREA' || document.activeElement.tagName === 'SELECT') return;
      if (e.key === ' ') { e.preventDefault(); document.getElementById('fc-card').click(); }
    });
  }

  /* ══════════════════════════════════════════
     QUIZ MODE
     ══════════════════════════════════════════ */

  var quizState = {
    questions: [],
    index: 0,
    score: 0,
    answered: false,
    answers: [] /* track user answers for review */
  };

  function initQuiz() {
    populateQuizFilter();
    rebuildQuiz();

    document.getElementById('quiz-topic-filter').addEventListener('change', function () {
      rebuildQuiz();
    });
  }

  function populateQuizFilter() {
    var select = document.getElementById('quiz-topic-filter');
    select.innerHTML = '<option value="all">All Topics</option>';
    var chapters = new Set();
    QUIZZES.forEach(function (q) { chapters.add(q.chapter); });
    chapters.forEach(function (ch) {
      var opt = document.createElement('option');
      opt.value = ch;
      opt.textContent = CHAPTER_LABELS[ch] || ch;
      select.appendChild(opt);
    });
  }

  function rebuildQuiz() {
    var filter = document.getElementById('quiz-topic-filter').value;
    if (filter === 'all') {
      quizState.questions = QUIZZES.slice();
    } else {
      quizState.questions = QUIZZES.filter(function (q) { return q.chapter === filter; });
    }
    quizState.index = 0;
    quizState.score = 0;
    quizState.answered = false;
    quizState.answers = [];
    renderQuizQuestion();
  }

  function renderQuizQuestion() {
    var area = document.getElementById('quiz-area');
    var counter = document.getElementById('quiz-counter');
    var progress = document.getElementById('quiz-progress');

    if (quizState.questions.length === 0) {
      area.innerHTML = '<div class="quiz-card"><div class="quiz-question">No quiz questions available.</div></div>';
      counter.textContent = '';
      progress.style.width = '0%';
      return;
    }

    if (quizState.index >= quizState.questions.length) {
      renderScoreSummary();
      return;
    }

    var q = quizState.questions[quizState.index];
    counter.textContent = 'Question ' + (quizState.index + 1) + ' of ' + quizState.questions.length;
    progress.style.width = ((quizState.index + 1) / quizState.questions.length * 100) + '%';

    if (q.format === 'mcq') {
      renderMCQ(q);
    } else {
      renderShortAnswer(q);
    }
  }

  function renderMCQ(q) {
    var area = document.getElementById('quiz-area');
    var letters = ['A', 'B', 'C', 'D', 'E', 'F'];
    var selectedIndex = -1;

    var card = document.createElement('div');
    card.className = 'quiz-card';

    var qNum = document.createElement('div');
    qNum.className = 'quiz-q-number';
    qNum.textContent = 'Question ' + (quizState.index + 1);
    card.appendChild(qNum);

    var qText = document.createElement('div');
    qText.className = 'quiz-question';
    qText.innerHTML = q.question;
    card.appendChild(qText);

    var optionEls = [];
    q.options.forEach(function (opt, i) {
      var label = document.createElement('label');
      label.className = 'quiz-option';

      var radio = document.createElement('input');
      radio.type = 'radio';
      radio.name = 'quiz-q-' + quizState.index;
      radio.style.display = 'none';

      var letter = document.createElement('span');
      letter.className = 'opt-letter';
      letter.textContent = letters[i] || (i + 1);

      var span = document.createElement('span');
      span.innerHTML = opt;

      label.appendChild(radio);
      label.appendChild(letter);
      label.appendChild(span);

      label.addEventListener('click', function () {
        if (quizState.answered) return;
        selectedIndex = i;
        optionEls.forEach(function (el) { el.classList.remove('selected'); });
        label.classList.add('selected');
      });

      optionEls.push(label);
      card.appendChild(label);
    });

    var submitBtn = document.createElement('button');
    submitBtn.className = 'btn-primary quiz-submit';
    submitBtn.textContent = 'Submit';
    submitBtn.addEventListener('click', function () {
      if (selectedIndex === -1 || quizState.answered) return;
      quizState.answered = true;

      var correct = q.answer;
      var isCorrect = selectedIndex === correct;
      if (isCorrect) quizState.score++;

      quizState.answers.push({
        question: q,
        userAnswer: selectedIndex,
        correct: isCorrect
      });

      optionEls.forEach(function (el, idx) {
        el.classList.remove('selected');
        if (idx === correct) {
          el.classList.add('correct-answer');
        } else if (idx === selectedIndex && !isCorrect) {
          el.classList.add('wrong-answer');
        } else {
          el.classList.add('dimmed');
        }
      });

      submitBtn.style.display = 'none';

      var feedback = document.createElement('div');
      feedback.className = 'feedback ' + (isCorrect ? 'feedback-correct' : 'feedback-wrong');
      var fbLabel = document.createElement('div');
      fbLabel.className = 'feedback-label';
      fbLabel.textContent = isCorrect ? 'Correct!' : 'Not quite.';
      feedback.appendChild(fbLabel);
      if (q.explanation) {
        var fbText = document.createElement('div');
        fbText.innerHTML = q.explanation;
        feedback.appendChild(fbText);
      }
      card.appendChild(feedback);

      var nextBtn = document.createElement('button');
      nextBtn.className = 'btn-primary quiz-next';
      nextBtn.textContent = 'Next Question \u2192';
      nextBtn.addEventListener('click', function () {
        quizState.index++;
        quizState.answered = false;
        renderQuizQuestion();
      });
      card.appendChild(nextBtn);
    });

    card.appendChild(submitBtn);
    area.innerHTML = '';
    area.appendChild(card);
  }

  function renderShortAnswer(q) {
    var area = document.getElementById('quiz-area');

    var card = document.createElement('div');
    card.className = 'quiz-card';

    var qNum = document.createElement('div');
    qNum.className = 'quiz-q-number';
    qNum.textContent = 'Question ' + (quizState.index + 1);
    card.appendChild(qNum);

    var qText = document.createElement('div');
    qText.className = 'quiz-question';
    qText.innerHTML = q.question;
    card.appendChild(qText);

    var row = document.createElement('div');
    row.className = 'quiz-sa-row';

    var input = document.createElement('input');
    input.type = 'text';
    input.className = 'quiz-sa-input';
    input.placeholder = 'Type your answer...';
    row.appendChild(input);

    var submitBtn = document.createElement('button');
    submitBtn.className = 'btn-primary';
    submitBtn.textContent = 'Submit';
    row.appendChild(submitBtn);

    card.appendChild(row);

    /* Submit on Enter */
    input.addEventListener('keydown', function (e) {
      if (e.key === 'Enter') submitBtn.click();
    });

    submitBtn.addEventListener('click', function () {
      if (quizState.answered) return;
      var userAnswer = input.value.trim();
      if (!userAnswer) return;

      quizState.answered = true;
      input.disabled = true;
      submitBtn.style.display = 'none';

      var result = checkShortAnswer(userAnswer, q.answer);
      if (result === 'correct') quizState.score++;

      quizState.answers.push({
        question: q,
        userAnswer: userAnswer,
        correct: result === 'correct'
      });

      var feedbackClass = result === 'correct' ? 'feedback-correct' : result === 'close' ? 'feedback-close' : 'feedback-wrong';
      var feedbackLabel = result === 'correct' ? 'Correct!' : result === 'close' ? 'Close!' : 'Not quite.';

      var feedback = document.createElement('div');
      feedback.className = 'feedback ' + feedbackClass;
      var fbLabel = document.createElement('div');
      fbLabel.className = 'feedback-label';
      fbLabel.textContent = feedbackLabel;
      feedback.appendChild(fbLabel);

      var expected = document.createElement('div');
      expected.textContent = 'Expected: "' + q.answer + '"';
      feedback.appendChild(expected);

      if (result === 'close') {
        var closeNote = document.createElement('div');
        closeNote.textContent = 'Your answer was close but not quite right.';
        feedback.appendChild(closeNote);
      }

      if (q.explanation) {
        var fbText = document.createElement('div');
        fbText.innerHTML = q.explanation;
        fbText.style.marginTop = '8px';
        feedback.appendChild(fbText);
      }

      card.appendChild(feedback);

      var nextBtn = document.createElement('button');
      nextBtn.className = 'btn-primary quiz-next';
      nextBtn.textContent = 'Next Question \u2192';
      nextBtn.addEventListener('click', function () {
        quizState.index++;
        quizState.answered = false;
        renderQuizQuestion();
      });
      card.appendChild(nextBtn);
    });

    area.innerHTML = '';
    area.appendChild(card);
    input.focus();
  }

  function checkShortAnswer(userAnswer, correctAnswer) {
    var norm = function (s) {
      return s.toLowerCase().replace(/[\s\-_\/,\.]+/g, ' ').replace(/[^a-z0-9 ]/g, '').trim();
    };
    var u = norm(userAnswer);
    var c = norm(correctAnswer);

    if (u === c) return 'correct';

    /* Check if Levenshtein distance is small relative to answer length */
    var dist = levenshtein(u, c);
    var threshold = Math.max(2, Math.floor(c.length * 0.25));
    if (dist <= threshold) return dist <= 1 ? 'correct' : 'close';

    return 'wrong';
  }

  function renderScoreSummary() {
    var area = document.getElementById('quiz-area');
    var total = quizState.questions.length;
    var score = quizState.score;
    var pct = total > 0 ? Math.round(score / total * 100) : 0;

    var counter = document.getElementById('quiz-counter');
    counter.textContent = 'Complete';
    var progress = document.getElementById('quiz-progress');
    progress.style.width = '100%';

    var html = '<div class="score-summary">' +
      '<h2>Quiz Complete</h2>' +
      '<div class="score-big">' + score + ' / ' + total + '</div>' +
      '<div class="score-pct">' + pct + '%</div>' +
      '<div class="score-actions">' +
        '<button class="btn-secondary" id="review-wrong">Review Wrong Answers</button>' +
        '<button class="btn-primary" id="quiz-retry">Retry</button>' +
      '</div>' +
    '</div>';

    area.innerHTML = html;

    document.getElementById('quiz-retry').addEventListener('click', function () {
      rebuildQuiz();
    });

    document.getElementById('review-wrong').addEventListener('click', function () {
      renderWrongReview();
    });
  }

  function renderWrongReview() {
    var area = document.getElementById('quiz-area');
    var wrong = quizState.answers.filter(function (a) { return !a.correct; });

    if (wrong.length === 0) {
      area.innerHTML = '<div class="quiz-card"><div class="quiz-question">Perfect score! Nothing to review.</div>' +
        '<button class="btn-primary quiz-next" id="back-to-score">Back</button></div>';
      document.getElementById('back-to-score').addEventListener('click', function () { renderScoreSummary(); });
      return;
    }

    var container = document.createDocumentFragment();
    var letters = ['A', 'B', 'C', 'D', 'E', 'F'];

    wrong.forEach(function (a, idx) {
      var q = a.question;
      var card = document.createElement('div');
      card.className = 'quiz-card';
      if (idx > 0) card.style.marginTop = '16px';

      var qNum = document.createElement('div');
      qNum.className = 'quiz-q-number';
      qNum.textContent = 'Question ' + (quizState.questions.indexOf(q) + 1);
      card.appendChild(qNum);

      var qText = document.createElement('div');
      qText.className = 'quiz-question';
      qText.innerHTML = q.question;
      card.appendChild(qText);

      if (q.format === 'mcq') {
        q.options.forEach(function (opt, i) {
          var label = document.createElement('div');
          label.className = 'quiz-option';
          if (i === q.answer) label.classList.add('correct-answer');
          else if (i === a.userAnswer) label.classList.add('wrong-answer');
          else label.classList.add('dimmed');

          var letter = document.createElement('span');
          letter.className = 'opt-letter';
          letter.textContent = letters[i];

          var span = document.createElement('span');
          span.innerHTML = opt;

          label.appendChild(letter);
          label.appendChild(span);
          card.appendChild(label);
        });
      } else {
        var row = document.createElement('div');
        row.className = 'quiz-sa-row';
        var inp = document.createElement('input');
        inp.type = 'text';
        inp.className = 'quiz-sa-input';
        inp.value = a.userAnswer;
        inp.disabled = true;
        row.appendChild(inp);
        card.appendChild(row);
      }

      if (q.explanation) {
        var feedback = document.createElement('div');
        feedback.className = 'feedback feedback-wrong';
        var fbLabel = document.createElement('div');
        fbLabel.className = 'feedback-label';
        fbLabel.textContent = q.format === 'short-answer' ? 'Expected: "' + q.answer + '"' : 'Explanation';
        feedback.appendChild(fbLabel);
        var fbText = document.createElement('div');
        fbText.innerHTML = q.explanation;
        feedback.appendChild(fbText);
        card.appendChild(feedback);
      }

      container.appendChild(card);
    });

    var backBtn = document.createElement('button');
    backBtn.className = 'btn-primary';
    backBtn.textContent = '\u2190 Back to Score';
    backBtn.style.marginTop = '20px';
    backBtn.addEventListener('click', function () { renderScoreSummary(); });
    container.appendChild(backBtn);

    area.innerHTML = '';
    area.appendChild(container);
  }

  /* ══════════════════════════════════════════
     INIT
     ══════════════════════════════════════════ */

  initBrowse();
  initFlashcards();
  initQuiz();

})();
