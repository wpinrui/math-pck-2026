/*
 * QUIZZES — Quiz mode
 * Each question: { id, chapter, question, format, options, answer, explanation }
 * format: 'mcq' | 'short-answer'
 * options: array of strings (MCQ only, null for short-answer)
 * answer: correct answer index for MCQ (0-based), or string for short-answer
 * explanation: HTML string shown after answering
 */
var QUIZZES = [
  {
    id: "Q13",
    chapter: "L1",
    question: "What is the correct order of the 4 curriculum types from national to student level?",
    format: "mcq",
    options: [
      "Planned → Intended → Enacted → Experienced",
      "Intended → Planned → Enacted → Experienced",
      "Intended → Enacted → Planned → Experienced",
      "Enacted → Planned → Intended → Experienced"
    ],
    answer: 1,
    explanation: "<strong>Intended</strong> = national syllabus (MOE). <strong>Planned</strong> = school-level scheme of work. <strong>Enacted</strong> = what teacher actually teaches. <strong>Experienced</strong> = what students actually learn. Gaps between each level are where learning breaks down."
  },
  {
    id: "Q14",
    chapter: "L1",
    question: "In the 2028 Pentagon Model update, what replaces “Attitudes” as one of the five components?",
    format: "mcq",
    options: [
      "Aptitudes",
      "Dispositions",
      "Behaviours",
      "Competencies"
    ],
    answer: 1,
    explanation: "From 2028, <strong>Attitudes → Dispositions</strong>. Dispositions include curiosity, creativity, adaptability, confidence, perseverance, and appreciation. They are <em>active, habitual orientations</em> — not just how students feel. This aligns with 21CC (CAIT) and STEM (3C)."
  },
  {
    id: "Q15",
    chapter: "L1",
    question: "What distinguishes a mathematical “problem” from an “exercise”?",
    format: "mcq",
    options: [
      "Problems are harder than exercises",
      "Problems have no immediately available procedure; exercises use known procedures",
      "Problems require a calculator; exercises do not",
      "Problems are word-based; exercises are numerical"
    ],
    answer: 1,
    explanation: "A mathematical <strong>problem</strong> requires that no immediate procedure is available — the solver must accept and attempt it. An <strong>exercise</strong> uses a known, practised procedure. Difficulty alone does not make something a problem."
  },
  {
    id: "Q7",
    chapter: "L2",
    question: "A student can compute 20% of 150 by the rule “divide by 100, multiply by the percentage” but is stuck when the question format changes. According to Skemp, which type of understanding does this demonstrate?",
    format: "mcq",
    options: [
      "Relational understanding",
      "Instrumental understanding",
      "Conceptual understanding",
      "Procedural fluency"
    ],
    answer: 1,
    explanation: "<strong>Instrumental understanding</strong> = rules without reasons. The student can apply the rule but can't adapt when the format changes. <strong>Relational understanding</strong> (knowing what AND why) would allow the student to reconstruct from understanding of “per hundred” and proportional reasoning."
  },
  {
    id: "Q11",
    chapter: "L2",
    question: "A student links new information to their existing mental framework without changing the framework. In Piaget's constructivism, this is called:",
    format: "mcq",
    options: [
      "Accommodation",
      "Assimilation",
      "Metacognition",
      "Schema construction"
    ],
    answer: 1,
    explanation: "<strong>Assimilation</strong> = fitting new info into existing schema without changing the schema. <strong>Accommodation</strong> is when the schema itself must change to fit new info. Both are part of how learners construct knowledge."
  },
  {
    id: "Q12",
    chapter: "L2",
    question: "According to Skemp's Principle (1987), why should you NOT start by giving students a definition when teaching a new higher-order concept?",
    format: "mcq",
    options: [
      "Definitions are inaccurate for higher-order concepts",
      "Higher-order concepts can only be communicated through suitable examples, not definitions",
      "Students cannot read formal definitions",
      "Definitions should only be given in writing, not orally"
    ],
    answer: 1,
    explanation: "Skemp's Principle: higher-order concepts cannot be taught by definition — only by <strong>suitable examples</strong>. Starting with a definition confuses unmotivated students and confirms their fears that maths is incomprehensible. Always: examples first → definition after."
  },
  {
    id: "Q16",
    chapter: "L3",
    question: "A teacher plans to have students explore angle properties using GeoGebra. Should students build the template themselves or use a pre-designed one?",
    format: "mcq",
    options: [
      "Build it themselves — learning to use the software is part of the lesson",
      "Use a pre-designed template — building it wastes time on technical aspects, not maths",
      "Either approach is equally effective",
      "Students should watch the teacher build it, then replicate"
    ],
    answer: 1,
    explanation: "Give students <strong>pre-designed templates</strong>. Building them wastes time on technical aspects rather than mathematical learning. The goal is mathematical discovery, not software proficiency."
  },
  {
    id: "Q17",
    chapter: "L3",
    question: "Before your first ICT lesson in the computer lab, what must you do at least a few days in advance?",
    format: "mcq",
    options: [
      "Print extra worksheets as backup",
      "Visit the computer lab to test all computers",
      "Email students the software download link",
      "Install the software on your personal laptop only"
    ],
    answer: 1,
    explanation: "Visit the computer lab <strong>a few days before</strong>: test teacher + student computers. Visit again the <strong>day/lesson before</strong> to confirm everything still works. Also try the template + worksheet yourself beforehand."
  },
  {
    id: "Q18",
    chapter: "L4",
    question: "In Bruner's C-P-A approach, what do the hyphens between Concrete-Pictorial-Abstract represent?",
    format: "mcq",
    options: [
      "Three separate, independent teaching methods",
      "Linked stages that connect to each other",
      "A strict sequence that must never be reversed",
      "Three assessment levels"
    ],
    answer: 1,
    explanation: "The hyphens represent <strong>linked stages</strong>, not three separate methods. C-P-A is a progression where each stage connects to the next, helping students build understanding from concrete experience to abstract notation."
  },
  {
    id: "Q19",
    chapter: "L4",
    question: "In the extended C-P-A approach, what serves as “concrete” at the secondary school level?",
    format: "mcq",
    options: [
      "Physical objects (blocks, tiles)",
      "Diagrams and pictures",
      "Numbers and numerical examples",
      "Algebraic expressions"
    ],
    answer: 2,
    explanation: "Extended C-P-A: when no physical manipulative exists, use <strong>concrete examples (numbers)</strong>. At primary level, concrete = real objects. At secondary, concrete = numbers. At university, concrete = algebra. What is abstract at one level becomes concrete at a higher level."
  },
  {
    id: "Q20",
    chapter: "L4",
    question: "In the “We do one. You do more.” structure, what replaces copying worked examples?",
    format: "mcq",
    options: [
      "Homework problems",
      "Practice Q1, which is similar to WE1 while WE1 remains visible on the board",
      "A second worked example (WE2)",
      "Reading from the textbook"
    ],
    answer: 1,
    explanation: "Copying WEs wastes time. Instead, <strong>Practice Q1</strong> serves as the model solution — it's similar to WE1, done while WE1 is still visible on the board. This replaces copying and actively engages students."
  },
  {
    id: "Q8",
    chapter: "L5",
    question: "According to Backhouse's 5 elements, how should BODMAS be classified and taught?",
    format: "mcq",
    options: [
      "Concept — explain or develop through guided discovery",
      "Convention — just tell students; there is no “why”",
      "Result — prove or derive it",
      "Technique — demonstrate with worked examples"
    ],
    answer: 1,
    explanation: "BODMAS is a <strong>convention</strong> — an arbitrary agreement about the order of operations. There is no mathematical “why” behind it. Teachers commonly mishandle conventions by trying to explain reasoning that doesn't exist. Just tell students."
  },
  {
    id: "Q9",
    chapter: "L5",
    question: "According to Backhouse, Pythagoras' theorem is which type of mathematical content element?",
    format: "mcq",
    options: [
      "Concept",
      "Convention",
      "Result",
      "Technique",
      "Process"
    ],
    answer: 2,
    explanation: "Pythagoras' theorem is a <strong>result</strong> — a theorem or property that can be proven or derived. The appropriate teaching approach is to show or derive the proof, not just state it."
  },
  {
    id: "Q21",
    chapter: "L5",
    question: "What are the 4 sub-aspects of Transformation in Shulman's Pedagogical Reasoning?",
    format: "mcq",
    options: [
      "Planning, Instruction, Assessment, Reflection",
      "Comprehension, Instruction, Evaluation, Reflection",
      "Preparation, Representation, Selection, Adaptation",
      "Analysis, Design, Implementation, Evaluation"
    ],
    answer: 2,
    explanation: "The critical sequence is: <strong>Preparation</strong> (interpret materials, detect errors) → <strong>Representation</strong> (analogies, examples, demos) → <strong>Selection</strong> (choose instructional approach) → <strong>Adaptation</strong> (tailor to students). Always unpack content first, then choose method."
  },
  {
    id: "Q22",
    chapter: "L6",
    question: "A table shows: when x doubles, y also doubles. A student concludes y is directly proportional to x. Which additional check is needed to confirm this?",
    format: "mcq",
    options: [
      "Check that y = x for at least one value",
      "Check that the relationship is multiplicative (not just additive/constant difference)",
      "Check that x and y are both positive",
      "No additional check is needed — doubling confirms proportionality"
    ],
    answer: 1,
    explanation: "<strong>Additive reasoning (constant difference) is NOT sufficient</strong> for direct proportion. You need to verify <strong>multiplicative</strong> reasoning: x × n → y × n for all n. Direct proportion means y/x = constant (y = kx, line through origin). A constant difference (y = x + c) would also show doubling in some cases but is NOT proportional."
  },
  {
    id: "Q23",
    chapter: "L6",
    question: "Rate and rate of change are:",
    format: "mcq",
    options: [
      "Always equal",
      "Equal only when the line passes through the origin",
      "Never equal",
      "Equal only for negative gradients"
    ],
    answer: 1,
    explanation: "Rate = y/x. Rate of change = dy/dx. They are equal <strong>only when the line passes through the origin</strong> (y = kx, where c = 0). For y = kx + c where c ≠ 0, dy/dx = k (constant) but y/x varies."
  },
  {
    id: "Q1",
    chapter: "T1",
    question: "How many different factors does a prime number have?",
    format: "short-answer",
    options: null,
    answer: "Exactly two",
    explanation: "“Divisible by 1 and itself” is incomplete — 1 satisfies it but isn’t prime. “Greater than 1 and divisible by 1 and itself” works but is verbose. “Exactly two different factors” is clean, precise, and preferred."
  },
  {
    id: "Q5",
    chapter: "T1",
    question: "When teaching 5 − (−2) = 7 with algebra discs, what is the key step before removing negatives?",
    format: "mcq",
    options: [
      "Remove 2 positive discs from the set",
      "Add 2 zero pairs so that negative discs are available to remove",
      "Flip all discs to their opposite colour",
      "Add 2 negative discs to cancel the subtraction"
    ],
    answer: 1,
    explanation: "This is Concept 5 of the algebra disc method. You need to remove 2 negatives but have none, so <strong>add 2 zero pairs</strong> (each = 1 positive + 1 negative). Now you have 7 positives and 2 negatives. Remove the 2 negatives → 7 positives remain."
  },
  {
    id: "Q6",
    chapter: "T1",
    question: "A student computes −3 − 4 = 1. What error did they make?",
    format: "mcq",
    options: [
      "They added instead of subtracted",
      "They computed 4 − 3 = 1, ignoring the negative sign",
      "They confused subtraction with multiplication",
      "They reversed the order of operations"
    ],
    answer: 1,
    explanation: "The student ignored the negative sign on −3 and computed 4 − 3 = 1. Using algebra discs (Concept 4): start with 3 negative discs, add 4 zero pairs, remove 4 positive discs → 7 negative discs = −7."
  },
  {
    id: "Q24",
    chapter: "T1",
    question: "A student writes: “0.5% = 0.5.” What is the correct conversion of 0.5% to a fraction?",
    format: "mcq",
    options: [
      "1/2",
      "1/20",
      "1/200",
      "5/100"
    ],
    answer: 2,
    explanation: "0.5% = 0.5/100 = 5/1000 = <strong>1/200</strong>. Students commonly confuse 0.5% with 0.5 (which is 50%). The % symbol means “per hundred” — so 0.5% is half of one percent, a very small number."
  },
  {
    id: "Q2",
    chapter: "T2b",
    question: "A student writes (x + y)² = x² + y². What error did they make?",
    format: "mcq",
    options: [
      "They forgot to square both terms",
      "They distributed the exponent over addition (overgeneralised the power rule)",
      "They confused squaring with doubling",
      "They forgot the constant term"
    ],
    answer: 1,
    explanation: "The student overgeneralised — they applied the exponent to each term separately as if (x+y)² = x² + y², distributing the exponent over addition. The correct expansion is (x+y)² = x² + 2xy + y²."
  },
  {
    id: "Q3",
    chapter: "T2b",
    question: "Using extended C-P-A, how would you help a student see that (x+y)² ≠ x² + y²?",
    format: "mcq",
    options: [
      "Show the formal algebraic proof first",
      "Substitute concrete numbers (e.g. x=1, y=2) to show LHS ≠ RHS",
      "Use algebra tiles to build both expressions",
      "Tell students to memorise the correct expansion"
    ],
    answer: 1,
    explanation: "Extended C-P-A: when no manipulative exists, use <strong>concrete numbers</strong>. x=1, y=2: (1+2)² = 9 but 1² + 2² = 5. 9 ≠ 5 proves the rule doesn't work."
  },
  {
    id: "Q10",
    chapter: "T3",
    question: "A student says the x-intercepts of y = (x+1)(x+5) are 1 and 5. What went wrong, and what is the correct teaching approach?",
    format: "mcq",
    options: [
      "The student confused x-intercepts with y-intercepts; teach graphing software",
      "The student read off the constants without solving; teach students to always solve the equation = 0",
      "The student forgot to substitute x = 0; teach substitution",
      "The student swapped the signs; teach sign rules"
    ],
    answer: 1,
    explanation: "The student read off the constants h and k directly instead of solving (x+1)(x+5) = 0. Correct x-intercepts: x = −1 and x = −5. <strong>Do not teach “x-intercepts are h and k”</strong> — always teach students to solve the equation equal to zero."
  },
  {
    id: "Q25",
    chapter: "T3",
    question: "A student says “going up a hill is positive gradient, going down is negative.” Is this correct?",
    format: "mcq",
    options: [
      "Yes — gradient depends on direction of travel",
      "No — gradient depends on the line itself, not the direction of travel; it has the same sign either way",
      "Yes — but only for straight roads",
      "No — all hills have positive gradient"
    ],
    answer: 1,
    explanation: "Gradient has the <strong>same sign regardless of direction of travel</strong> — it depends on the line, not the walker. A hill with a slope going up from left to right has a positive gradient whether you walk up or down it. This is a common real-life misconception."
  }
];
