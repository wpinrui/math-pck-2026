/* Chapter → color mapping used across all data files */
var CHAPTER_COLORS = {
  'L1': 'indigo',
  'L2': 'cyan',
  'L3': 'rose',
  'L4': 'amber',
  'L5': 'violet',
  'L6': 'emerald',
  'T1': 'orange',
  'T2a': 'teal',
  'T2b': 'pink',
  'T3': 'sky',
  'Study Sheet': 'slate'
};

var CHAPTER_LABELS = {
  'L1': 'L1: Curriculum',
  'L2': 'L2: Approaches 1',
  'L3': 'L3: ICT',
  'L4': 'L4: Approaches 2',
  'L5': 'L5: Unpacking',
  'L6': 'L6: Big Ideas',
  'T1': 'T1: Arithmetic',
  'T2a': 'T2: Algebra Intro',
  'T2b': 'T2: Algebra Exp/Fact',
  'T3': 'T3: Graphs',
  'Study Sheet': 'Study Sheet'
};

/* Card types used in Browse mode */
var CARD_TYPES = ['definition', 'comparison', 'list', 'table', 'misconception', 'concept', 'technique', 'principle', 'example'];

/*
 * NOTES — Browse mode cards
 * Each note: { id, title, chapter, type, content }
 * content is HTML string matching the card-body markup from the mockup.
 * type is one of: definition, comparison, list, table, misconception, concept, technique, principle, example
 *
 * Content rendering uses type to determine card layout:
 *   definition  → .card-term with <strong> lead
 *   comparison  → .card-comparison grid (content is { left: {label, text}, right: {label, text} })
 *   list        → .card-list <ul> (content is array of strings, may contain <strong>)
 *   table       → .card-table (content is { headers: [], rows: [[]] })
 *   misconception → .card-misconception-label + .card-body + .card-correction (content is { misconception, correction })
 *   concept/technique/principle/example → .card-body (content is HTML string)
 */
var NOTES = [

  // ===== L1 — Singapore Mathematics Curriculum =====

  {
    id: 'L2-01',
    title: 'Four Curriculum Types',
    chapter: 'L1',
    type: 'definition',
    tags: ["four curriculum types","curriculum types","intended curriculum","planned curriculum","enacted curriculum","experienced curriculum","MOE","Ministry of Education","national syllabus","scheme of work","curriculum gaps","curriculum levels","curriculum alignment"],
    content: '<table class="card-table"><tr><th>Type</th><th>Description</th></tr>' +
      '<tr><td><strong>Intended</strong></td><td>National syllabus (MOE)</td></tr>' +
      '<tr><td><strong>Planned</strong></td><td>School-level scheme of work, materials</td></tr>' +
      '<tr><td><strong>Enacted</strong></td><td>What teacher actually teaches in class</td></tr>' +
      '<tr><td><strong>Experienced</strong></td><td>What students actually learn</td></tr></table>' +
      'Gaps between each level are where learning breaks down.'
  },

  {
    id: 'L2-02',
    title: 'Curriculum Development Cycle',
    chapter: 'L1',
    type: 'concept',
    tags: ["curriculum development cycle","plan design implement evaluate","PDIE","Oliva","Gordon","Oliva and Gordon","Oliva & Gordon 2013","cyclic curriculum","continuous improvement","curriculum planning","curriculum design","curriculum evaluation","curriculum implementation"],
    content: 'Plan \u2192 Design \u2192 Implement \u2192 Evaluate <em>(cyclic in Singapore \u2014 Oliva &amp; Gordon, 2013)</em><br><br>' +
      'Development is continuous, not one-shot. Each cycle informs the next.'
  },

  {
    id: 'L2-03',
    title: 'Spiral Curriculum & Connected Syllabuses',
    chapter: 'L1',
    type: 'concept',
    tags: ["spiral curriculum","connected syllabuses","connected syllabus","Bruner","hierarchical","sequential","revisit concepts","G1","G2","G3","subject bands","differentiated curriculum","modular curriculum","Sec 1","Sec 2","Sec 3","content progression","vertical articulation","depth and breadth"],
    content: '<ul class="card-list">' +
      '<li><strong>Spiral curriculum</strong>: maths is hierarchical; content built across levels sequentially. Teach concepts appropriate to the level; revisit at the next level with more depth.</li>' +
      '<li><strong>Connected syllabuses</strong>: G1/G2/G3 cater to different student abilities</li>' +
      '<li>Different from a modular curriculum (teach everything in one module at one level)</li>' +
      '<li>Do <strong>not</strong> bring Sec 3 content down to Sec 1/2</li>' +
      '</ul>'
  },

  {
    id: 'L2-04',
    title: 'Goals, Orientations & Aims',
    chapter: 'L1',
    type: 'concept',
    tags: ["goals","orientations","aims","tool orientation","discipline orientation","N(T)","Normal Technical","A-Math","Additional Mathematics","real-world problems","nature of maths","nature of mathematics","curriculum goals","curriculum aims","concepts and skills","processes and metacognition","positive attitudes","everyday life","further education"],
    content: '<strong>Goals:</strong> Mastery for everyday life; able to pursue further maths education<br><br>' +
      '<strong>Orientations:</strong>' +
      '<ul class="card-list">' +
      '<li><strong>Tool</strong>: maths to solve real-world problems (e.g. N(T) leans tool)</li>' +
      '<li><strong>Discipline</strong>: understand the nature of maths (e.g. A-Math leans discipline)</li>' +
      '<li>Every syllabus has both</li>' +
      '</ul>' +
      '<strong>Aims:</strong> Concepts &amp; skills; processes &amp; metacognition; positive attitudes'
  },

  {
    id: 'L2-05',
    title: 'Nature of Mathematics \u2014 PORA Themes',
    chapter: 'L1',
    type: 'list',
    tags: ["PORA","nature of mathematics","properties and relationships","operations and algorithms","representations and communications","abstractions and applications","PORA themes","concepts","skills","processes","mathematical themes","big ideas","curriculum themes"],
    content: '<table class="card-table"><tr><th>Theme</th><th>Category</th></tr>' +
      '<tr><td><strong>P</strong>roperties &amp; Relationships</td><td>Concepts</td></tr>' +
      '<tr><td><strong>O</strong>perations &amp; Algorithms</td><td>Skills</td></tr>' +
      '<tr><td><strong>R</strong>epresentations &amp; Communications</td><td>Processes</td></tr>' +
      '<tr><td><strong>A</strong>bstractions &amp; Applications</td><td>Processes</td></tr></table>'
  },

  {
    id: 'L2-06',
    title: '8 Big Ideas (Secondary)',
    chapter: 'L1',
    type: 'list',
    tags: ["8 big ideas","eight big ideas","big ideas secondary","functions","invariance","notations","diagrams","proportionality","measures","models","equivalence","6 clusters","primary big ideas","fractions","rates","similarity","probability","sameness","representations","relationships","quantities"],
    content: [
      '<strong>Functions</strong> \u00B7 <strong>Invariance</strong> \u00B7 <strong>Notations</strong> \u00B7 <strong>Diagrams</strong> \u00B7 <strong>Proportionality</strong> \u00B7 <strong>Measures</strong> \u00B7 <strong>Models</strong> \u00B7 <strong>Equivalence</strong>',
      'Primary: 6 clusters \u2014 exclude Functions &amp; Models',
      '<strong>Top 3 (lecturer\'s view):</strong>',
      '<strong>Proportionality</strong> \u2014 underpins fractions, rates, similarity, probability',
      '<strong>Equivalence</strong> \u2014 sameness across representations',
      '<strong>Functions</strong> \u2014 relationships; predict how quantities affect each other'
    ]
  },

  {
    id: 'L2-07',
    title: 'What is a Mathematical Problem?',
    chapter: 'L1',
    type: 'definition',
    tags: ["mathematical problem","what is a problem","problem vs exercise","problem definition","no immediate procedure","accept and attempt","motivation","engagement","willingness","exercise vs problem","problem solving"],
    content: 'A mathematical problem requires:<br>' +
      '<ol><li><strong>No immediate procedure</strong> available</li>' +
      '<li>Solver must <strong>accept</strong> it (engage willingly)</li>' +
      '<li>Solver must <strong>attempt</strong> it (requires desire/motivation)</li></ol>' +
      'This distinguishes a <em>problem</em> from an <em>exercise</em> (which has a known procedure).'
  },

  {
    id: 'L2-08',
    title: 'P\u00F3lya\'s Problem-Solving Strategy',
    chapter: 'L1',
    type: 'list',
    tags: ["Polya","Polya's four steps","problem-solving strategy","problem solving strategy","understand the problem","devise a plan","carry out the plan","check and expand","heuristic selection","non-linear","looping back","4-step model","four-step model","look back"],
    content: [
      '<strong>1. Understand</strong> the problem \u2014 what is given, unknown, conditions?',
      '<strong>2. Devise a plan</strong> \u2014 select a heuristic',
      '<strong>3. Carry out the plan</strong> \u2014 execute; loop back if it fails',
      '<strong>4. Check and expand</strong> \u2014 verify answer; reflect; consider extensions',
      'Process is <strong>non-linear</strong> \u2014 looping back is expected and normal.'
    ]
  },

  {
    id: 'L2-09',
    title: 'Four Modes of Learning Maths',
    chapter: 'L1',
    type: 'table',
    tags: ["four modes of learning maths","4 modes","learning through practice","learning through problem solving","learning for problem solving","learning about problem solving","exercises","applications","heuristics","struggle","consolidation","modes of learning","practice","problem solving pedagogy"],
    content: {
      headers: ['Mode', 'Vehicle'],
      rows: [
        ['Learning maths <strong>through practice</strong>', 'Exercises \u2014 consolidate known procedures'],
        ['Learning maths <strong>through</strong> problem solving', 'Hard problems \u2014 struggle builds new understanding'],
        ['Learning maths <strong>for</strong> problem solving', 'Applications \u2014 content learned then applied'],
        ['Learning <strong>about</strong> problem solving', 'Explicit teaching of heuristics and strategies']
      ]
    }
  },

  {
    id: 'L2-10',
    title: 'Heuristics (Taught Explicitly)',
    chapter: 'L1',
    type: 'list',
    tags: ["heuristics","taught explicitly","draw a diagram","work backwards","look for a pattern","solve a simpler problem","make a list","make a table","guess and check","Schoenfeld","Alan Schoenfeld","basic knowledge","memorisation","memorization","cognitive capacity","problem solving strategies","heuristic list"],
    content: [
      'Common heuristics to teach:',
      'Draw a diagram',
      'Work backwards',
      'Look for a pattern',
      'Solve a simpler problem',
      'Make a list/table',
      'Guess and check',
      'Basic knowledge must be <strong>memorised</strong> to free cognitive capacity for heuristic thinking (Schoenfeld)'
    ]
  },

  {
    id: 'L2-11',
    title: 'Syllabus Organisation',
    chapter: 'L1',
    type: 'concept',
    tags: ["syllabus organisation","syllabus organization","numbers and algebra","geometry and measurement","statistics and probability","learning experiences","LE","processes","metacognition","attitudes","dispositions","MOE","Ministry of Education","content strands","textbooks","curriculum strands","concepts and skills"],
    content: '<strong>Concepts &amp; Skills strands:</strong> Numbers &amp; Algebra | Geometry &amp; Measurement | Statistics &amp; Probability<br><br>' +
      '<strong>Learning Experiences:</strong> embed Processes, Metacognition, Attitudes/Dispositions<br><br>' +
      'MOE increasing emphasis on processes \u2014 learning experiences (LE) now embedded in textbooks.'
  },

  // ===== L2 — Teaching Approaches & Learning Theories =====

  {
    id: 'L1-01',
    title: 'Core Teaching Philosophy',
    chapter: 'L2',
    type: 'principle',
    tags: ["core teaching philosophy","teaching philosophy","student-centred","student centered","teach students not maths","teaching vs talking","content delivery","pedagogy","learning","teaching beliefs","teacher mindset","empathy in teaching"],
    content: 'You teach <strong>students</strong>, not maths \u2014 care about whether they learn, not just content delivery.<br><br>Teaching \u2260 talking. Ensuring another person learns is <strong>harder than doing it yourself</strong>.'
  },

  {
    id: 'L1-02',
    title: 'Skemp\'s Two Types of Understanding (1976)',
    chapter: 'L2',
    type: 'definition',
    tags: ["Skemp","Richard Skemp","relational understanding","instrumental understanding","Skemp 1976","types of understanding","rules without reasons","knowing what and why","procedural understanding","conceptual understanding","memorisation","reconstruction","durable learning","understanding mathematics","rote learning"],
    content: '<table class="card-table"><tr><th>Type</th><th>Definition</th></tr>' +
      '<tr><td><strong>Relational</strong></td><td>Knowing <em>what</em> to do AND <em>why</em></td></tr>' +
      '<tr><td><strong>Instrumental</strong></td><td>Rules without reasons</td></tr></table>' +
      '<ul class="card-list">' +
      '<li>Instrumental: students can\'t adapt or reconstruct when they forget</li>' +
      '<li>Relational: enables reconstruction from understanding; more durable</li>' +
      '<li>Instrumental understanding = students memorise unrelated rules indefinitely; when they forget one rule, they can\'t recover</li>' +
      '</ul>'
  },

  {
    id: 'L1-03',
    title: 'Constructivism (Piaget)',
    chapter: 'L2',
    type: 'concept',
    tags: ["constructivism","Piaget","Jean Piaget","schema","schemata","assimilation","accommodation","prior knowledge","existing knowledge","construct knowledge","empty vessels","cognitive development","learning theory","constructivist","linking knowledge","knowledge construction"],
    content: '<ul class="card-list">' +
      '<li>Brain links new knowledge to <strong>existing knowledge (schema)</strong></li>' +
      '<li>Weak links = easily forgotten</li>' +
      '<li><strong>Assimilation</strong>: fitting new info into existing schema (no change to schema)</li>' +
      '<li><strong>Accommodation</strong>: changing existing schema to fit new info</li>' +
      '<li>Students <strong>construct</strong> their own knowledge \u2014 they are not empty vessels</li>' +
      '</ul>'
  },

  {
    id: 'L1-04',
    title: 'Skemp\'s Principle of Learning Maths (1987)',
    chapter: 'L2',
    type: 'principle',
    tags: ["Skemp","Richard Skemp","Skemp 1987","principle of learning maths","higher-order concepts","higher order concepts","suitable examples","examples before definition","definition-first","teaching by examples","concept formation","inductive teaching","concrete examples"],
    content: '<em>Higher-order concepts cannot be taught by definition \u2014 only by <strong>suitable examples</strong></em><br><br>' +
      '<ul class="card-list">' +
      '<li>Start with examples, guide to definition \u2014 not the reverse</li>' +
      '<li>Definition-first confuses unmotivated students and confirms their fears that maths is incomprehensible</li>' +
      '</ul>'
  },

  {
    id: 'L1-05',
    title: 'Guided-Discovery Learning (Bruner)',
    chapter: 'L2',
    type: 'concept',
    tags: ["Bruner","Jerome Bruner","guided discovery","guided-discovery learning","discovery learning","generalise","generalize","teacher-centred","teacher centered","student-centred","student centered","concept development","process development","constructing knowledge","inquiry-based learning","inquiry learning","worksheets"],
    content: 'Guide students to <strong>discover</strong> and <strong>generalise</strong> concepts so they construct knowledge meaningfully.<br><br>' +
      '<ul class="card-list">' +
      '<li>Can be teacher-centred (whole class) or student-centred (worksheets)</li>' +
      '<li>Overlaps concept development with process development</li>' +
      '</ul>'
  },

  {
    id: 'L1-06',
    title: 'Teaching Processes & Heuristics',
    chapter: 'L2',
    type: 'concept',
    tags: ["heuristics","teaching processes","worked examples","problem solving","Schoenfeld","Alan Schoenfeld","trig identities","trigonometric identities","basic knowledge","memorisation","memorization","cognitive capacity","process skills","mathematical processes","strategies"],
    content: '<ul class="card-list">' +
      '<li>Teach <strong>heuristics</strong> explicitly when going through worked examples or problems</li>' +
      '<li>E.g. for trig identities: start from more complex side; think what identities apply; work backwards if stuck</li>' +
      '<li>Basic knowledge must be <strong>memorised</strong> to enable thinking (Schoenfeld)</li>' +
      '</ul>'
  },

  {
    id: 'L1-07',
    title: 'Metacognition',
    chapter: 'L2',
    type: 'definition',
    tags: ["metacognition","thinking about thinking","awareness","monitoring","self-regulation","self regulation","reflection","student reflection","end of lesson reflection","metacognitive","learning awareness","metacognitive strategies"],
    content: 'Thinking about thinking: <strong>awareness, monitoring, self-regulation</strong><br><br>' +
      '<ul class="card-list">' +
      '<li>Get students to <strong>reflect</strong> at end of every lesson</li>' +
      '<li>Even one durable takeaway per lesson is sufficient</li>' +
      '<li>Build in reflection; don\'t leave metacognition to chance</li>' +
      '</ul>'
  },

  {
    id: 'L1-08',
    title: 'Pentagon Model (2020)',
    chapter: 'L2',
    type: 'concept',
    tags: ["Pentagon Model","Pentagon Model 2020","pentagon framework","mathematical problem solving","concepts","skills","processes","metacognition","dispositions","attitudes","21CC","21st century competencies","CAIT","STEM","3C","curiosity","creativity","adaptability","confidence","perseverance","appreciation","2028 curriculum","Singapore math framework","five components","habitual orientations"],
    content: '<strong>Centre:</strong> Mathematical Problem Solving<br><br>' +
      '<strong>Five components:</strong> Concepts \u00B7 Skills \u00B7 Processes \u00B7 Metacognition \u00B7 Dispositions/Attitudes<br><br>' +
      'From 2028: <strong>Attitudes \u2192 Dispositions</strong> (aligns with 21CC (CAIT) and STEM (3C))' +
      '<ul class="card-list">' +
      '<li>Dispositions: curiosity, creativity, <strong>adaptability</strong>, confidence, perseverance, appreciation</li>' +
      '<li>Dispositions are <em>active, habitual orientations</em> \u2014 not just how students feel</li>' +
      '</ul>'
  },

  // ===== L3 — ICT in Maths Education =====

  {
    id: 'L3-01',
    title: 'MOE ICT Masterplans',
    chapter: 'L3',
    type: 'list',
    tags: ["ICT","Information and Communications Technology","MOE","Ministry of Education","Masterplan","Masterplan 1","Masterplan 2","Masterplan 3","mp1","mp2","mp3","ICT Masterplan","IT infrastructure","teacher IT competency","baseline IT standards","dynamic curriculum","technology in education","ICT integration","lesson planning","EdTech","education technology","Singapore education policy","1997","2003","2009"],
    content: '<table class="card-table"><tr><th>Masterplan</th><th>Period</th><th>Focus</th></tr>' +
      '<tr><td>mp1</td><td>1997\u20132002</td><td>Basic IT infrastructure + teacher IT competency</td></tr>' +
      '<tr><td>mp2</td><td>2003\u20132008</td><td>Dynamic curriculum using technology; baseline IT standards for students</td></tr>' +
      '<tr><td>mp3</td><td>2009\u20132014</td><td>ICT at the <strong>heart</strong> of education \u2014 integrated in lesson planning, not an add-on</td></tr></table>'
  },

  {
    id: 'L3-02',
    title: '8 Ways to Use ICT in Maths',
    chapter: 'L3',
    type: 'list',
    tags: ["ICT","Information and Communications Technology","8 ways to use ICT","GeoGebra","GSP","Geometer's Sketchpad","LiveMath","virtual manipulatives","e-learning","visual aids","teaching aids","emulators","puzzles","games","videos","unit circle","sine curve","balance scale","equations","Equation Editor","FXDraw3","worksheets","engagement","technology tools","maths software","digital manipulatives","interactive learning"],
    content: [
      '<strong>1. Puzzles / games / songs / videos</strong> \u2014 engagement (must link back to maths)',
      '<strong>2. Pictures</strong> \u2014 e.g. types of pyramids',
      '<strong>3. Explore concepts</strong> \u2014 GeoGebra, GSP, LiveMath with pre-designed templates',
      '<strong>4. Visual aids</strong> \u2014 e.g. GSP unit circle \u2192 sine curve',
      '<strong>5. Teaching aids / emulators</strong> \u2014 e.g. show calculator key presses',
      '<strong>6. Virtual manipulatives</strong> \u2014 e.g. balance scale for equations',
      '<strong>7. E-learning</strong> \u2014 must be <strong>interactive</strong>, not just text',
      '<strong>8. Prepare materials</strong> \u2014 Equation Editor, FXDraw3 for worksheets'
    ]
  },

  {
    id: 'L3-03',
    title: 'Why Use ICT?',
    chapter: 'L3',
    type: 'principle',
    tags: ["ICT","Information and Communications Technology","Turkle","Papert","Seymour Papert","Sherry Turkle","Bruner","CPA","C-P-A","Concrete Pictorial Abstract","abstract to concrete","concrete experiences","manipulatives","technology enhanced learning","why use ICT","purpose of ICT","bridging abstract and concrete","1990"],
    content: '<em>"The computer has the ability to make the abstract concrete."</em> \u2014 Turkle &amp; Papert (1990)<br><br>' +
      'ICT <strong>bridges the gap</strong> between abstract concepts and concrete experiences (Bruner CPA logic).<br><br>' +
      '<strong>Use ICT only when it genuinely enhances student learning.</strong> If concrete manipulatives work better, use those instead. ICT is not an end in itself.'
  },

  {
    id: 'L3-04',
    title: 'Do NOT Use PPT for Worked Examples',
    chapter: 'L3',
    type: 'misconception',
    tags: ["ICT","PowerPoint","PPT","worked examples","misconception","constructivism","whiteboard","step-by-step working","fixed pace","questioning","presentation software","slides","do not use PPT","anti-pattern","pedagogy mistake"],
    content: {
      misconception: '<strong>Wrong approach:</strong> Using PowerPoint slides to show step-by-step working.<br><br>' +
        '<strong>Why it fails:</strong>' +
        '<ul class="card-list">' +
        '<li>Fixed pace \u2014 students can\'t follow at their own speed</li>' +
        '<li>Can\'t pause to question students at each step</li>' +
        '<li>Undermines constructivism</li>' +
        '</ul>',
      correction: 'Use the whiteboard for step-by-step working with questioning. PPT is fine for colourful pictures (e.g. types of pyramids).'
    }
  },

  {
    id: 'L3-05',
    title: 'Planning & Conducting an ICT Lesson',
    chapter: 'L3',
    type: 'technique',
    tags: ["ICT","Information and Communications Technology","ICT lesson planning","computer lab","preparation","conduct","consolidation","pre-designed templates","hands-on","demo","demonstration","2-period lesson","lesson structure","worksheet","guided exploration","lab management"],
    content: '<strong>Preparation:</strong>' +
      '<ol><li>Visit computer lab <strong>a few days before</strong>: test teacher + student computers</li>' +
      '<li>Visit again <strong>day/lesson before</strong>: confirm equipment still works</li>' +
      '<li>Try out template + worksheet yourself beforehand</li></ol>' +
      '<strong>Conduct (2-period lesson = 2 segments):</strong><br>' +
      'Gather at front \u2192 Demo difficult parts \u2192 Hands-on \u2192 Demo \u2192 Hands-on<br><br>' +
      '<strong>Conclude:</strong> Gather again to consolidate and verify correct discoveries<br><br>' +
      'Give students <strong>pre-designed templates</strong> \u2014 building them wastes time on technical aspects, not maths. <strong>Hands-on &gt; demo</strong> where possible; demo only when content too difficult to explore.'
  },

  {
    id: 'L3-06',
    title: 'LOVE Framework',
    chapter: 'L3',
    type: 'concept',
    tags: ["LOVE","LOVE framework","Linking Opportunities in a Variety of Experiences","engagement","variety of resources","link back to mathematics","student engagement","meaningful learning","lesson engagement","ICT","motivating students"],
    content: '<strong>L</strong>inking <strong>O</strong>pportunities in a <strong>V</strong>ariety of <strong>E</strong>xperiences to the learning of maths.<br><br>' +
      'Use a variety of resources to engage students, but <strong>always explicitly link the activity back to mathematics</strong>. Engagement is not the end goal; learning maths is.<br><br>' +
      'Aim for at least one interesting/engaging part per lesson.'
  },

  // ===== L4 — Teaching Approaches Part 2 =====

  {
    id: 'L4-01',
    title: 'Bruner\'s C-P-A Approach',
    chapter: 'L4',
    type: 'concept',
    tags: ["Bruner","Jerome Bruner","CPA","C-P-A","Concrete Pictorial Abstract","Concrete-Pictorial-Abstract","manipulatives","algebra tiles","balance scales","bar models","diagrams","graphs","symbolic notation","algebra","lower-readiness","differentiation","visual representation","enactive iconic symbolic","EIS","pictorial representation","abstract representation","concrete representation","scaffolding"],
    content: '<strong>Concrete \u2192 Pictorial \u2192 Abstract</strong> (hyphens = linked stages, not 3 separate methods)<br><br>' +
      '<ul class="card-list">' +
      '<li><strong>Concrete</strong>: physical manipulatives (e.g. algebra tiles, balance scales)</li>' +
      '<li><strong>Pictorial</strong>: diagrams, bar models, graphs</li>' +
      '<li><strong>Abstract</strong>: symbolic notation, algebra</li>' +
      '</ul>' +
      'Visual &gt; proof for convincing students. Suitable for <strong>lower-readiness</strong> students \u2014 don\'t start with abstract proofs.'
  },

  {
    id: 'L4-02',
    title: 'Extended C-P-A Approach',
    chapter: 'L4',
    type: 'concept',
    tags: ["CPA","C-P-A","Concrete Pictorial Abstract","Concrete-Pictorial-Abstract","extended CPA","Bruner","Jerome Bruner","concrete examples","numbers as concrete","primary","secondary","university","abstraction levels","levels of abstraction","examples before abstraction","scaffolding","never start with abstraction"],
    content: 'When no suitable concrete manipulative exists, use <strong>concrete examples (numbers)</strong> as the concrete stage.<br><br>' +
      '<table class="card-table"><tr><th>Level</th><th>"Concrete" means</th></tr>' +
      '<tr><td>Primary</td><td>Real objects</td></tr>' +
      '<tr><td>Secondary</td><td>Numbers</td></tr>' +
      '<tr><td>University</td><td>Algebra</td></tr></table>' +
      'What is abstract at one level becomes concrete at a higher level. <strong>Always: concrete/examples \u2192 abstract. Never start with abstraction.</strong>'
  },

  {
    id: 'L4-03',
    title: 'Teaching Skills \u2014 "We Do One. You Do More."',
    chapter: 'L4',
    type: 'technique',
    tags: ["behaviourism","Thorndike","Edward Thorndike","Skinner","B.F. Skinner","Gagne","Robert Gagne","constructivism","worked examples","WE","practice questions","We Do One You Do More","I do we do you do","gradual release","deliberate practice","homework","copying","lesson structure","skills teaching","drill and practice","scaffolded practice","progression","difficulty progression","challenge questions"],
    content: 'Rooted in <strong>behaviourism</strong> (Thorndike, Skinner, Gagn\u00E9) but modified by constructivism \u2014 meaningfulness matters.<br><br>' +
      '<strong>Structure:</strong>' +
      '<ol><li><strong>WE1</strong> \u2014 done together; teacher questions students; leave WE1 on board</li>' +
      '<li><strong>Practice Q1</strong> \u2014 similar to WE1; WE1 still visible (replaces copying)</li>' +
      '<li><strong>Practice Q2+</strong> \u2014 slight increase in difficulty/structure</li>' +
      '<li><strong>WE2</strong> \u2014 introduce when most students can\'t handle next level; repeat cycle</li></ol>' +
      '<strong>Rules:</strong>' +
      '<ul class="card-list">' +
      '<li><strong>Copying WEs wastes time</strong> \u2014 Practice Q1 serves as model solution</li>' +
      '<li><strong>Homework</strong>: similar difficulty to WEs/practice (not harder); 1\u20132 challenge Qs at end only</li>' +
      '<li>Must be <strong>deliberate structure and progression</strong> across WEs, practice, and HW</li>' +
      '</ul>'
  },

  {
    id: 'L4-04',
    title: 'Building Attitudes & Dispositions',
    chapter: 'L4',
    type: 'concept',
    tags: ["attitudes","dispositions","beliefs","confidence","perseverance","interest","appreciation","LOVE","LOVE framework","affective domain","motivation","student beliefs","growth mindset","struggle","engagement","variety of resources","link to mathematics","mathematical disposition"],
    content: '<strong>Beliefs \u2192 Confidence \u2192 Perseverance:</strong>' +
      '<ul class="card-list">' +
      '<li>Students who believe maths problems should take &lt; 5 min will give up on harder problems</li>' +
      '<li>Counter by sharing real struggle examples (your own uni experience) + encouraging perseverance</li>' +
      '</ul>' +
      '<strong>Interest/Appreciation:</strong>' +
      '<ul class="card-list">' +
      '<li>Use <em>variety</em> of resources (LOVE framework)</li>' +
      '<li>Aim for at least one interesting/engaging part per lesson</li>' +
      '<li>Must always link engaging activity back to mathematics</li>' +
      '</ul>'
  },

  // ===== L5 — Unpacking Content =====

  {
    id: 'L5-01',
    title: 'Shulman\'s Pedagogical Reasoning (1987)',
    chapter: 'L5',
    type: 'concept',
    tags: ["Shulman","Lee Shulman","pedagogical reasoning","1987","transformation","comprehension","instruction","evaluation","reflection","new comprehension","6-stage cycle","pedagogical reasoning cycle","PCK","pedagogical content knowledge","docendo discimus","by teaching we learn","teacher knowledge","Shulman's framework"],
    content: '<strong>6-stage cycle:</strong><br>' +
      'Comprehension \u2192 <strong>Transformation</strong> \u2192 Instruction \u2192 Evaluation \u2192 Reflection \u2192 New Comprehension<br><br>' +
      '<em>Docendo discimus</em> \u2014 "by teaching, we learn"<br><br>' +
      'Transformation is the core teaching act \u2014 it\'s where you convert your own understanding into forms that students can access.'
  },

  {
    id: 'L5-02',
    title: 'Transformation \u2014 4 Sub-aspects',
    chapter: 'L5',
    type: 'table',
    tags: ["Shulman","Lee Shulman","transformation","preparation","representation","selection","adaptation","4 sub-aspects","analogies","examples","demonstrations","instructional approach","prior knowledge","misconceptions","errors of omission","errors of commission","PCK","pedagogical content knowledge","lesson planning","content unpacking","unpack content first"],
    content: '<table class="card-table"><tr><th>Sub-aspect</th><th>What it involves</th></tr>' +
      '<tr><td><strong>Preparation</strong></td><td>Critically interpret materials; detect errors of omission/commission</td></tr>' +
      '<tr><td><strong>Representation</strong></td><td>Analogies, examples, demos to make ideas accessible</td></tr>' +
      '<tr><td><strong>Selection</strong></td><td>Choose instructional approach (lecture, discovery, ICT, etc.)</td></tr>' +
      '<tr><td><strong>Adaptation</strong></td><td>Tailor to students\' prior knowledge, misconceptions, language</td></tr></table>' +
      '<strong>Critical sequence:</strong> Preparation \u2192 Representation \u2192 Selection \u2192 Adaptation. Unpack content <em>first</em>, then choose method. <strong>Never choose method before understanding content.</strong>'
  },

  {
    id: 'L5-03',
    title: 'Backhouse\'s 5 Elements of Mathematical Content (1992)',
    chapter: 'L5',
    type: 'table',
    tags: ["Backhouse","1992","5 elements","mathematical content","concept","convention","result","technique","process","theorem","property","procedure","algorithm","guided discovery","worked examples","thinking opportunities","content types","content classification","just tell","no why","ways of thinking","misconception about convention"],
    content: '<table class="card-table"><tr><th>Element</th><th>What it is</th><th>How to teach</th></tr>' +
      '<tr><td><strong>Concept</strong></td><td>Idea or relationship</td><td>Explain or develop (guided discovery)</td></tr>' +
      '<tr><td><strong>Convention</strong></td><td>Arbitrary agreement</td><td>Just tell \u2014 no "why"</td></tr>' +
      '<tr><td><strong>Result</strong></td><td>Theorem or property</td><td>Can be proven \u2014 show or derive</td></tr>' +
      '<tr><td><strong>Technique</strong></td><td>Procedure or algorithm</td><td>Demonstrate with worked examples</td></tr>' +
      '<tr><td><strong>Process</strong></td><td>Way of thinking</td><td>Provide thinking opportunities</td></tr></table>' +
      '<strong>Convention</strong> is most commonly mishandled \u2014 teachers try to explain "why" when there is no why.<br>' +
      '<strong>Process</strong> is most commonly neglected \u2014 cannot be taught by demo; students must do the thinking.'
  },

  // ===== L6 — Big Ideas & Proportionality =====

  {
    id: 'L6-01',
    title: 'What Are Big Ideas?',
    chapter: 'L6',
    type: 'definition',
    tags: ["big ideas","Charles","Randall Charles","2005","linking topics","strands","levels","coherence","functions","invariance","notations","diagrams","proportionality","measures","models","equivalence","8 clusters","secondary clusters","primary clusters","6 clusters","cross-topic connections","mathematical connections","statements about big ideas"],
    content: 'Central ideas that <strong>link topics, strands, and levels</strong> into a coherent whole (Charles, 2005).<br><br>' +
      'Taught by forming <strong>statements about</strong> a big idea \u2014 not by defining the big idea itself.<br><br>' +
      '<strong>8 Secondary Clusters:</strong> Functions \u00B7 Invariance \u00B7 Notations \u00B7 Diagrams \u00B7 Proportionality \u00B7 Measures \u00B7 Models \u00B7 Equivalence<br><br>' +
      'Primary: 6 clusters \u2014 exclude Functions &amp; Models'
  },

  {
    id: 'L6-02',
    title: 'Ratio',
    chapter: 'L6',
    type: 'definition',
    tags: ["ratio","relative size","same kind","ratio notation","a:b","map scale","units","no units","concept of ratio","ratio vs notation","positive quantities","a b greater than 0","comparing quantities","measurement","convertible units"],
    content: 'Compares <strong>relative sizes</strong> of \u22652 quantities of the <strong>same kind</strong>.<br><br>' +
      '<ul class="card-list">' +
      '<li>Same kind = numbers OR measurements with convertible units (e.g. cm &amp; m \u2713; cm &amp; g \u2717)</li>' +
      '<li>Notation a : b has <strong>no units</strong>; write map scale as 1 : 10 000, not 1 cm : 100 m</li>' +
      '<li>Distinguish <strong>concept of ratio</strong> from <strong>ratio notation</strong> a : b</li>' +
      '<li>Definition: a : b where <strong>a, b &gt; 0</strong> \u2014 ratio is meaningless if a quantity = 0</li>' +
      '</ul>'
  },

  {
    id: 'L6-03',
    title: 'Rate',
    chapter: 'L6',
    type: 'definition',
    tags: ["rate","constant rate","step rate","progressive rates","irregular rates","y/x","rate of change","dy/dx","per unit","unitary","varies with","different kinds","same kinds","standardise base to 1","comparison","gradient","slope","speed","unit rate"],
    content: 'Measures how one quantity <strong>varies with</strong> another (same or different kinds).<br><br>' +
      '<ul class="card-list">' +
      '<li>Rate = y/x; if constant \u2192 expressed as "y per n units of x"</li>' +
      '<li>Always compares <strong>exactly two</strong> quantities</li>' +
      '<li><strong>Rate</strong> (y/x) \u2260 <strong>Rate of change</strong> (dy/dx) \u2014 equal only when the line passes through the origin</li>' +
      '<li>Types: constant rate, step rate, progressive rates, irregular rates</li>' +
      '<li>Writing as rate standardises base to 1 \u2014 makes comparison easier across groups</li>' +
      '</ul>'
  },

  {
    id: 'L6-04',
    title: 'Ratio vs Rate',
    chapter: 'L6',
    type: 'comparison',
    tags: ["ratio","rate","ratio vs rate","comparison","same kind","different kinds","2 quantities","3 quantities","interconvertible","a:b","a/b","convert ratio to rate","convert rate to ratio","ratio and rate relationship"],
    content: '<table class="card-table"><tr><th></th><th>Ratio</th><th>Rate</th></tr>' +
      '<tr><td>Same kind, 2 quantities</td><td>\u2713</td><td>\u2713 (interconvertible)</td></tr>' +
      '<tr><td>Same kind, \u22653 quantities</td><td>\u2713</td><td>\u2717</td></tr>' +
      '<tr><td>Different kinds, 2 quantities</td><td>\u2717</td><td>\u2713</td></tr></table>' +
      '<ul class="card-list">' +
      '<li>Ratio a : b (2 quantities) \u2192 can express as rate a/b; vice versa</li>' +
      '<li>Rate comparing same-kind quantities <strong>can</strong> be converted to ratio</li>' +
      '<li>Rate comparing different-kind quantities <strong>cannot</strong> become ratio</li>' +
      '</ul>'
  },

  {
    id: 'L6-05',
    title: 'Proportion vs Proportionality',
    chapter: 'L6',
    type: 'definition',
    tags: ["proportion","proportionality","part-whole ratio","part-part ratio","percentage","fraction","boys to girls","3:2","everyday meaning","mathematical meaning","proportional relationship","proportion vs proportionality"],
    content: '<ul class="card-list">' +
      '<li><strong>Part-whole ratio (proportion)</strong>: proportion of boys = 3/5 or 60%</li>' +
      '<li><strong>Part-part ratio</strong>: ratio of boys to girls = 3 : 2</li>' +
      '<li><strong>Proportionality</strong> (mathematical): a relationship between two quantities \u2014 distinct from the everyday meaning of "proportion"</li>' +
      '</ul>'
  },

  {
    id: 'L6-06',
    title: 'Direct Proportion \u2014 5 Equivalent Statements',
    chapter: 'L6',
    type: 'concept',
    tags: ["direct proportion","directly proportional","y proportional to x","y = kx","constant of proportionality","k","multiplicative reasoning","additive reasoning","equality of ratios","equality of rates","line through origin","gradient","dy/dx","y/x","5 equivalent statements","constant rate","linear relationship","y = kx + c","c = 0","proportional reasoning"],
    content: 'All of the following mean y \u221D x (y is directly proportional to x):<br><br>' +
      '<ol><li>When x \u00D7 n \u2192 y \u00D7 n (<strong>multiplicative</strong> reasoning)</li>' +
      '<li>y\u2082/y\u2081 = x\u2082/x\u2081 (equality of two ratios)</li>' +
      '<li>y\u2082/x\u2082 = y\u2081/x\u2081 (equality of two rates)</li>' +
      '<li>y/x = <strong>constant</strong> k (constant of proportionality)</li>' +
      '<li>y = kx (line through origin); both dy/dx and y/x equal k</li></ol>' +
      '<strong>Additive reasoning (constant difference) is NOT sufficient</strong> for direct proportion.<br><br>' +
      'Direct proportion is a special case of y = kx + c where <strong>c = 0</strong>.'
  },

  {
    id: 'L6-07',
    title: 'Inverse Proportion',
    chapter: 'L6',
    type: 'concept',
    tags: ["inverse proportion","inversely proportional","y = k/x","xy = k","constant product","multiply and divide","equality of ratios","equality of rates","rate not constant","product constant","reciprocal relationship","inverse relationship","inverse variation"],
    content: '<ul class="card-list">' +
      '<li>y = k/x; equivalently <strong>xy = k</strong> (constant product)</li>' +
      '<li>When x \u00D7 n \u2192 y <strong>\u00F7</strong> n</li>' +
      '<li>Equality of two ratios: y\u2082/y\u2081 = x\u2081/x\u2082</li>' +
      '<li>Equality of two rates: y\u2082/x\u2081 = y\u2081/x\u2082</li>' +
      '<li>Rate y/x is <strong>NOT</strong> constant; <strong>product xy</strong> is constant</li>' +
      '</ul>'
  },

  {
    id: 'L6-08',
    title: 'Proportionality Across the Curriculum',
    chapter: 'L6',
    type: 'table',
    tags: ["proportionality","across the curriculum","fractions","percentage","ratio","rate","similar triangles","trigonometry","sin","sine","opp/hyp","bar chart","pie chart","histogram","frequency","sector area","column area","unitary method","proportional reasoning","big idea","cross-topic","representations","corresponding sides"],
    content: {
      headers: ['Topic', 'Big Idea Connection'],
      rows: [
        ['Fractions, %, ratio, rate', 'Different representations of the same proportional relationship'],
        ['Similar triangles', 'Corresponding sides directly proportional'],
        ['Trigonometry', 'sin x = opp/hyp is constant because of similar triangles'],
        ['Bar/pie charts', 'Bar length / sector area directly proportional to frequency'],
        ['Histogram', 'Column <strong>area</strong> (not height) directly proportional to frequency'],
        ['Unitary method', 'Proportional reasoning without formally writing equality of ratios']
      ]
    }
  },

  {
    id: 'L6-09',
    title: 'Orientations to Maths Learning',
    chapter: 'L6',
    type: 'concept',
    tags: ["orientations","tool orientation","discipline orientation","N(T)","Normal Technical","A-Math","Additional Mathematics","real-world value","mathematical thinking","nature of mathematics","syllabus","curriculum orientation","applied mathematics","pure mathematics","purpose of maths"],
    content: '<ul class="card-list">' +
      '<li><strong>Tool orientation</strong>: use maths to solve problems; content chosen for real-world value (e.g. N(T) leans tool)</li>' +
      '<li><strong>Discipline orientation</strong>: understand the nature of maths; content chosen to illustrate mathematical thinking (e.g. A-Math leans discipline)</li>' +
      '<li>Every syllabus has both orientations in different proportions</li>' +
      '</ul>'
  },

  // ===== T1 — Arithmetic =====

  {
    id: 'T1-01',
    title: 'Classification of Numbers \u2014 Pedagogical Points',
    chapter: 'T1',
    type: 'list',
    tags: ["classification of numbers","number classification","whole numbers","natural numbers","positive integers","non-negative integers","even numbers","odd numbers","negative numbers","perfect squares","perfect cubes","rational numbers","irrational numbers","real numbers","complex numbers","imaginary numbers","terminating decimals","non-terminating decimals","recurring decimals","non-recurring decimals","decimal types","square root of 2","proof irrational","number types","number sets","integer","pedagogy","definitions"],
    content: [
      'Key points when teaching number classification:',
      '<strong>Whole numbers vs natural numbers</strong>: one contains 0, the other doesn\'t \u2014 know which; find tricks to help students remember',
      '<strong>Positive integers vs non-negative integers</strong>: cleaner, more precise terminology',
      '<strong>Even/negative numbers</strong>: students may give correct answers for wrong reasons \u2014 get them to <em>articulate</em> the definition',
      '<strong>Perfect squares/cubes</strong>: ask students to explain, not just identify',
      '<strong>Rational numbers</strong>: know the definition; know how to prove \u221A2 is irrational',
      '<strong>Decimal types</strong>: terminating vs non-terminating; recurring vs non-recurring',
      '<strong>Complex numbers</strong>: real numbers \u2282 complex numbers; imaginary \u2260 complex'
    ]
  },

  {
    id: 'T1-02',
    title: 'Four Operations \u2014 Procedural Understanding',
    chapter: 'T1',
    type: 'concept',
    tags: ["four operations","addition","subtraction","multiplication","division","long multiplication","long division","distributive law","distributive property","partial quotient","partial quotient algorithm","procedural understanding","procedural fluency","primary school","place value","why long multiplication works","conceptual understanding"],
    content: '<ul class="card-list">' +
      '<li>Do students understand <em>why</em> long multiplication works? (e.g. why add a zero when multiplying by tens?)</li>' +
      '<li>The <strong>distributive law</strong> underlies both long multiplication and the partial quotient algorithm</li>' +
      '<li>Opportunity to surface and address procedural gaps carried over from primary school</li>' +
      '</ul>'
  },

  {
    id: 'T1-03',
    title: 'Three Definitions of Prime Numbers',
    chapter: 'T1',
    type: 'definition',
    tags: ["prime numbers","prime","primes","definition of prime","exactly two factors","factor","factors","divisible","divisibility","whole number greater than 1","trapezium","exactly vs at least","1 is not prime","misconception"],
    content: '<table class="card-table"><tr><th>Definition</th><th>Assessment</th></tr>' +
      '<tr><td>"A whole number divisible by 1 and itself"</td><td>\u2717 Incomplete \u2014 1 satisfies this but is not prime</td></tr>' +
      '<tr><td>"A whole number <strong>greater than 1</strong> divisible by 1 and itself"</td><td>\u2713 Correct but verbose</td></tr>' +
      '<tr><td>"A whole number with <strong>exactly two</strong> different factors"</td><td>\u2713 Clean and precise \u2014 <strong>preferred</strong></td></tr></table>' +
      'The word <strong>exactly</strong> is critical \u2014 "at least" changes the meaning entirely.<br><br>' +
      'Analogy: old syllabus trapezium had <em>exactly</em> one pair of parallel sides; new syllabus uses <em>at least</em> \u2014 this changes which shapes qualify.'
  },

  {
    id: 'T1-04',
    title: '"Not Prime \u2192 Composite" is False',
    chapter: 'T1',
    type: 'misconception',
    tags: ["prime","composite","composite number","not prime","1 is not prime","1 is neither prime nor composite","misconception","positive integer","factors","true or false","conceptual test"],
    content: {
      misconception: '<strong>Statement:</strong> "If a positive integer is not prime, then it must be composite."<br><br><strong>Verdict:</strong> FALSE \u2014 <strong>1</strong> is neither prime nor composite.',
      correction: 'Use as a conceptual test in class: have students discuss and justify their answer.<br><br>Also: "6 is a composite number" is TRUE \u2014 it has more than two factors (1, 2, 3, 6).'
    }
  },

  {
    id: 'T1-05',
    title: 'Sieve of Eratosthenes',
    chapter: 'T1',
    type: 'technique',
    tags: ["sieve of Eratosthenes","Eratosthenes","sieve","prime sieve","finding primes","list of primes","prime numbers","1 is not prime","factor reasoning","activity","template","classroom activity"],
    content: '<ul class="card-list">' +
      '<li>Purpose: sieve out primes from a list of numbers</li>' +
      '<li><strong>Cannot be used to <em>introduce</em> primes</strong> \u2014 students need to already know:</li>' +
      '</ul>' +
      '<ul class="card-list" style="margin-left:1.5em">' +
      '<li>1 is not prime</li>' +
      '<li>Why uncancelled numbers are prime (still requires factor reasoning)</li>' +
      '</ul>' +
      '<ul class="card-list">' +
      '<li>Practical note: students are messy \u2014 <strong>always print a template</strong> for them</li>' +
      '</ul>'
  },

  {
    id: 'T1-06',
    title: 'Trial Division for Primality',
    chapter: 'T1',
    type: 'technique',
    tags: ["trial division","primality test","primality","testing for primes","prime check","square root","sqrt","factors come in pairs","factor pairs","perfect square","divide by primes","procedure"],
    content: 'To test if n is prime: divide by each prime up to \u221An. If none divide exactly, the number is prime.<br><br>' +
      '<strong>Rationale:</strong> factors come in pairs; if n has a factor &gt; \u221An, its pair must be &lt; \u221An, so it would already have been found. Perfect squares: last factor pair is \u221An \u00D7 \u221An.<br><br>' +
      'This reasoning is beyond most students \u2014 <strong>teach the procedure, not the proof</strong>.'
  },

  {
    id: 'T1-07',
    title: 'Fundamental Theorem of Arithmetic & Divisor Formula',
    chapter: 'T1',
    type: 'concept',
    tags: ["fundamental theorem of arithmetic","FTA","unique prime factorisation","unique prime factorization","prime factorisation","prime factorization","number of divisors","divisor formula","number of factors","tau function","total positive divisors","exponent","product of primes"],
    content: '<strong>Fundamental Theorem:</strong> Every positive integer &gt; 1 is either prime or can be expressed as a <strong>unique</strong> product of primes.<br><br>' +
      '<strong>Number of Divisors Formula:</strong><br>' +
      'If n = p\u2081^e\u2081 \u00D7 p\u2082^e\u2082 \u00D7 \u2026 \u00D7 p\u2096^e\u2096, then:<br>' +
      'Total positive divisors = <strong>(1+e\u2081)(1+e\u2082)\u2026(1+e\u2096)</strong><br><br>' +
      'Example: 48 = 2\u2074 \u00D7 3\u00B9 \u2192 (1+4)(1+1) = 10 divisors'
  },

  {
    id: 'T1-08',
    title: 'Bad Opening Examples for HCF & LCM',
    chapter: 'T1',
    type: 'misconception',
    tags: ["HCF","LCM","highest common factor","lowest common multiple","GCD","greatest common divisor","least common multiple","bad examples","opening examples","first example","misconception","coprime","relatively prime","HCF is not always the smaller number","LCM is not always the product","edge case"],
    content: '<table class="card-table"><tr><th>Concept</th><th>Bad First Example</th><th>Why It\'s Bad</th><th>Good First Example</th></tr>' +
      '<tr><td><strong>HCF</strong></td><td>HCF(6, 12) = 6</td><td>Students think HCF is always the smaller number</td><td>HCF(4, 7) = 1 \u2014 challenges assumption</td></tr>' +
      '<tr><td><strong>LCM</strong></td><td>LCM(4, 7) = 28</td><td>Students think LCM is always the product</td><td>Use examples where LCM \u2260 product</td></tr></table>' +
      'Edge-case examples must still appear during class practice \u2014 just not as the <strong>first</strong> example.'
  },

  {
    id: 'T1-09',
    title: 'Calculator Trick for HCF',
    chapter: 'T1',
    type: 'technique',
    tags: ["HCF","highest common factor","GCD","greatest common divisor","calculator trick","calculator method","fraction simplification","shortcut","12936","1260","division method"],
    content: 'To find HCF(12936, 1260):<br>' +
      '<ol><li>Compute 12936 \u00F7 1260 on calculator</li>' +
      '<li>Calculator simplifies to 154/15 (divided both by their HCF automatically)</li>' +
      '<li>Recover HCF: 1260 \u00F7 15 = <strong>84</strong></li></ol>'
  },

  {
    id: 'T1-10',
    title: 'Questioning Technique',
    chapter: 'T1',
    type: 'technique',
    tags: ["questioning technique","choral response","cold call","nominate student","wait time","think time","pause","reverse question","formative assessment","classroom technique","pedagogy","ask then nominate"],
    content: '<ul class="card-list">' +
      '<li><strong>Choral response</strong>: acceptable when NOT testing for understanding (e.g. recapping)</li>' +
      '<li><strong>Testing for understanding</strong>: call a <strong>specific student</strong></li>' +
      '<li><strong>Sequence</strong>: ask question \u2192 pause ~3 seconds \u2192 <em>then</em> nominate student</li>' +
      '</ul>' +
      '<ul class="card-list" style="margin-left:1.5em">' +
      '<li>If you nominate first, other students stop thinking</li>' +
      '</ul>' +
      '<ul class="card-list">' +
      '<li><strong>Reverse questions</strong>: give partial outcome, ask for missing info (instead of giving info, asking for outcome)</li>' +
      '</ul>'
  },

  {
    id: 'T1-11',
    title: 'Why Not Rules-Only for Negative Numbers',
    chapter: 'T1',
    type: 'concept',
    tags: ["negative numbers","negatives","sign rules","rules for negative numbers","conceptual understanding","memorisation","memorization","lower-readiness","difficult topics","positive times negative","multiplication of negatives","misconception"],
    content: '<ul class="card-list">' +
      '<li>Negative numbers are among the <strong>most difficult</strong> topics (alongside percentages and fractions)</li>' +
      '<li>Memorising sign rules without understanding leads to misconceptions, especially for lower-readiness students</li>' +
      '<li>Rules (e.g. positive \u00D7 negative = negative) should be the <strong>last</strong> step, not the first</li>' +
      '</ul>'
  },

  {
    id: 'T1-12',
    title: 'Contexts for Introducing Negative Numbers',
    chapter: 'T1',
    type: 'list',
    tags: ["negative numbers","negatives","real-life context","temperature","below zero","owing money","deficit","below sea level","number line","minus vs negative","operator vs state","subtraction vs negative","BC AD","basement floors","contexts to avoid","introducing negatives"],
    content: [
      '<strong>Good real-life contexts:</strong>',
      'Temperature below 0',
      'Owing money / deficit / decrease',
      'Below sea level',
      '<strong>Contexts to avoid:</strong>',
      'Basement floors (B1, B2) \u2014 no zero floor',
      'BC/AD \u2014 no year zero',
      '<strong>Number line:</strong>',
      'Numbers to the right are larger \u2014 use this to resolve "is \u22123 bigger than \u22122?"',
      'Distinguish operator <strong>minus</strong> (subtraction) from state <strong>negative</strong>: "0 <em>minus</em> 2 = <em>negative</em> 2"'
    ]
  },

  {
    id: 'T1-13',
    title: 'Algebra Discs \u2014 Five Concepts for Negative Numbers',
    chapter: 'T1',
    type: 'technique',
    tags: ["algebra discs","algebra tiles","negative numbers","negatives","zero pairs","zero pair","concrete manipulatives","CPA","concrete pictorial abstract","add negatives","subtract negatives","add positive and negative","removing negatives equals adding positives","five concepts","cognitive load"],
    content: 'Teach with algebra discs (concrete) before moving to rules. Teach <strong>one concept + practice</strong> before the next. Do NOT generalise to algebra during disc teaching \u2014 too much cognitive load.<br><br>' +
      '<table class="card-table"><tr><th>#</th><th>Concept</th><th>Example</th><th>Key Idea</th></tr>' +
      '<tr><td>1</td><td>Add two negatives</td><td>(\u22122) + (\u22123) = \u22125</td><td>Combine negative discs</td></tr>' +
      '<tr><td>2</td><td>Add positive + negative</td><td>5 + (\u22122) = 3</td><td>Zero pairs cancel</td></tr>' +
      '<tr><td>3</td><td>Subtract: positive \u2212 larger positive</td><td>3 \u2212 5 = \u22122</td><td>Add zero pairs first</td></tr>' +
      '<tr><td>4</td><td>Subtract positive from negative</td><td>\u22123 \u2212 4 = \u22127</td><td>Add more negatives</td></tr>' +
      '<tr><td>5</td><td>Subtract a negative</td><td>5 \u2212 (\u22122) = 7</td><td>Removing negatives = adding positives</td></tr></table>'
  },

  {
    id: 'T1-14',
    title: 'Lesson Structure for Negative Numbers',
    chapter: 'T1',
    type: 'technique',
    tags: ["lesson structure","negative numbers","negatives","algebra discs","mixed practice","consolidation","whiteboard recap","secret message puzzle","extension to algebra","transfer to fractions","lower-readiness","scaffolding","lesson plan","CPA"],
    content: '<ol><li>Teach one concept with discs</li>' +
      '<li>Class practice on that concept</li>' +
      '<li>Move to next concept</li>' +
      '<li>Consolidate: recap all 5 on whiteboard</li>' +
      '<li>Mixed practice (not arranged in order \u2014 students must identify which concept applies)</li>' +
      '<li>Optional: consolidation puzzle (e.g. secret message \u2014 each letter maps to an expression)</li></ol>' +
      '<strong>Extension to algebra:</strong> Same five concepts apply (e.g. (\u22122x) + (\u22123x) = \u22125x). Lower-readiness students find transfer to fractions harder \u2014 anticipate this.'
  },

  {
    id: 'T1-15',
    title: 'Teaching Multiplication of Negative Numbers',
    chapter: 'T1',
    type: 'technique',
    tags: ["multiplication of negative numbers","negatives","negative times negative","sign rules","disc-flipping","disc flipping model","pictorial","groups of","positive times negative","negative times positive","negative times negative is positive","mental heuristic","CPA"],
    content: 'Use disc-flipping model (pictorial is sufficient \u2014 no need for physical discs):<br><br>' +
      '<table class="card-table"><tr><th>Case</th><th>Meaning</th><th>Result</th></tr>' +
      '<tr><td>2 \u00D7 3</td><td>2 groups of 3</td><td>6</td></tr>' +
      '<tr><td>2 \u00D7 (\u22123)</td><td>2 groups of \u22123</td><td>\u22126</td></tr>' +
      '<tr><td>(\u22123) \u00D7 2</td><td><em>negative</em> of 3 groups of 2</td><td>\u22126</td></tr>' +
      '<tr><td>(\u22123) \u00D7 (\u22122)</td><td><em>negative</em> of 3 groups of \u22122</td><td>6</td></tr></table>' +
      '<strong>Mental heuristic (sign rules) is the LAST step</strong> \u2014 never open with it.'
  },

  {
    id: 'T1-16',
    title: 'Common Percentage Misconceptions',
    chapter: 'T1',
    type: 'misconception',
    tags: ["percentage","percentages","percent","misconception","0.5 percent","fraction to percentage","percentage change","base of percentage","profit and loss","cost price","selling price","average of percentages","percentage of","wrong working","100 percent base"],
    content: '<ol><li><strong>Wrong working</strong>: 5/20 = 5/20 \u00D7 100 = 25 \u21D2 "5/20 = 25 = 25%" \u2014 must mark wrong; 5/20 \u2260 25</li>' +
      '<li><strong>0.5% as a fraction</strong>: students confuse 0.5% with 0.5. Correct: 0.5% = 0.5/100 = 1/200</li>' +
      '<li><strong>Base of percentage change</strong>: students frequently identify the 100% (base) incorrectly. Profit/loss questions should specify % of cost price or selling price.</li>' +
      '<li><strong>Average of percentages</strong>: cannot average percentages unless the bases are equal</li></ol>'
  },

  // ===== T2a — Algebra Intro (T2-01, T2-02, T2-03, T2-04, T2-07) =====

  {
    id: 'T2-01',
    title: 'Uses of a Letter in Algebra',
    chapter: 'T2a',
    type: 'table',
    tags: ["algebra","letter in algebra","uses of letter","variable","unknown","parameter","specific unknown","algebraic notation","algebra introduction","letters as variables","letters as unknowns","letters as parameters","y = mx + c","y = 2x + 1","pronumeral","literal symbol","algebra basics","Sec 1","secondary algebra"],
    content: {
      headers: ['Use', 'Example', 'Meaning'],
      rows: [
        ['<strong>Specific unknown</strong>', 'Price of apple = x', 'One fixed unknown value'],
        ['<strong>Variable</strong>', 'y = 2x + 1', 'x ranges over values'],
        ['<strong>Parameter</strong>', 'm, c in y = mx + c', 'Fixed for a given line, varies across lines']
      ]
    }
  },

  {
    id: 'T2-02',
    title: 'Types of Algebraic Statements',
    chapter: 'T2a',
    type: 'table',
    tags: ["algebraic statements","conditional equation","contradiction","identity","function","relation","types of equations","equation types","x + 1 = 0","2x + 3x = 5x","f(x)","algebra introduction","always true","never true","sometimes true","algebraic identity","algebraic expression"],
    content: {
      headers: ['Type', 'Example', 'True for\u2026'],
      rows: [
        ['<strong>Conditional equation</strong>', 'x + 1 = 0', 'Some values of x'],
        ['<strong>Contradiction</strong>', 'x + 1 = x', 'No values'],
        ['<strong>Identity</strong>', '2x + 3x = 5x', 'All values'],
        ['<strong>Function / relation</strong>', 'f(x) = x + 1', 'Relationship between variables']
      ]
    }
  },

  {
    id: 'T2-03',
    title: 'Equal Sign Misconception',
    chapter: 'T2a',
    type: 'misconception',
    tags: ["equal sign","equals sign","misconception","equivalence","balance model","equality","relational understanding","operational understanding","do something misconception","equal sign misconception","balance","conceptual misconception","algebra misconception","virtual balance","physical balance"],
    content: {
      misconception: 'Students often treat <strong>=</strong> as "do something to get an answer" \u2014 not as <strong>equivalence</strong>.<br><br>This is a <strong>conceptual</strong> misconception, not a presentation issue.',
      correction: '<strong>Fix:</strong> Teach using a balance (physical or virtual) to show equality as balance between two sides.'
    }
  },

  {
    id: 'T2-04',
    title: 'Action Words in Algebra',
    chapter: 'T2a',
    type: 'list',
    tags: ["action words","expand","simplify","factorise","factorize","solve","algebraic operations","combine like terms","remove brackets","extract common factors","distributive law","algebra vocabulary","algebra instructions","algebra tasks","expand simplify factorise solve"],
    content: [
      '<strong>Expand \u00B7 Simplify \u00B7 Factorise \u00B7 Solve</strong>',
      'Students must distinguish these \u2014 they are different tasks:',
      '<strong>Expand</strong>: remove brackets (e.g. a(b+c) = ab + ac)',
      '<strong>Simplify</strong>: combine like terms',
      '<strong>Factorise</strong>: reverse of expansion; extract common factors',
      '<strong>Solve</strong>: find value(s) of unknown that satisfy the equation'
    ]
  },

  {
    id: 'T2-07',
    title: 'Algebra Syllabus Scope \u2014 Sec 1 vs Sec 2',
    chapter: 'T2a',
    type: 'table',
    tags: ["syllabus scope","Sec 1","Sec 2","algebra syllabus","spiral curriculum","linear equations","fractional equations","word problems","algebraic identities","factorise by grouping","quadratic expressions","algebraic fractions","simultaneous linear equations","linear inequalities","graphs of linear equations","quadratic by factorisation","a(b+c)","(a+b)(c+d)","degree 2","scope and sequence","curriculum progression","secondary syllabus"],
    content: '<table class="card-table"><tr><th>Level</th><th>Content</th></tr>' +
      '<tr><td><strong>Sec 1</strong></td><td>Expand a(b+c), \u2212a(b+c); factorise ab+ac; solve linear equations incl. simple fractional; word problems</td></tr>' +
      '<tr><td><strong>Sec 2</strong></td><td>Expand (a+b)(c+d), algebraic identities; factorise by grouping, quadratic expressions; algebraic fractions; simultaneous linear equations; linear inequalities; graphs of linear equations; solve quadratic by factorisation</td></tr></table>' +
      'Note: ab (degree 2, two variables) appears in Sec 1; x\u00B2 (degree 2, one variable) appears in Sec 2.'
  },

  // ===== T2b — Algebra Expansion/Factorisation (T2-05, T2-06) =====

  {
    id: 'T2-05',
    title: 'Three Approaches to Teaching Expansion',
    chapter: 'T2b',
    type: 'technique',
    tags: ["CPA","C-P-A","concrete-pictorial-abstract","expansion","algebra tiles","rectangular tiles","algebra discs","multiplication frame","area model","distributive law","a(b+c) = ab + ac","teaching expansion","concrete","pictorial","abstract","manipulatives","Bruner","negative numbers","minus signs","hands-on","three approaches"],
    content: '<strong>1. C-P-A with tiles:</strong>' +
      '<ul class="card-list">' +
      '<li>Concrete: physical rectangular tiles/cutouts for a \u00D7 (b+c)</li>' +
      '<li>Pictorial: draw the tiles</li>' +
      '<li>Abstract: generalise to a(b+c) = ab + ac</li>' +
      '<li>If pictorial is sufficient, skip concrete</li>' +
      '</ul>' +
      '<strong>2. Algebra discs extension:</strong>' +
      '<ul class="card-list">' +
      '<li>2 \u00D7 3 = 6 \u2192 extend to 2 groups of (x+3)</li>' +
      '<li>Examples and practice \u2192 generalise</li>' +
      '</ul>' +
      '<strong>3. Multiplication frame:</strong>' +
      '<ul class="card-list">' +
      '<li>Handles negative numbers and minus signs \u2014 unlike area model</li>' +
      '<li>More versatile than rectangular tile approach</li>' +
      '</ul>'
  },

  {
    id: 'T2-06',
    title: 'Teaching Factorisation',
    chapter: 'T2b',
    type: 'technique',
    tags: ["factorisation","factorization","factorise","factorize","reverse of expansion","HCF","highest common factor","GCF","greatest common factor","common factor","extracting common factor","negative factorisation","-2x - 6","sign change","algebra discs","multiplication frame","quadratic factorisation","ax^2 + bx + c","a not equal to 0","Sec 2","teaching factorisation"],
    content: '<ul class="card-list">' +
      '<li>Taught as the <strong>reverse of expansion</strong></li>' +
      '<li>Students must identify and extract the HCF of terms</li>' +
      '<li><strong>Harder case:</strong> \u22122x \u2212 6 \u2014 need to change sign after extracting \u22122</li>' +
      '</ul>' +
      '<ul class="card-list" style="margin-left:1.5em">' +
      '<li>Algebra discs help: flip the discs to show sign change</li>' +
      '<li>Multiplication frame also handles this</li>' +
      '</ul>' +
      '<ul class="card-list">' +
      '<li><strong>Quadratic factorisation</strong> (Sec 2): algebra discs, start with all-positive cases then extend</li>' +
      '<li>In ax\u00B2 + bx + c, must state <strong>a \u2260 0</strong></li>' +
      '</ul>'
  },

  // ===== T3 — Graphs =====

  {
    id: 'T3-01',
    title: 'Why Graphs Matter',
    chapter: 'T3',
    type: 'concept',
    tags: ["graphs","coordinate geometry","algebra and geometry","Sophie Germain","Rene Descartes","Cartesian coordinates","Cartesian plane","secondary syllabus","why graphs matter","algebra geometry link","figured algebra","written geometry","1596","1650","1776","1831","history of mathematics"],
    content: '<ul class="card-list">' +
      '<li>Graphs link <strong>algebra</strong> and <strong>geometry</strong> together</li>' +
      '<li>Graphs are part of <strong>Coordinate Geometry</strong></li>' +
      '<li><em>"Algebra is but written geometry and geometry is but figured algebra."</em> \u2014 Sophie Germain (1776\u20131831)</li>' +
      '<li>Only <strong>Cartesian coordinates</strong> are in the secondary syllabus (invented by Ren\u00E9 Descartes, 1596\u20131650)</li>' +
      '</ul>'
  },

  {
    id: 'T3-02',
    title: 'Cartesian Coordinates vs Ordered Pairs',
    chapter: 'T3',
    type: 'definition',
    tags: ["Cartesian coordinates","ordered pair","ordered pairs","polar coordinates","perpendicular axes","x-axis","y-axis","coordinate system","grammar","coordinates of P","definition","Cartesian plane","(x, y)","(r, theta)"],
    content: '<ul class="card-list">' +
      '<li><strong>Ordered pair</strong>: any pair of numbers where order matters \u2014 e.g. Cartesian (x, y), polar (r, \u03B8), event outcomes (H, T)</li>' +
      '<li><strong>Cartesian coordinates</strong>: a <strong>specific type</strong> of ordered pair (x, y) on perpendicular axes</li>' +
      '<li>Grammar: <em>"The coordinates of P <strong>are</strong> (2, 3)"</em> \u2014 not "is"</li>' +
      '</ul>'
  },

  {
    id: 'T3-03',
    title: 'Concept of Function',
    chapter: 'T3',
    type: 'concept',
    tags: ["function","concept of function","function definition","one output for every input","function machine","verbal representation","tabular representation","graphical representation","algebraic representation","four representations","representations of function","input output","table of values","mapping","relation"],
    content: 'Function = <strong>"only one output for every input"</strong><br><br>' +
      '<strong>4 representations of a function:</strong>' +
      '<ol><li><strong>Verbal</strong>: say or write in words</li>' +
      '<li><strong>Tabular</strong>: table of values</li>' +
      '<li><strong>Graphical</strong>: plot the graph</li>' +
      '<li><strong>Algebraic</strong>: equation of function</li></ol>' +
      'Use a <strong>function machine</strong> to build intuition before the formal definition.'
  },

  {
    id: 'T3-04',
    title: 'Teaching Graph Drawing Skills',
    chapter: 'T3',
    type: 'technique',
    tags: ["graph drawing","graph paper","plotting points","scale","domain","range","axes","graph paper orientation","green lines","2mm squares","1cm squares","2cm squares","darkest green line","teach one skill at a time","scaffolding","graph skills","label axes","draw axes"],
    content: '<strong>Always give students the scale, domain, and range</strong> \u2014 teaching them to choose scale is a separate skill; don\'t conflate the two.<br><br>' +
      '<strong>Graph paper orientation:</strong> three shades of green lines (2cm, 1cm, 2mm squares). Draw axes on the <strong>darkest green line</strong>. One arrow per axis at the positive end. Label axes x and y.<br><br>' +
      '<strong>Teach one skill at a time:</strong>' +
      '<ol><li>Draw axes \u2192 practise</li>' +
      '<li>Label numbers with scale \u2192 practise</li>' +
      '<li>Plot points \u2192 practise</li>' +
      '<li>Join points \u2192 practise</li></ol>'
  },

  {
    id: 'T3-05',
    title: 'y = ax + b vs y = mx + c (Syllabus Note)',
    chapter: 'T3',
    type: 'concept',
    tags: ["y = ax + b","y = mx + c","gradient","y-intercept","slope-intercept form","Sec 1","Sec 3","spiral curriculum","syllabus note","G6.3","textbook","linear equation","linear graph","gradient-intercept form","a = gradient","b = y-intercept"],
    content: '<ul class="card-list">' +
      '<li>Sec 1 syllabus uses <strong>y = ax + b</strong>, not y = mx + c</li>' +
      '<li>Students learn <em>a</em> = gradient in Sec 1</li>' +
      '<li>Students learn <em>b</em> = y-intercept only in <strong>Sec 3</strong> (G6.3)</li>' +
      '<li><strong>Do not teach y-intercept meaning of b in Sec 1</strong> \u2014 it\'s not in scope yet</li>' +
      '<li>Most textbooks use y = mx + c and link c to y-intercept; most teachers don\'t realise this is a Sec 3 concept</li>' +
      '<li>This is an example of the <strong>spiral curriculum</strong> \u2014 teach appropriately to the level</li>' +
      '</ul>'
  },

  {
    id: 'T3-06',
    title: 'Graph as Visual Representation',
    chapter: 'T3',
    type: 'misconception',
    tags: ["graph misconception","visual representation","pictorial representation","abstract representation","flag raising","graph as picture","relationship between variables","CPA","C-P-A","concrete-pictorial-abstract","misconception","graph interpretation","height vs time"],
    content: {
      misconception: '<strong>Misconception:</strong> A graph is a visual/pictorial representation of a situation.<br><br>' +
        '<strong>Example:</strong> Students asked to draw "height of flag vs time during flag-raising" may draw a <strong>vertical line</strong> (it looks like a flagpole going up).',
      correction: 'A graph is an <strong>abstract representation</strong> of the <em>relationship between two variables</em>, not a picture of the physical situation.<br><br>' +
        'In C-P-A terms: it\'s acceptable to treat graphs as "pictorial" and equations as "abstract," but be aware that both are actually abstractions \u2014 graphs are just more visually accessible.'
    }
  },

  {
    id: 'T3-07',
    title: 'Developing the Gradient Concept (Sec 1)',
    chapter: 'T3',
    type: 'technique',
    tags: ["gradient","slope","rise over run","rise / run","steepness","vertical change","horizontal change","worked example","WE","discovery approach","Sec 1","gradient concept","teaching gradient","Q1","quadrant 1","positive gradient","negative gradient","worked example sequence","scaffolding"],
    content: '<strong>Discovery approach:</strong>' +
      '<ol><li>Draw two line segments with the <strong>same horizontal change</strong> but <strong>different vertical changes</strong></li>' +
      '<li>Guide students to see that steepness differs because of different vertical changes</li>' +
      '<li>Lead to: <strong>gradient = rise / run</strong> (ratio of vertical change to horizontal change)</li></ol>' +
      '<strong>Worked Example sequence:</strong><br><br>' +
      '<table class="card-table"><tr><th>WE</th><th>Setup</th><th>Purpose</th></tr>' +
      '<tr><td>WE1</td><td>One point at origin, other in Q1</td><td>Simplest case; skip for stronger classes</td></tr>' +
      '<tr><td>WE2</td><td>Both in Q1, positive gradient</td><td>e.g. (1,2) and (5,8)</td></tr>' +
      '<tr><td>WE3</td><td>Both in Q1, negative gradient</td><td>Introduce negative gradient</td></tr>' +
      '<tr><td>WE4</td><td>One point has negative coordinates</td><td>Extend to other quadrants</td></tr></table>' +
      'After each WE, students practise a <strong>similar question first</strong> before progressing.'
  },

  {
    id: 'T3-08',
    title: 'Additional Gradient Skills & Misconceptions',
    chapter: 'T3',
    type: 'list',
    tags: ["gradient","slope","misconception","horizontal line","vertical line","gradient = 0","gradient undefined","non-homogeneous scale","direction of travel","uphill downhill","straight line","choosing points on line","gradient skills","common errors"],
    content: [
      '<strong>Skills to teach explicitly:</strong>',
      '<strong>No points given on line</strong>: guide students to choose 2 suitable points themselves',
      '<strong>Non-homogeneous scale</strong>: lines with the same gradient can <em>look</em> different if axes have different scales',
      '<strong>Common misconceptions:</strong>',
      'Going <em>up</em> a hill = positive gradient; going <em>down</em> = negative gradient \u2192 <strong>Wrong.</strong> Gradient has the same sign regardless of direction of travel \u2014 it depends on the line, not the walker.',
      '<strong>Horizontal line</strong>: gradient = 0 (students call it a "straight line" \u2014 clarify all lines are straight)',
      '<strong>Vertical line</strong>: gradient = undefined (students commonly confuse with horizontal)'
    ]
  },

  {
    id: 'T3-09',
    title: 'Gradient Formula (Sec 3)',
    chapter: 'T3',
    type: 'technique',
    tags: ["gradient formula","slope formula","Sec 3","x1 y1 x2 y2","rise = y2 - y1","run = x2 - x1","convention","left point","substitution errors","negative coordinates","arithmetic errors","teaching gradient formula","worked example"],
    content: '<strong>Teaching approach:</strong>' +
      '<ul class="card-list">' +
      '<li>Use the same WE from Sec 1: (1, 2) and (5, 8)</li>' +
      '<li>Write x\u2081, y\u2081 above (1, 2) and x\u2082, y\u2082 above (5, 8) on the graph</li>' +
      '<li>Link: rise = y\u2082 \u2212 y\u2081 and run = x\u2082 \u2212 x\u2081</li>' +
      '</ul>' +
      '<strong>Convention:</strong> Label the <strong>left point</strong> as (x\u2081, y\u2081) \u2014 ensures run = x\u2082 \u2212 x\u2081 &gt; 0. Does it matter which is (x\u2081, y\u2081)? No \u2014 formula gives same answer either way. But convention reduces errors.<br><br>' +
      '<strong>Common problems:</strong>' +
      '<ul class="card-list">' +
      '<li>Wrong substitutions \u2014 always write formula before substituting; label coordinates explicitly</li>' +
      '<li>Negative coordinates cause arithmetic errors \u2014 encourage calculator use</li>' +
      '</ul>'
  },

  {
    id: 'T3-10',
    title: 'Length of Line Segment (Sec 3)',
    chapter: 'T3',
    type: 'technique',
    tags: ["length of line segment","distance formula","Pythagoras","Pythagorean theorem","right-angled triangle","distance between two points","Sec 3","derive formula","scaffold","coordinate geometry","sqrt","square root"],
    content: '<strong>Developing the formula:</strong>' +
      '<ol><li>Scaffold using a right-angled triangle formed by the two points</li>' +
      '<li>Apply Pythagoras\' theorem: distance = \u221A[(x\u2082\u2212x\u2081)\u00B2 + (y\u2082\u2212y\u2081)\u00B2]</li>' +
      '<li>Students should <strong>derive</strong> this \u2014 do not just give the formula</li></ol>'
  },

  {
    id: 'T3-11',
    title: 'Plotting vs Sketching Graphs',
    chapter: 'T3',
    type: 'comparison',
    tags: ["plotting","sketching","plotting vs sketching","graph sketching","critical points","y-intercept","x-intercept","roots","turning point","quadratic graph","symmetry","freehand","scale","comparison"],
    content: '<ul class="card-list">' +
      '<li><strong>Sketching \u2260 rough freehand</strong> \u2014 still need scale in some cases to ensure correct shape (e.g. quadratic must be symmetrical)</li>' +
      '<li>To sketch, must find <strong>critical points</strong>:</li>' +
      '</ul>' +
      '<ul class="card-list" style="margin-left:1.5em">' +
      '<li>y-intercept</li>' +
      '<li>x-intercepts (roots)</li>' +
      '<li>Turning point</li>' +
      '</ul>'
  },

  {
    id: 'T3-12',
    title: 'Quadratic in Factorised Form \u2014 Finding Critical Points',
    chapter: 'T3',
    type: 'technique',
    tags: ["quadratic","factorised form","factored form","x-intercepts","y-intercept","turning point","line of symmetry","axis of symmetry","midpoint","average of roots","sign errors","solve equals zero","(x-h)(x-k)","critical points","quadratic graph","roots","parabola"],
    content: 'For y = \u00B1(x\u2212h)(x\u2212k):<br><br>' +
      '<strong>x-intercepts:</strong>' +
      '<ul class="card-list">' +
      '<li>Do <strong>NOT</strong> teach "x-intercepts are h and k" directly</li>' +
      '<li>Students make sign errors: e.g. y = (x+1)(x+5) \u2192 they say x-ints are 1 and 5 (wrong)</li>' +
      '<li><strong>Better:</strong> Just solve (x+1)(x+5) = 0 \u2192 x = \u22121, x = \u22125</li>' +
      '<li>x-intercepts are <strong>numerical values</strong>, not coordinates</li>' +
      '</ul>' +
      '<strong>y-intercept:</strong> Substitute x = 0 into the equation.<br><br>' +
      '<strong>Turning point:</strong>' +
      '<ul class="card-list">' +
      '<li>Lies on the <strong>line of symmetry</strong>, midway between x-intercepts</li>' +
      '<li>x-coordinate = average of two x-intercepts</li>' +
      '<li>Link to primary school: average = total \u00F7 2</li>' +
      '</ul>'
  },

  {
    id: 'T3-13',
    title: 'Completed Square Form (Sec 3)',
    chapter: 'T3',
    type: 'concept',
    tags: ["completed square form","completing the square","vertex form","(x-p)^2 + q","Sec 3","turning point","vertex","quadratic","express in the form","sketch quadratic","critical points","coefficient of x^2 = 1"],
    content: 'y = \u00B1(x\u2212p)\u00B2 + q \u2014 covered where coefficient of x\u00B2 = 1<br><br>' +
      'Typical question: "Express x\u00B2 \u2212 4x + 1 in the form (x\u2212a)\u00B2 + b. Hence, sketch y = x\u00B2 \u2212 4x + 1."<br><br>' +
      'Critical points are found directly from the completed square form.'
  },

  {
    id: 'T3-14',
    title: 'Po-Shen Loh\'s Method for Quadratics',
    chapter: 'T3',
    type: 'concept',
    tags: ["Po-Shen Loh","Po Shen Loh","quadratic","sum of roots","product of roots","average of roots","Vieta","quadratic formula alternative","enrichment","high-progress students","x^2 + Bx + C = 0","factoring quadratics","symmetric roots"],
    content: 'For x\u00B2 + Bx + C = 0:' +
      '<ol><li>Sum of roots = \u2212B; average of roots = \u2212B/2</li>' +
      '<li>Roots are (\u2212B/2 \u2212 u) and (\u2212B/2 + u) \u2014 symmetric about the average</li>' +
      '<li>Product: (\u2212B/2)\u00B2 \u2212 u\u00B2 = C \u2192 solve for u</li>' +
      '<li>Recover both roots</li></ol>' +
      '<strong>Example:</strong> x\u00B2 \u2212 6x + 5 = 0' +
      '<ul class="card-list">' +
      '<li>Average = 3; roots are 3\u2212u and 3+u</li>' +
      '<li>(3\u2212u)(3+u) = 5 \u2192 9 \u2212 u\u00B2 = 5 \u2192 u = 2</li>' +
      '<li>Roots: x = 1 and x = 5</li>' +
      '</ul>' +
      'Suitable for <strong>high-progress students</strong> as enrichment \u2014 not a replacement for standard methods.'
  },

  {
    id: 'T3-15',
    title: 'Exploring Graphs with Desmos',
    chapter: 'T3',
    type: 'technique',
    tags: ["Desmos","sliders","ICT","technology","guided discovery","Bruner","y = mx + c","vertical shift","steepness","gradient","y-intercept","graphing tool","digital tool","ICT integration","exploring graphs","linear graph","vary m","vary c"],
    content: 'For y = mx + c, use Desmos sliders:' +
      '<ul class="card-list">' +
      '<li>Keep <em>m</em> constant, vary <em>c</em> \u2014 observe vertical shift</li>' +
      '<li>Keep <em>c</em> constant, vary <em>m</em> \u2014 observe change in steepness</li>' +
      '<li>Start with m &gt; 0, then introduce m &lt; 0</li>' +
      '</ul>' +
      'This is a guided-discovery approach using ICT (Bruner + ICT integration).'
  },

  // ===== Study Sheet — Consolidated Review =====

  {
    id: 'SS-01',
    title: 'Key Theorists & Frameworks Summary',
    chapter: 'Study Sheet',
    type: 'list',
    tags: ["Skemp","relational understanding","instrumental understanding","Piaget","constructivism","assimilation","accommodation","Bruner","guided discovery","CPA","C-P-A","concrete-pictorial-abstract","Schoenfeld","basic knowledge","memorisation","Shulman","pedagogical reasoning","transformation","6-stage cycle","Backhouse","5 elements","mathematical content","Polya","4-step problem solving","problem-solving strategy","Charles","big ideas","Turkle","Papert","ICT","abstract concrete","Oliva","Gordon","curriculum development cycle","theorists","frameworks","key theorists","study sheet","revision","summary"],
    content: '<table class="card-table"><tr><th>Theorist/Framework</th><th>Key Contribution</th></tr>' +
      '<tr><td><strong>Skemp (1976)</strong></td><td>Relational vs instrumental understanding</td></tr>' +
      '<tr><td><strong>Skemp (1987)</strong></td><td>Higher-order concepts taught by examples, not definitions</td></tr>' +
      '<tr><td><strong>Piaget</strong></td><td>Constructivism \u2014 assimilation &amp; accommodation</td></tr>' +
      '<tr><td><strong>Bruner</strong></td><td>Guided discovery; C-P-A approach</td></tr>' +
      '<tr><td><strong>Schoenfeld</strong></td><td>Basic knowledge must be memorised for problem-solving</td></tr>' +
      '<tr><td><strong>Shulman (1987)</strong></td><td>Pedagogical reasoning \u2014 6-stage cycle; transformation</td></tr>' +
      '<tr><td><strong>Backhouse (1992)</strong></td><td>5 elements of mathematical content</td></tr>' +
      '<tr><td><strong>P\u00F3lya</strong></td><td>4-step problem-solving strategy</td></tr>' +
      '<tr><td><strong>Charles (2005)</strong></td><td>Big ideas in mathematics</td></tr>' +
      '<tr><td><strong>Turkle &amp; Papert (1990)</strong></td><td>ICT makes the abstract concrete</td></tr>' +
      '<tr><td><strong>Oliva &amp; Gordon (2013)</strong></td><td>Curriculum development cycle</td></tr></table>'
  },

  {
    id: 'SS-02',
    title: 'Key Lessons from Lectures',
    chapter: 'Study Sheet',
    type: 'list',
    tags: ["key lessons","lectures","CPA","C-P-A","concrete-pictorial-abstract","visual proof","concrete to abstract","worked examples","WE","practice questions","homework","structure","progression","LOVE","engage students","ICT","computer lab","student learning","L1","L3","L4","study sheet","revision","lesson takeaways"],
    content: [
      '<strong>L1/L4 Key Lesson 1:</strong> Visual > proof for convincing students (C-P-A)',
      '<strong>L1/L4 Key Lesson 2:</strong> Always go from concrete/examples \u2192 abstract',
      '<strong>L4 Key Lesson 3:</strong> There must be structure/progression in WEs, practice Qs, and HW',
      '<strong>L4 Key Lesson 4:</strong> Engage students\' hearts by making some parts of lessons interesting (LOVE)',
      '<strong>L3 Key Lesson:</strong> Use ICT only when it enhances student learning',
      '<strong>L3 Key Lesson:</strong> Must visit the computer lab at least a few days before your first ICT lesson'
    ]
  },

  // ===== Study Sheet — Per-Chapter Review =====

  {
    id: "SS-L1",
    title: "Study Sheet — Singapore Mathematics Curriculum",
    chapter: "Study Sheet",
    type: "concept",
    tags: ["study sheet","L1","curriculum","four curriculum types","spiral curriculum","PORA","big ideas","Polya","heuristics","syllabus","problem solving"],
    content: "<ul><li><strong>Four Curriculum Types</strong>: Intended (national syllabus, MOE) → Planned (school scheme of work) → Enacted (what teacher actually teaches) → Experienced (what students actually learn). Gaps between levels are where learning breaks down.</li><li><strong>Curriculum Development Cycle</strong> (Oliva & Gordon, 2013): Plan → Design → Implement → Evaluate — cyclic and continuous.</li><li><strong>Spiral Curriculum</strong> (Bruner): Maths is hierarchical; revisit concepts at each level with more depth. Do NOT bring Sec 3 content down to Sec 1/2. Connected syllabuses (G1/G2/G3) cater to different abilities.</li><li><strong>Goals & Orientations</strong>: <strong>Tool orientation</strong> = maths for real-world problems (e.g. N(T)); <strong>Discipline orientation</strong> = understand nature of maths (e.g. A-Math). Every syllabus has both.</li><li><strong>PORA Themes</strong> (Nature of Mathematics): <strong>P</strong>roperties & Relationships (Concepts), <strong>O</strong>perations & Algorithms (Skills), <strong>R</strong>epresentations & Communications (Processes), <strong>A</strong>bstractions & Applications (Processes).</li><li><strong>8 Big Ideas (Secondary)</strong>: Functions · Invariance · Notations · Diagrams · Proportionality · Measures · Models · Equivalence. Primary has 6 (excludes Functions & Models).</li><li><strong>What is a Mathematical Problem?</strong>: No immediate procedure available; solver must accept it and attempt it. Distinguishes a <strong>problem</strong> from an <strong>exercise</strong>.</li><li><strong>Pólya’s 4-Step Strategy</strong>: Understand → Devise a plan → Carry out → Check and expand. Process is non-linear.</li><li><strong>Four Modes of Learning Maths</strong>: Through practice, through problem solving, for problem solving, about problem solving.</li><li><strong>Heuristics</strong> (teach explicitly): Draw a diagram, work backwards, look for a pattern, solve a simpler problem, make a list/table, guess and check. Basic knowledge must be <strong>memorised</strong> to free cognitive capacity (Schoenfeld).</li><li><strong>Syllabus Organisation</strong>: Three content strands — Numbers & Algebra, Geometry & Measurement, Statistics & Probability.</li></ul>"
  },

  {
    id: "SS-L2",
    title: "Study Sheet — Teaching Approaches & Learning Theories",
    chapter: "Study Sheet",
    type: "concept",
    tags: ["study sheet","L2","Skemp","Piaget","Bruner","constructivism","metacognition","Pentagon Model","relational understanding","instrumental understanding"],
    content: "<ul><li><strong>Core Teaching Philosophy</strong>: You teach <strong>students</strong>, not maths. Teaching ≠ talking.</li><li><strong>Skemp’s Two Types of Understanding (1976)</strong>: <strong>Relational</strong> = knowing what to do AND why (durable); <strong>Instrumental</strong> = rules without reasons (fragile).</li><li><strong>Constructivism (Piaget)</strong>: Brain links new knowledge to existing <strong>schema</strong>. <strong>Assimilation</strong> = fitting new info into existing schema; <strong>Accommodation</strong> = changing schema to fit new info. Students are not empty vessels.</li><li><strong>Skemp’s Principle (1987)</strong>: Higher-order concepts cannot be taught by definition — only by <strong>suitable examples</strong>. Examples first, definition after.</li><li><strong>Guided-Discovery Learning (Bruner)</strong>: Guide students to discover and generalise concepts. Can be teacher-centred or student-centred.</li><li><strong>Metacognition</strong>: Thinking about thinking — awareness, monitoring, self-regulation. Get students to <strong>reflect</strong> at end of every lesson.</li><li><strong>Pentagon Model (2020)</strong>: Centre = Mathematical Problem Solving. Five components: Concepts, Skills, Processes, Metacognition, Dispositions. From 2028: Attitudes → <strong>Dispositions</strong>.</li></ul>"
  },

  {
    id: "SS-L3",
    title: "Study Sheet — ICT in Maths Education",
    chapter: "Study Sheet",
    type: "concept",
    tags: ["study sheet","L3","ICT","Masterplan","Turkle","Papert","LOVE framework","GeoGebra","computer lab","PPT misconception"],
    content: "<ul><li><strong>MOE ICT Masterplans</strong>: mp1 (1997) = IT infrastructure; mp2 (2003) = dynamic curriculum + baseline IT standards; mp3 (2009) = ICT at the <strong>heart</strong> of education.</li><li><strong>8 Ways to Use ICT</strong>: Puzzles/games/videos, pictures, explore concepts (GeoGebra), visual aids, teaching aids/emulators, virtual manipulatives, e-learning, prepare materials.</li><li><strong>Why Use ICT?</strong> (Turkle & Papert, 1990): \"The computer has the ability to make the abstract concrete.\" Use ICT <strong>only when it genuinely enhances</strong> student learning.</li><li><strong>Do NOT Use PPT for Worked Examples</strong>: Fixed pace prevents questioning. Use the <strong>whiteboard</strong> for step-by-step working.</li><li><strong>Planning an ICT Lesson</strong>: Visit lab a few days before AND the day before. Give students <strong>pre-designed templates</strong>. Structure: Gather → Demo → Hands-on → Consolidate.</li><li><strong>LOVE Framework</strong>: <strong>L</strong>inking <strong>O</strong>pportunities in a <strong>V</strong>ariety of <strong>E</strong>xperiences. Always link activity back to mathematics.</li></ul>"
  },

  {
    id: "SS-L4",
    title: "Study Sheet — Teaching Approaches Part 2",
    chapter: "Study Sheet",
    type: "concept",
    tags: ["study sheet","L4","CPA","Bruner","worked examples","behaviourism","Thorndike","Skinner","Gagne","attitudes","dispositions","LOVE"],
    content: "<ul><li><strong>Bruner’s C-P-A Approach</strong>: <strong>Concrete</strong> (manipulatives) → <strong>Pictorial</strong> (diagrams) → <strong>Abstract</strong> (symbols). For lower-readiness students, never start with abstraction.</li><li><strong>Extended C-P-A</strong>: When no manipulative exists, use <strong>concrete examples (numbers)</strong>. What is abstract at one level becomes concrete at a higher level (Primary = objects, Secondary = numbers, University = algebra).</li><li><strong>\"We Do One. You Do More.\"</strong>: WE1 (together) → Practice Q1 (similar, WE1 visible — replaces copying) → Q2+ (difficulty increase) → WE2 (next level). <strong>Copying WEs wastes time</strong>. Homework = similar difficulty to WEs; 1–2 challenge Qs at end only.</li><li><strong>Building Attitudes & Dispositions</strong>: Counter the \"< 5 min\" belief. Use variety of resources (LOVE framework), aim for at least one engaging part per lesson.</li></ul>"
  },

  {
    id: "SS-L5",
    title: "Study Sheet — Unpacking Content",
    chapter: "Study Sheet",
    type: "concept",
    tags: ["study sheet","L5","Shulman","pedagogical reasoning","transformation","Backhouse","5 elements","preparation","representation","selection","adaptation","convention","process"],
    content: "<ul><li><strong>Shulman’s Pedagogical Reasoning (1987)</strong>: Comprehension → <strong>Transformation</strong> → Instruction → Evaluation → Reflection → New Comprehension. <em>Docendo discimus</em> — \"by teaching, we learn.\"</li><li><strong>Transformation — 4 Sub-aspects</strong>: (1) <strong>Preparation</strong> — interpret materials, detect errors; (2) <strong>Representation</strong> — analogies, examples, demos; (3) <strong>Selection</strong> — choose instructional approach; (4) <strong>Adaptation</strong> — tailor to students. <strong>Unpack content first, then choose method.</strong></li><li><strong>Backhouse’s 5 Elements (1992)</strong>: (1) <strong>Concept</strong> → explain/guided discovery; (2) <strong>Convention</strong> → just tell, no \"why\"; (3) <strong>Result</strong> → prove/derive; (4) <strong>Technique</strong> → worked examples; (5) <strong>Process</strong> → provide thinking opportunities. <strong>Convention</strong> most mishandled; <strong>Process</strong> most neglected.</li></ul>"
  },

  {
    id: "SS-L6",
    title: "Study Sheet — Big Ideas & Proportionality",
    chapter: "Study Sheet",
    type: "concept",
    tags: ["study sheet","L6","big ideas","Charles","ratio","rate","proportion","proportionality","direct proportion","inverse proportion"],
    content: "<ul><li><strong>Big Ideas</strong> (Charles, 2005): Central ideas that <strong>link topics, strands, and levels</strong>. 8 Secondary Clusters: Functions, Invariance, Notations, Diagrams, Proportionality, Measures, Models, Equivalence.</li><li><strong>Ratio</strong>: Compares ≥2 quantities of the <strong>same kind</strong>. No units.</li><li><strong>Rate</strong>: How one quantity varies with another. Rate = y/x. <strong>Rate (y/x) ≠ Rate of change (dy/dx)</strong> — equal only when line passes through origin.</li><li><strong>Ratio vs Rate</strong>: Same kind, 2 quantities = interconvertible. Different kinds = rate only.</li><li><strong>Direct Proportion — 5 Equivalent Statements</strong>: (1) x×n → y×n; (2) equal ratios; (3) equal rates; (4) y/x = k; (5) y = kx (through origin). <strong>Additive reasoning is NOT sufficient.</strong></li><li><strong>Inverse Proportion</strong>: y = k/x; xy = k (constant product). When x×n → y÷n.</li><li><strong>Across the Curriculum</strong>: Fractions/percentage/ratio/rate = different representations of proportionality. Similar triangles = directly proportional sides. Histogram: <strong>area</strong> (not height) proportional to frequency.</li></ul>"
  },

  {
    id: "SS-T1",
    title: "Study Sheet — Arithmetic",
    chapter: "Study Sheet",
    type: "concept",
    tags: ["study sheet","T1","arithmetic","primes","HCF","LCM","negative numbers","algebra discs","percentages","questioning technique"],
    content: "<ul><li><strong>Prime Numbers</strong>: Preferred definition = \"exactly two different factors.\" 1 is neither prime nor composite.</li><li><strong>FTA</strong>: Every integer > 1 = unique product of primes. Divisor formula: (1+e₁)(1+e₂)…(1+eₖ).</li><li><strong>HCF & LCM</strong>: Avoid bad first examples (HCF(6,12)=6 → misconception). Use edge cases like HCF(4,7)=1.</li><li><strong>Questioning</strong>: Ask → pause ~3s → nominate. Choral response for recapping only.</li><li><strong>Negative Numbers</strong>: Don’t start with sign rules. Good contexts: temperature, owing money. Distinguish minus (operator) vs negative (state).</li><li><strong>Algebra Discs — 5 Concepts</strong>: (1) Add negatives, (2) Add pos+neg (zero pairs), (3) Subtract pos−larger pos (add zero pairs), (4) Subtract pos from neg, (5) Subtract a negative = add positive. Teach one at a time.</li><li><strong>Multiplication of Negatives</strong>: Use disc-flipping model. Sign rules are the LAST step.</li><li><strong>Percentage Misconceptions</strong>: 0.5% ≠ 0.5 (it’s 1/200). Base of percentage change often misidentified. Cannot average percentages unless bases are equal.</li></ul>"
  },

  {
    id: "SS-T2a",
    title: "Study Sheet — Algebra Introduction",
    chapter: "Study Sheet",
    type: "concept",
    tags: ["study sheet","T2a","algebra","letters in algebra","variable","unknown","parameter","equal sign","action words","expand","simplify","factorise","solve"],
    content: "<ul><li><strong>Uses of a Letter</strong>: <strong>Specific unknown</strong> (one fixed value); <strong>Variable</strong> (ranges over values); <strong>Parameter</strong> (fixed for a case, varies across cases).</li><li><strong>Types of Algebraic Statements</strong>: Conditional equation, contradiction, identity, function/relation.</li><li><strong>Equal Sign Misconception</strong>: Students treat = as \"do something\" instead of <strong>equivalence</strong>. Fix: balance model.</li><li><strong>Action Words</strong>: <strong>Expand</strong> (remove brackets), <strong>Simplify</strong> (combine like terms), <strong>Factorise</strong> (extract common factors), <strong>Solve</strong> (find values). Students must distinguish these.</li><li><strong>Syllabus</strong>: Sec 1 = expand a(b+c), factorise ab+ac, linear equations. Sec 2 = (a+b)(c+d), identities, quadratics, simultaneous equations.</li></ul>"
  },

  {
    id: "SS-T2b",
    title: "Study Sheet — Algebra Expansion & Factorisation",
    chapter: "Study Sheet",
    type: "concept",
    tags: ["study sheet","T2b","algebra","expansion","factorisation","CPA","algebra tiles","multiplication frame","algebra discs","quadratic"],
    content: "<ul><li><strong>Three Approaches to Teaching Expansion</strong>: (1) C-P-A with rectangular tiles; (2) Algebra discs extension; (3) <strong>Multiplication frame</strong> — handles negative numbers, more versatile than area model.</li><li><strong>Teaching Factorisation</strong>: Reverse of expansion. Students extract HCF. Harder case: −2x − 6 needs sign change after extracting −2.</li><li><strong>Quadratic Factorisation</strong> (Sec 2): Use algebra discs, start with all-positive cases. In ax² + bx + c, must state <strong>a ≠ 0</strong>.</li></ul>"
  },

  {
    id: "SS-T3",
    title: "Study Sheet — Graphs",
    chapter: "Study Sheet",
    type: "concept",
    tags: ["study sheet","T3","graphs","gradient","Cartesian coordinates","function","quadratic","Desmos","plotting","sketching","spiral curriculum"],
    content: "<ul><li><strong>Cartesian Coordinates</strong>: Ordered pair on perpendicular axes. Grammar: \"The coordinates of P <strong>are</strong> (2, 3).\"</li><li><strong>Function</strong>: One output for every input. 4 representations: verbal, tabular, graphical, algebraic.</li><li><strong>y = ax + b</strong>: a = gradient (Sec 1), b = y-intercept (Sec 3 only — spiral curriculum).</li><li><strong>Graph Misconception</strong>: Students draw graphs that look like the physical situation. A graph is <strong>abstract</strong>, not a picture.</li><li><strong>Gradient</strong>: rise/run. Discovery approach with WE sequence. Direction of travel does NOT affect sign. Horizontal = 0, vertical = undefined.</li><li><strong>Gradient Formula (Sec 3)</strong>: (y₂−y₁)/(x₂−x₁). Label left point as (x₁, y₁). Write formula before substituting.</li><li><strong>Plotting vs Sketching</strong>: Sketching still needs scale. Find critical points: y-intercept, x-intercepts, turning point.</li><li><strong>Quadratic in Factorised Form</strong>: Do NOT teach \"x-intercepts are h and k\" — solve = 0 instead. Turning point x = average of roots.</li><li><strong>Desmos</strong>: Use sliders for guided discovery of y = mx + c. Vary m (steepness) and c (vertical shift) separately.</li></ul>"
  }

];
