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

  /* ── Utility: Simple fuzzy match (case-insensitive substring) ── */
  function fuzzyMatch(text, query) {
    if (!query) return true;
    var t = text.toLowerCase();
    var words = query.toLowerCase().split(/\s+/).filter(Boolean);
    for (var i = 0; i < words.length; i++) {
      if (t.indexOf(words[i]) === -1) return false;
    }
    return true;
  }

  /* ── Utility: Strip HTML tags for search ── */
  function stripHtml(html) {
    var tmp = document.createElement('div');
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || '';
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

  var activeChapters = new Set();
  var activeTypes = new Set();

  function initBrowse() {
    buildChapterTags();
    buildTypeTags();
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
        if (activeChapters.has(ch)) {
          activeChapters.delete(ch);
          btn.classList.remove('active');
        } else {
          activeChapters.add(ch);
          btn.classList.add('active');
        }
        renderCards();
      });
      container.appendChild(btn);
    });
  }

  function buildTypeTags() {
    var container = document.getElementById('type-tags');
    container.innerHTML = '';
    /* Only show types that actually exist in the data */
    var existingTypes = new Set();
    NOTES.forEach(function (n) { existingTypes.add(n.type); });
    var types = CARD_TYPES.filter(function (t) { return existingTypes.has(t); });
    types.forEach(function (type) {
      var btn = document.createElement('button');
      btn.className = 'tag-pill';
      btn.setAttribute('data-type', '');
      btn.setAttribute('data-type-value', type);
      btn.textContent = type.charAt(0).toUpperCase() + type.slice(1);
      btn.addEventListener('click', function () {
        if (activeTypes.has(type)) {
          activeTypes.delete(type);
          btn.classList.remove('active');
        } else {
          activeTypes.add(type);
          btn.classList.add('active');
        }
        renderCards();
      });
      container.appendChild(btn);
    });
  }

  function filterNotes() {
    var query = document.getElementById('browse-search').value.trim();
    return NOTES.filter(function (note) {
      if (activeChapters.size > 0 && !activeChapters.has(note.chapter)) return false;
      if (activeTypes.size > 0 && !activeTypes.has(note.type)) return false;
      if (query && !fuzzyMatch(getNoteSearchText(note), query)) return false;
      return true;
    });
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
     FLASHCARD MODE
     ══════════════════════════════════════════ */

  var fcState = {
    deck: [],
    index: 0,
    flipped: false
  };

  function initFlashcards() {
    populateFcFilter();
    rebuildFcDeck();
    renderFlashcard();

    document.getElementById('fc-card').addEventListener('click', function () {
      fcState.flipped = !fcState.flipped;
      this.classList.toggle('flipped', fcState.flipped);
    });

    document.getElementById('fc-next').addEventListener('click', function () {
      if (fcState.deck.length === 0) return;
      fcState.index = (fcState.index + 1) % fcState.deck.length;
      fcState.flipped = false;
      renderFlashcard();
    });

    document.getElementById('fc-prev').addEventListener('click', function () {
      if (fcState.deck.length === 0) return;
      fcState.index = (fcState.index - 1 + fcState.deck.length) % fcState.deck.length;
      fcState.flipped = false;
      renderFlashcard();
    });

    document.getElementById('fc-shuffle').addEventListener('click', function () {
      shuffleDeck();
      fcState.index = 0;
      fcState.flipped = false;
      renderFlashcard();
    });

    document.getElementById('fc-topic-filter').addEventListener('change', function () {
      rebuildFcDeck();
      renderFlashcard();
    });

    /* Keyboard: arrows for prev/next, space to flip */
    document.addEventListener('keydown', function (e) {
      var fcSection = document.getElementById('mode-flashcards');
      if (!fcSection.classList.contains('active')) return;
      if (document.activeElement.tagName === 'INPUT' || document.activeElement.tagName === 'TEXTAREA' || document.activeElement.tagName === 'SELECT') return;
      if (e.key === 'ArrowRight') { document.getElementById('fc-next').click(); }
      else if (e.key === 'ArrowLeft') { document.getElementById('fc-prev').click(); }
      else if (e.key === ' ') { e.preventDefault(); document.getElementById('fc-card').click(); }
    });
  }

  function populateFcFilter() {
    var select = document.getElementById('fc-topic-filter');
    select.innerHTML = '<option value="all">All Topics</option>';
    var chapters = new Set();
    FLASHCARDS.forEach(function (fc) { chapters.add(fc.chapter); });
    chapters.forEach(function (ch) {
      var opt = document.createElement('option');
      opt.value = ch;
      opt.textContent = CHAPTER_LABELS[ch] || ch;
      select.appendChild(opt);
    });
  }

  function rebuildFcDeck() {
    var filter = document.getElementById('fc-topic-filter').value;
    if (filter === 'all') {
      fcState.deck = FLASHCARDS.slice();
    } else {
      fcState.deck = FLASHCARDS.filter(function (fc) { return fc.chapter === filter; });
    }
    fcState.index = 0;
    fcState.flipped = false;
  }

  function shuffleDeck() {
    var arr = fcState.deck;
    for (var i = arr.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var tmp = arr[i]; arr[i] = arr[j]; arr[j] = tmp;
    }
  }

  function renderFlashcard() {
    var card = document.getElementById('fc-card');
    var front = document.getElementById('fc-front');
    var back = document.getElementById('fc-back');
    var tag = document.getElementById('fc-topic-tag');
    var counter = document.getElementById('fc-counter');
    var progress = document.getElementById('fc-progress');

    card.classList.remove('flipped');

    if (fcState.deck.length === 0) {
      front.textContent = 'No flashcards available';
      back.innerHTML = '';
      tag.textContent = '';
      counter.textContent = '0 of 0';
      progress.style.width = '0%';
      return;
    }

    var fc = fcState.deck[fcState.index];
    front.textContent = fc.front;
    back.innerHTML = fc.back;
    tag.textContent = CHAPTER_LABELS[fc.chapter] || fc.chapter;
    counter.textContent = (fcState.index + 1) + ' of ' + fcState.deck.length;
    progress.style.width = ((fcState.index + 1) / fcState.deck.length * 100) + '%';
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
