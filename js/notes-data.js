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
  /* PLACEHOLDER — will be populated from Dorcus's content-organized.md */
];
