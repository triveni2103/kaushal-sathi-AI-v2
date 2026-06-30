/* ══════════════════════════════════════════════════════
   KAUSHAL SAATHI — FULL INTERACTIVE JS ENGINE v2.0
   NCERT Kaushal Bodh · NEP 2020 · AI + Voice + Gamified
   ══════════════════════════════════════════════════════ */

/* ── GLOBAL STATE ── */
var state = {
  topic: null,
  project: null,
  activity: null,
  currentTab: 'Sessions & Learning Plan',
  viewMode: 'teach',
  xp: 140,
  badges: [],
  completedSteps: {},
  voiceRecognition: null,
  voiceTarget: null,    /* 'chat' | 'step-N' | 'discuss-N' */
  timers: {},
  matchSelected: { left: null, right: null },
  matchPairs: {},
  dragSrc: null,
  assessmentScore: 0,
  advancedOptions: {
    periodDuration: 35,
    classSize: 'Medium (20–35)',
    state: '',
    city: '',
    resources: ['Chalk & Board'],
    tools: [],
    internet: false,
    subject: '',
    subjectIntegration: '',
    teachingChallenge: ''
  }
};

/* ── MATERIAL ICONS MAP ── */
var MAT_ICONS = {
  'Lemon': '🍋', 'Water': '💧', 'Salt': '🧂', 'Sugar': '🍬',
  'Lemons': '🍋', 'Jaggery': '🟫', 'Strainer': '🫙', 'Apron': '👗',
  'Measuring': '📏', 'Knife': '🔪', 'Board': '🪵', 'Bowl': '🥣',
  'Jar': '🫙', 'Bin': '🗑️', 'Poster': '📋', 'Pen': '✏️',
  'Worksheet': '📝', 'Recipe': '📖', 'Spoon': '🥄', 'Cup': '🥤',
  'default': '🧰'
};

function getMaterialIcon(name) {
  var keys = Object.keys(MAT_ICONS);
  for (var i = 0; i < keys.length; i++) {
    if (name.toLowerCase().includes(keys[i].toLowerCase())) return MAT_ICONS[keys[i]];
  }
  return MAT_ICONS.default;
}

/* ══════════════════════════════════
   DATA — FULL NCERT ACTIVITY OBJECTS
   ══════════════════════════════════ */
var DATA = {
  services: {
    label: 'Work in Human Services',
    icon: '🤝',
    color: 'lavender',
    headerBg: 'var(--lavender)',
    headerText: 'var(--lavender-dark)',
    projects: [
      {
        id: 'p-cooking-fireless',
        num: 'Project 6',
        name: 'Cooking without Fire',
        desc: 'Connection with curricular areas: Science & Math Application.',
        periods: 48,
        activities: [
          {
            id: 'a-1-able-to-do',
            name: 'What will I be able to do?',
            periods: 2,
            icon: '🎯',
            lo: ['LO 1', 'LO 7'],
            objectives: {
              text: 'Orientation of learning outcomes, toolkit discovery, and initial team role allocation.',
              chips: ['Goal Setting', 'Tool Blueprint', 'Team Building']
            },
            introVideo: { label: 'Project Orientation Video', duration: '3:20', youtube: '' },
            audioGuide: 'Welcome to the Cooking without Fire project! In this project, you will learn to prepare healthy meals safely.',
            materials: ['Measuring spoons', 'Standard Cups', 'Safe Aprons', 'Recipe Deck Templates', 'Notebook & Pen'],
            teacherScript: {
              say: '"Namaste students! Today we are entering the magical world of fireless culinary arts. Can anyone tell me who manages cooking at home? Today, you become the lead chefs!"',
              expect: 'Students will shout exciting names of dishes (Bhel, Salad, Juice).',
              redFlags: 'If students are shy, ask them to whisper to their partner first, then share.'
            },
            steps: [
              { title: 'Project Roadmap', desc: 'Display the full 48-period project execution roadmap on board. Let students identify which activities they are most excited about.', duration: '10 mins', hint: 'Map out student expectations. Use colorful markers.', image: '🗺️ Roadmap Display', reflection: 'Which activity are you most excited about and why?' },
              { title: 'Toolkit Discovery', desc: 'Hands-on discovery of standard volumetric cups vs household tablespoons. Let students hold, compare, and guess capacities.', duration: '15 mins', hint: 'Let them hold and guess capacities.', image: '⚖️ Measurement Tools', reflection: 'What surprised you about the difference between cups and spoons?' }
            ],
            groupWork: {
              title: 'Team Role Allocation',
              description: 'Assign roles for the project. Each group of 5 students gets one role set.',
              timer: 600,
              roles: [
                { icon: '👨‍🍳', title: 'Head Chef', task: 'Leads the cooking sequence and calls steps.' },
                { icon: '📏', title: 'Measurement Expert', task: 'Handles all measuring tools and quantities.' },
                { icon: '🧹', title: 'Cleanliness Monitor', task: 'Ensures workspace stays hygienic at all times.' },
                { icon: '📝', title: 'Recipe Reader', task: 'Reads aloud each step clearly to the group.' }
              ]
            },
            discussionQuestions: [
              'Why is it important to plan before cooking?',
              'What tools do professional chefs use that we don\'t have at school?',
              'How is cooking connected to science and mathematics?'
            ],
            conclusion: [
              'Every great meal starts with a plan — we now have ours.',
              'Measuring accurately is the first skill of a good cook.',
              'Teamwork and communication are as important as cooking technique.'
            ],
            assessments: [
              {
                type: 'mcq',
                question: 'Which measuring tool gives the most accurate quantity for liquids?',
                options: ['A tablespoon', 'A standard measuring cup', 'An empty bottle', 'A palm guess'],
                correct: 1
              },
              {
                type: 'drag',
                question: 'Arrange the planning steps in the correct order:',
                items: ['Assign team roles', 'Read the recipe', 'Gather materials', 'Start cooking', 'Clean workspace']
              },
              {
                type: 'voice',
                question: 'In your own words — what is the most important thing to do BEFORE starting to cook?'
              }
            ],
            classroomTips: {
              teacherNotes: ['Display the 48-period project map on a chart paper for the whole term.', 'Take photos of students with their tools — use for portfolio assessment later.'],
              commonMistakes: ['Students confuse tablespoons with teaspoons — demonstrate both physically.', 'Groups take too long choosing roles — use random role cards.'],
              safetyReminders: ['Ensure no sharp objects are distributed at this stage.', 'Teach proper apron-tying before any kitchen activity.'],
              timeManagement: ['Spend max 8 minutes on role allocation to leave time for tool exploration.', 'Use a visible class timer on the board.']
            },
            downloads: [
              { name: 'Culinary_Project_Map.pdf', size: '340 KB', type: 'pdf' },
              { name: 'Role_Cards.pptx', size: '220 KB', type: 'ppt' },
              { name: 'Student_Worksheet.docx', size: '115 KB', type: 'doc' }
            ]
          },
          {
            id: 'a-2-safety',
            name: 'How do I keep myself and others safe?',
            periods: 1,
            icon: '🛡️',
            lo: ['LO 6'],
            objectives: {
              text: 'Mastering personal hygiene norms, 7-step WHO handwashing, and non-sharp tool management.',
              chips: ['Hygiene', 'Cross-Contamination Prevention', 'WHO Protocol']
            },
            introVideo: { label: 'WHO 7-Step Handwashing Video', duration: '2:45', youtube: '' },
            audioGuide: 'Safety is the first rule of cooking. We will learn the 7-step handwashing technique today.',
            materials: ['Antiseptic handwash', 'Clean towels', 'Kitchen safety checklist charts', 'Plastic spreaders'],
            teacherScript: {
              say: '"Before we touch food, what is the invisible enemy we must destroy? Yes, Germs! Let us practice the scientific 7-step hand scrubbing routine together."',
              expect: 'Students follow the rubbing motions actively.',
              redFlags: 'Some students may rush — slow them down, count each step aloud.'
            },
            steps: [
              { title: 'WHO Handwashing Drill', desc: 'Demonstrate the complete WHO 7-step friction routine. Students mirror each step in pairs.', duration: '15 mins', hint: 'Check fingernails specifically. Count steps aloud together.', image: '🧼 Handwashing Steps', reflection: 'Which step do you usually skip at home? Why is it important?' },
              { title: 'Safe Tool Handling', desc: 'Simulate safe grip methods using non-sharp plastic or wooden spreaders. NO metal blades at this grade.', duration: '10 mins', hint: 'No metal blades at this grade boundary.', image: '🪵 Safe Spreader Grip', reflection: 'How would you explain safe cutting to a younger sibling?' }
            ],
            groupWork: {
              title: 'Safety Check Station',
              description: 'Groups rotate through 3 safety stations: hand-check, tool check, and workspace check.',
              timer: 480,
              roles: [
                { icon: '🔍', title: 'Safety Inspector', task: 'Checks that every member has washed hands correctly.' },
                { icon: '✅', title: 'Checklist Keeper', task: 'Marks off safety checklist items one by one.' },
                { icon: '📢', title: 'Safety Announcer', task: 'Reads each safety rule aloud to the group.' },
                { icon: '🧹', title: 'Cleanup Lead', task: 'Ensures station is clean after the group leaves.' }
              ]
            },
            discussionQuestions: [
              'Why do hospitals and kitchens have the same handwashing rules?',
              'What can happen if we skip washing hands before cooking?',
              'Name 3 things in your kitchen at home that could be a safety hazard.'
            ],
            conclusion: [
              'Germs are invisible — that\'s why hygiene routines must be automatic.',
              'Safe tools protect us. Never substitute with sharp alternatives.',
              'A safe kitchen is a happy kitchen!'
            ],
            assessments: [
              {
                type: 'mcq',
                question: 'How many steps are in the WHO handwashing protocol?',
                options: ['3 steps', '5 steps', '7 steps', '10 steps'],
                correct: 2
              },
              {
                type: 'match',
                question: 'Match each safety rule with its purpose:',
                left: ['Wash hands', 'Use spreaders', 'Wear apron', 'Tie hair back'],
                right: ['Prevent burns', 'Remove germs', 'Avoid hair in food', 'Prevent cuts']
              },
              {
                type: 'voice',
                question: 'Teach the 7 handwashing steps as if you are explaining to a Grade 3 student.'
              }
            ],
            classroomTips: {
              teacherNotes: ['Laminate the WHO handwashing poster and keep it near the activity station permanently.'],
              commonMistakes: ['Students skip Step 4 (thumb scrubbing) — watch for it specifically.', 'Students use dry towels to "wash" — ensure water access.'],
              safetyReminders: ['No metal knives or sharp tools in this session.', 'Check that spreaders have no rough or broken edges.'],
              timeManagement: ['Handwashing drill: 5 min instruction + 10 min practice in pairs.']
            },
            downloads: [
              { name: 'Safety_Protocol_Poster.pdf', size: '520 KB', type: 'pdf' },
              { name: 'Hygiene_Checklist.docx', size: '140 KB', type: 'doc' }
            ]
          },
          {
            id: 'a-3-reading-recipes',
            name: 'Reading Recipes (NCERT Core)',
            periods: 2,
            icon: '📖',
            lo: ['LO 1', 'LO 2', 'LO 3', 'LO 5', 'LO 6', 'LO 7', 'LO 8', 'LO 9', 'LO 16'],
            objectives: {
              text: 'Isolating ingredient parameters, reading sequencing hierarchies, and annotating step orders.',
              chips: ['Sequence Logic', 'Annotation Skills', 'Literacy Integration']
            },
            introVideo: { label: 'How to Read a Recipe — Demo', duration: '4:10', youtube: '' },
            audioGuide: 'A recipe is like a map. Follow it in order and you reach a delicious destination!',
            materials: ['Lemon Water Matrix Chart', 'Jumbled step strips', 'Color pens', 'Scissors', 'Glue sticks'],
            teacherScript: {
              say: '"Look at this chart. If I mix sugar after pouring ice-cold water, what happens to the solubility rate? Sequence matters!"',
              expect: 'Students respond that dissolving sugar takes much more time in cold liquid.',
              redFlags: 'If students don\'t understand "solubility", replace with: "Why does sugar take longer to dissolve in cold water?"'
            },
            steps: [
              { title: 'Jumbled Recipe Cards', desc: 'Distribute jumbled structural step cards of Lemon Water preparation. Groups reassemble them in the correct sequence on tables.', duration: '15 mins', hint: 'Let groups reassemble them on tables. Race format works well!', image: '📋 Recipe Step Cards', reflection: 'How did your group decide which step came first?' },
              { title: 'Choral Measurement Reading', desc: 'Run verbal choral reading sessions to clarify fractional measurements (1/2 tsp, 1 tbsp, 1/4 cup). Weave in math connections.', duration: '15 mins', hint: 'Connect directly with Math fractions class.', image: '📏 Fraction Measurement', reflection: 'What fraction of a cup is 2 tablespoons?' }
            ],
            groupWork: {
              title: 'Recipe Detective Challenge',
              description: 'Each group gets a different recipe with ONE missing ingredient or step. They must identify what\'s missing using logic.',
              timer: 720,
              roles: [
                { icon: '🕵️', title: 'Recipe Detective', task: 'Identifies the missing step or ingredient.' },
                { icon: '📖', title: 'Reader', task: 'Reads out the recipe clearly to the group.' },
                { icon: '🔢', title: 'Math Checker', task: 'Verifies all fractions and quantities are correct.' },
                { icon: '🎤', title: 'Presenter', task: 'Shares the group\'s findings with the class.' }
              ]
            },
            discussionQuestions: [
              'Why does the order of steps matter in a recipe?',
              'What would happen if we added salt instead of sugar to lemon water?',
              'How is reading a recipe similar to following math instructions?'
            ],
            conclusion: [
              'Recipes are precise documents — every word and fraction matters.',
              'Sequence is everything — wrong order = wrong result.',
              'Math fractions are hidden inside every recipe!'
            ],
            assessments: [
              {
                type: 'mcq',
                question: 'In a Lemon Water recipe, when should you add sugar for best results?',
                options: ['After adding ice', 'Into warm water first, then add ice', 'At the very end', 'It doesn\'t matter'],
                correct: 1
              },
              {
                type: 'drag',
                question: 'Arrange the Lemon Water steps in correct order:',
                items: ['Squeeze lemon juice', 'Add sugar to warm water', 'Stir until dissolved', 'Add cold water and ice', 'Taste and adjust salt']
              },
              {
                type: 'match',
                question: 'Match the measurement with its value:',
                left: ['1 tbsp', '1/2 cup', '1 tsp', '1/4 tsp'],
                right: ['125 ml', '5 ml', '15 ml', '1.25 ml']
              },
              {
                type: 'voice',
                question: 'Read out the Lemon Water recipe steps as if you are teaching a new student.'
              },
              {
                type: 'upload',
                question: 'Take a photo of your group\'s reassembled recipe card strip and upload it here.'
              }
            ],
            classroomTips: {
              teacherNotes: ['Pre-cut the recipe step strips before class to save time.', 'Use different colors for ingredients vs method steps.'],
              commonMistakes: ['Students confuse tsp (teaspoon) with tbsp (tablespoon) — create a hand gesture for each.', 'Groups may not read carefully — enforce "one person reads, others listen" rule.'],
              safetyReminders: ['Scissors used for cutting strips — use blunt-tip scissors only.'],
              timeManagement: ['15 min per activity block. Ring a bell at the halfway mark.', 'Keep 5 min at end for cross-group sharing.']
            },
            downloads: [
              { name: 'Lemon_Water_Blueprint.pdf', size: '210 KB', type: 'pdf' },
              { name: 'Recipe_Step_Strips.pdf', size: '180 KB', type: 'pdf' },
              { name: 'Measurement_Worksheet.docx', size: '130 KB', type: 'doc' },
              { name: 'Fraction_Recipe_PPT.pptx', size: '890 KB', type: 'ppt' }
            ]
          },
          {
            id: 'a-4-deciding-items',
            name: 'Deciding which items to make',
            periods: 5,
            icon: '🤔',
            lo: ['LO 1', 'LO 2', 'LO 3', 'LO 5', 'LO 6', 'LO 7', 'LO 8', 'LO 9', 'LO 16'],
            objectives: {
              text: 'Classroom democratic selection of regional traditional snacks using season-based constraints.',
              chips: ['Menu Planning', 'Nutritional Balance', 'Democratic Process']
            },
            introVideo: { label: 'Seasonal Food & Nutrition', duration: '5:00', youtube: '' },
            audioGuide: 'Good food choices depend on what is available, what is healthy, and what we can make safely.',
            materials: ['Regional agro-crop calendars', 'Nutrient grid cards', 'Voting slips', 'Whiteboard'],
            teacherScript: {
              say: '"We have a 5-period window to freeze our menu. Let us vote on choices that do not require fire, are locally sourced, and healthy."',
              expect: 'Groups argue between Sprout Chaat vs Fruit Salads.',
              redFlags: 'If voting gets chaotic, use a structured 2-option elimination bracket.'
            },
            steps: [
              { title: 'Seasonal Mapping', desc: 'Map available raw items against seasonal availability. Discuss which items are in season and affordable right now.', duration: '20 mins', hint: 'Avoid out-of-season expensive elements.', image: '📅 Seasonal Calendar', reflection: 'Which seasonal fruit or vegetable is most available in your area right now?' }
            ],
            groupWork: {
              title: 'Menu Committee',
              description: 'Each group proposes one menu item with cost, nutrition, and preparation difficulty rated.',
              timer: 900,
              roles: [
                { icon: '🍽️', title: 'Menu Designer', task: 'Creates the dish proposal with description.' },
                { icon: '💰', title: 'Cost Calculator', task: 'Estimates approximate ingredient cost.' },
                { icon: '🥦', title: 'Nutrition Expert', task: 'Lists 3 health benefits of the dish.' },
                { icon: '📊', title: 'Presenter', task: 'Pitches the dish to the class for votes.' }
              ]
            },
            discussionQuestions: [
              'Why should we choose locally available ingredients?',
              'What makes a dish "healthy" — taste or nutrition?',
              'How would you plan a menu for 30 students with ₹200 budget?'
            ],
            conclusion: [
              'Good menu planning balances taste, nutrition, cost, and availability.',
              'Voting and democratic decision-making are life skills too.',
              'Local, seasonal food is better for health and the environment.'
            ],
            assessments: [
              {
                type: 'mcq',
                question: 'Which is the BEST reason to choose seasonal ingredients?',
                options: ['They look more colorful', 'They are cheaper and more nutritious', 'They take less time to cook', 'They taste more salty'],
                correct: 1
              },
              {
                type: 'voice',
                question: 'Pitch your favorite fireless dish in 30 seconds — include ingredients, nutrition, and cost.'
              }
            ],
            classroomTips: {
              teacherNotes: ['Bring a real seasonal vegetable or fruit to class for show-and-tell.', 'Connect to science: photosynthesis, nutrition, soil quality.'],
              commonMistakes: ['Students pick dishes that require cooking/fire — keep reminding the "fireless" constraint.'],
              safetyReminders: ['If handling fresh produce for demonstration, ensure hygiene protocols are followed.'],
              timeManagement: ['Spread across 5 periods: 2 for research, 1 for pitching, 1 for voting, 1 for finalizing.']
            },
            downloads: [
              { name: 'Menu_Selection_Matrix.xlsx', size: '1.1 MB', type: 'xlsx' },
              { name: 'Nutrition_Grid_Cards.pdf', size: '340 KB', type: 'pdf' }
            ]
          },
          {
            id: 'a-5-measuring',
            name: 'How to measure, use tools and store food',
            periods: 6,
            icon: '⚖️',
            lo: ['LO 1', 'LO 2', 'LO 3', 'LO 5', 'LO 6', 'LO 7', 'LO 8', 'LO 9', 'LO 16'],
            objectives: {
              text: 'Evaluating precise shelf-life parameters, label notation, and level spoon techniques.',
              chips: ['Math Fractions', 'Storage Technology', 'Precision Skills']
            },
            introVideo: { label: 'Measurement Masterclass', duration: '6:00', youtube: '' },
            audioGuide: 'A level teaspoon and a heaped teaspoon are completely different — this lesson will show you why precision matters!',
            materials: ['Air-tight clear jars', 'Sticky labels', 'Granulated Sugar containers', 'Salt containers', 'Flat ruler for leveling'],
            teacherScript: {
              say: '"A heaped teaspoon holds double the amount of a level teaspoon! For uniform taste balance, sweep off the excess pile cleanly using a flat ruler."',
              expect: 'Students practice leveling motions.',
              redFlags: 'If students are sloppy with leveling, pair a careful student with each careless one.'
            },
            steps: [
              { title: 'Fraction Measurement Lab', desc: 'Group exercises measuring exactly 1/4th, 1/2, and 3/4th volumetric dry indices using sugar and salt.', duration: '20 mins', hint: 'Synchronize directly with fractions class syllabus.', image: '📐 Measurement Lab', reflection: 'What is the difference between a level teaspoon and a heaped teaspoon?' }
            ],
            groupWork: {
              title: 'Measurement Olympics',
              description: 'Groups race to measure exact quantities accurately. The group with least error wins!',
              timer: 720,
              roles: [
                { icon: '🏋️', title: 'Measurer', task: 'Handles all scooping and leveling.' },
                { icon: '📏', title: 'Checker', task: 'Verifies accuracy of each measurement.' },
                { icon: '⏱️', title: 'Timer', task: 'Records how long each measurement takes.' },
                { icon: '📝', title: 'Recorder', task: 'Writes down all measurements in the logbook.' }
              ]
            },
            discussionQuestions: [
              'Why do recipes use standard measurements instead of "a pinch" or "a handful"?',
              'How would a recipe change if you doubled every ingredient?',
              'What fraction of a cup is 4 tablespoons?'
            ],
            conclusion: [
              'Precision in measurement = consistent taste every time.',
              'Math fractions are used every single time we cook.',
              'Proper storage extends the life of food and prevents waste.'
            ],
            assessments: [
              {
                type: 'mcq',
                question: 'How many teaspoons make 1 tablespoon?',
                options: ['2 teaspoons', '3 teaspoons', '4 teaspoons', '5 teaspoons'],
                correct: 1
              },
              {
                type: 'drag',
                question: 'Arrange from smallest to largest measurement:',
                items: ['1 pinch', '1 teaspoon', '1 tablespoon', '1/4 cup', '1/2 cup', '1 cup']
              }
            ],
            classroomTips: {
              teacherNotes: ['Bring all tools physically — visual + tactile is essential for this lesson.', 'Create a laminated "Measurement Conversion Chart" for each group.'],
              commonMistakes: ['Heaped vs level is the #1 confusion — drill it multiple times.', 'Students eyeball instead of measuring — enforce proper technique.'],
              safetyReminders: ['Spillage of sugar/salt — keep floor dry to prevent slipping.', 'No glass jars at this level — use plastic.'],
              timeManagement: ['2 periods for measuring drills, 2 for storage labeling, 2 for consolidation.']
            },
            downloads: [
              { name: 'Volumetric_Fraction_Guide.pptx', size: '1.8 MB', type: 'ppt' },
              { name: 'Measurement_Conversion_Chart.pdf', size: '190 KB', type: 'pdf' }
            ]
          },
          {
            id: 'a-7-beverages',
            name: 'Making beverages',
            periods: 3,
            icon: '🥤',
            lo: ['LO 1', 'LO 2', 'LO 3', 'LO 5', 'LO 6', 'LO 8', 'LO 9'],
            objectives: {
              text: 'Realtime synthesis of Lemonade/Aam Panna configurations; testing solubility rates.',
              chips: ['Practical Squeezing', 'Taste Optimization', 'Science Integration']
            },
            introVideo: { label: 'Lemonade Science — Solubility Demo', duration: '3:50', youtube: '' },
            audioGuide: 'Roll the lemon before you squeeze it. This breaks the juice cells inside and you get more juice with less effort!',
            materials: ['Fresh lemons', 'Water jugs', 'Strainer systems', 'Jaggery alternatives', 'Salt', 'Black pepper', 'Measuring cups'],
            teacherScript: {
              say: '"Gently roll the lemon on the table under your palm before slicing. This breaks inside cells and releases double the liquid volume safely!"',
              expect: 'Students perform the rolling physical compression.',
              redFlags: 'Some students may press too hard and burst the lemon — demonstrate moderate pressure.'
            },
            steps: [
              { title: 'Lemon Technique', desc: 'Teach the lemon-rolling technique. Students practice on their lemons before squeezing. Compare juice yield with and without rolling.', duration: '10 mins', hint: 'Enforce constant dry cleanup wrappers. Have towels ready.', image: '🍋 Lemon Rolling Technique', reflection: 'How much more juice did you get by rolling vs not rolling?' },
              { title: 'Beverage Synthesis', desc: 'Groups deploy calculated mixture ratios, filter through strainers, and optimize taste profiles with salt, sugar, and black pepper.', duration: '25 mins', hint: 'Encourage experimentation within safe taste boundaries.', image: '🥤 Beverage Making', reflection: 'What would you change in your recipe to make it better next time?' }
            ],
            groupWork: {
              title: 'Taste Testing Panel',
              description: 'Each group makes their beverage and a panel of 3 students from OTHER groups judges it on taste, balance, and presentation.',
              timer: 900,
              roles: [
                { icon: '👨‍🍳', title: 'Beverage Maker', task: 'Prepares the drink following the recipe precisely.' },
                { icon: '📏', title: 'Measurement Expert', task: 'Ensures all quantities are exactly right.' },
                { icon: '🎨', title: 'Presentation Lead', task: 'Decides how to serve and present the drink.' },
                { icon: '⭐', title: 'Quality Taster', task: 'Tastes and gives final OK before serving.' }
              ]
            },
            discussionQuestions: [
              'What is "solubility" and how did you observe it while making the drink?',
              'Why does salt make a sweet drink taste better?',
              'How would Aam Panna differ from Lemonade in preparation?'
            ],
            conclusion: [
              'Cooking involves chemistry — mixing, dissolving, and balancing.',
              'Taste is subjective but proportions are scientific.',
              'Presentation matters as much as preparation!'
            ],
            assessments: [
              {
                type: 'mcq',
                question: 'Why do we roll the lemon before squeezing?',
                options: ['To make it warm', 'To break juice cells for more yield', 'To clean the skin', 'To make it round'],
                correct: 1
              },
              {
                type: 'drag',
                question: 'Arrange Lemon Water steps in order:',
                items: ['Roll the lemon', 'Squeeze juice', 'Mix sugar in warm water', 'Add juice', 'Add ice and taste']
              },
              {
                type: 'voice',
                question: 'Describe the taste of your group\'s beverage. What would you improve?'
              },
              {
                type: 'upload',
                question: 'Upload a photo of your group\'s finished beverage!'
              }
            ],
            classroomTips: {
              teacherNotes: ['Pre-arrange cleanup station with towels and waste bins before class.', 'Have plain water available for students who don\'t like citrus.'],
              commonMistakes: ['Not straining properly — seeds in drink is a common issue.', 'Adding too much salt — start with just a pinch and adjust.'],
              safetyReminders: ['No sharp knives — use safe plastic citrus squeezers.', 'Wipe up any spills immediately to prevent slipping.'],
              timeManagement: ['10 min technique, 25 min making, 10 min tasting and discussion.']
            },
            downloads: [
              { name: 'Beverage_Standard_Recipe.pdf', size: '310 KB', type: 'pdf' },
              { name: 'Taste_Testing_Rubric.docx', size: '95 KB', type: 'doc' },
              { name: 'Beverage_PPT.pptx', size: '1.4 MB', type: 'ppt' }
            ]
          }
        ]
      }
    ]
  },
  life: {
    label: 'Work with Life Forms',
    icon: '🌱',
    color: 'mint',
    headerBg: 'var(--mint)',
    headerText: 'var(--mint-dark)',
    projects: []
  },
  machines: {
    label: 'Work with Machines & Materials',
    icon: '⚙️',
    color: 'peach',
    headerBg: 'var(--peach)',
    headerText: 'var(--peach-dark)',
    projects: []
  }
};

/* ══════════════════════
   NAVIGATION ENGINE
   ══════════════════════ */
function go(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  var target = document.getElementById(id);
  if (target) {
    target.classList.add('active');
    var container = target.querySelector('.scrollable');
    if (container) container.scrollTop = 0;
  }
  highlightDesktopNav(id);
}

function selectTopic(topicKey) {
  state.topic = topicKey;
  var d = DATA[topicKey];
  document.getElementById('topic-status-tag').textContent = d.icon + ' ' + d.label;

  var hdr = document.getElementById('topic-header');
  hdr.innerHTML = `<div style="font-size:13px;font-weight:800;color:${d.headerText};text-transform:uppercase;letter-spacing:0.04em;">${d.icon} ${d.label}</div><div style="font-size:12px;color:${d.headerText};opacity:0.7;margin-top:2px;">${d.projects.length} Projects Available</div>`;
  hdr.style.background = d.headerBg;

  var list = document.getElementById('topic-projects-list');
  list.innerHTML = '';

  if (d.projects.length === 0) {
    list.innerHTML = `<div style="margin:40px 20px;text-align:center;color:var(--text-muted);"><div style="font-size:48px;margin-bottom:12px;">🚧</div><div style="font-weight:800;font-size:14px;margin-bottom:4px;">Coming Soon</div><div style="font-size:12px;">This topic's projects are under development.</div></div>`;
  } else {
    d.projects.forEach(p => {
      list.innerHTML += `
        <div class="proj-card" onclick="selectProject('${topicKey}', '${p.id}')">
          <div class="proj-row">
            <div class="proj-num" style="background:${d.headerBg};color:${d.headerText};">${p.num}</div>
            <div class="proj-info">
              <div class="proj-name">${p.name}</div>
              <div class="proj-desc">${p.desc}</div>
              <div style="display:flex;gap:5px;margin-top:6px;flex-wrap:wrap;">
                <span class="chip chip-${d.color}">${p.activities.length} Activities</span>
                <span class="chip chip-${d.color}">${p.periods} Periods</span>
              </div>
            </div>
            <i class="ti ti-chevron-right" style="color:var(--text-muted);font-size:18px;flex-shrink:0;"></i>
          </div>
        </div>`;
    });
  }
  go('s-topic');
}

function selectProject(topicKey, projId) {
  var d = DATA[topicKey];
  var proj = d.projects.find(p => p.id === projId);
  state.project = proj;
  state.topic = topicKey;

  document.getElementById('act-status-tag').textContent = d.icon + ' ' + proj.name;
  document.getElementById('acts-back-label').textContent = d.label;

  var hdr = document.getElementById('act-header');
  hdr.innerHTML = `
    <div style="font-size:17px;font-weight:800;color:${d.headerText};">${proj.name}</div>
    <div style="font-size:12px;color:${d.headerText};opacity:0.7;margin-top:2px;">📅 ${proj.periods} total periods · ${proj.activities.length} activities</div>`;
  hdr.style.background = d.headerBg;

  var list = document.getElementById('activities-list');
  list.innerHTML = `<div style="margin:8px 16px;padding:10px 14px;background:var(--yellow);border-radius:10px;font-size:11px;font-weight:700;border:1px solid var(--yellow-mid);display:flex;align-items:center;gap:6px;">⚡ Tap any activity to open the full interactive lesson plan</div>`;

  proj.activities.forEach((act, idx) => {
    var completed = state.completedSteps[act.id] ? '✅' : '';
    list.innerHTML += `
      <div class="act-row" onclick="igniteInteractiveLesson('${topicKey}', '${projId}', '${act.id}')">
        <div class="act-num" style="background:${d.headerBg};color:${d.headerText};">${act.icon}</div>
        <div class="act-info">
          <div class="act-name">${act.name} ${completed}</div>
          <div class="act-meta">${act.periods} Period${act.periods > 1 ? 's' : ''} · ${act.lo.slice(0, 3).join(', ')}${act.lo.length > 3 ? '…' : ''}</div>
        </div>
        <span class="act-periods" style="background:${d.headerBg};color:${d.headerText};">${act.periods}P</span>
      </div>`;
  });
  go('s-activities');
}

/* ── INTERACTIVE LESSON ENGINE ── */
function igniteInteractiveLesson(topicKey, projId, actId) {
  var act = state.project.activities.find(a => a.id === actId);
  state.activity = act;
  state.currentTab = 'Sessions & Learning Plan';
  state.viewMode = 'teach';
  state.completedSteps[act.id] = state.completedSteps[act.id] || {};
  state.matchPairs = {};
  state.matchSelected = { left: null, right: null };
  state.assessmentScore = 0;
  lessonPeriodRoutingState = 0;

  document.getElementById('lesson-title').textContent = act.icon + ' ' + act.name;
  document.getElementById('lesson-xp').textContent = state.xp;
  document.getElementById('xp-count').textContent = state.xp;

  var chips = document.getElementById('lesson-chips');
  chips.innerHTML = `<span class="chip chip-lavender">${act.periods} Period${act.periods > 1 ? 's' : ''}</span>`;
  act.lo.forEach(l => chips.innerHTML += `<span class="chip chip-mint">${l}</span>`);
  if (act.objectives && act.objectives.chips) {
    act.objectives.chips.forEach(c => chips.innerHTML += `<span class="chip chip-sky">${c}</span>`);
  }

  /* Build tabs */
  var TAB_NAMES = ['Sessions & Learning Plan', 'Overview', 'Activity Steps', 'Group Work', 'Discussion', 'Conclusion', 'Assessment', 'Classroom Tips', 'Downloads'];
  var tabs = document.getElementById('lesson-tabs');
  tabs.innerHTML = '';
  TAB_NAMES.forEach(function(t) {
    var active = (t === 'Sessions & Learning Plan') ? 'active' : '';
    tabs.innerHTML += `<button class="tab-btn ${active}" onclick="switchLessonView('${t}', this)">${t}</button>`;
  });

  /* Reset footer period buttons */
  document.querySelectorAll('.period-toggle-btn').forEach(function(b) { b.classList.remove('active'); });

  /* Reset mode buttons */
  document.getElementById('btn-teach-mode').classList.add('active');
  document.getElementById('btn-student-mode').classList.remove('active');

  renderLessonContent();
  go('s-lesson');
}

function switchLessonView(name, btn) {
  state.currentTab = name;
  document.querySelectorAll('#lesson-tabs .tab-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  renderLessonContent();
}

function toggleViewMode(mode) {
  state.viewMode = mode;
  document.getElementById('btn-teach-mode').classList.toggle('active', mode === 'teach');
  document.getElementById('btn-student-mode').classList.toggle('active', mode === 'student');
  renderLessonContent();
}

/* ── MASTER LESSON RENDERER ── */
function renderLessonContent() {
  var area = document.getElementById('lesson-content');
  var act = state.activity;
  area.innerHTML = '';

  var TAB_PROGRESS = { 'Sessions & Learning Plan': 10, 'Overview': 22, 'Activity Steps': 38, 'Group Work': 52, 'Discussion': 64, 'Conclusion': 76, 'Assessment': 88, 'Classroom Tips': 94, 'Downloads': 100 };
  var pct, labelText;
  if (lessonPeriodRoutingState === 1) {
    pct = 45;
    labelText = 'PERIOD 1';
  } else if (lessonPeriodRoutingState === 2) {
    pct = 75;
    labelText = 'PERIOD 2';
  } else {
    pct = TAB_PROGRESS[state.currentTab] || 10;
    labelText = state.currentTab.toUpperCase();
  }
  document.getElementById('lesson-progress').style.width = pct + '%';
  document.getElementById('progress-label').textContent = labelText;

  var box = document.createElement('div');
  box.className = 'workspace-block';
  box.innerHTML = renderTab(act, state.currentTab);
  area.appendChild(box);

  wireInteractivity();
}

function renderTab(act, tab) {
  switch (tab) {
    case 'Sessions & Learning Plan': return renderSessionsLearningPlan(act);
    case 'Overview':        return renderOverview(act) + renderDemonstration(act);
    case 'Activity Steps':  return renderActivitySteps(act);
    case 'Group Work':      return renderGroupWork(act);
    case 'Discussion':      return renderDiscussion(act);
    case 'Conclusion':      return renderConclusion(act);
    case 'Assessment':      return renderAssessment(act);
    case 'Classroom Tips':  return renderClassroomTips(act);
    case 'Downloads':       return renderDownloads(act);
    default: return '<p>Loading...</p>';
  }
}

/* ── TAB: OVERVIEW ── */
function renderOverview(act) {
  return `
    <div class="interactive-node-card">
      <div class="node-title-area">🎯 Learning Objective</div>
      <p class="node-body-text">${act.objectives.text}</p>
      <div class="skills-row">
        ${act.objectives.chips.map(c => `<span class="skill-tag">${c}</span>`).join('')}
        ${act.lo.map(l => `<span class="chip chip-lavender" style="font-size:10px;">${l}</span>`).join('')}
      </div>
    </div>

    <div class="xp-award-banner">
      <div>
        <div class="xp-award-number">+25 XP</div>
        <div class="xp-award-label">Complete this lesson</div>
        <div class="xp-award-sub">to earn Kitchen Learner badge</div>
      </div>
      <div class="badges-row">
        <div class="badge-item">🍋</div>
        <div class="badge-item">⭐</div>
        <div class="badge-item">🏆</div>
      </div>
    </div>

    <div class="interactive-node-card">
      <div class="node-title-area">🧰 Materials Required</div>
      <p class="node-body-text" style="font-size:11px;color:var(--text-muted);">Tap any item to hear its pronunciation</p>
      <div class="materials-grid-pattern">
        ${act.materials.map(m => `
          <div class="material-audio-capsule" onclick="speakText('${m}')">
            <span class="mat-icon-avatar">${getMaterialIcon(m)}</span>
            <span class="mat-label-meta">${m}</span>
            <div class="audio-micro-indicator"><i class="ti ti-volume"></i></div>
          </div>
        `).join('')}
      </div>
    </div>

    <div class="hook-card">
      <div class="hook-label">🎤 Teacher Hook — Open with This</div>
      <div class="hook-text">${act.teacherScript.say}</div>
      <div class="hook-meta">💬 Expected: ${act.teacherScript.expect}</div>
    </div>

    ${state.viewMode === 'teach' ? `
    <div class="interactive-node-card" style="background:var(--sky);">
      <div class="node-title-area" style="color:var(--sky-dark);">🔊 Audio Introduction Guide</div>
      <p class="node-body-text" style="color:var(--sky-dark);">${act.audioGuide}</p>
      <button class="step-interactive-btn" style="margin-top:10px;background:var(--sky-dark);color:white;border-color:var(--sky-dark);" onclick="speakText('${act.audioGuide.replace(/'/g, "\\'")}')">
        <i class="ti ti-player-play"></i> Play Audio Guide
      </button>
    </div>` : ''}
  `;
}

/* ── TAB: DEMONSTRATION ── */
function renderDemonstration(act) {
  return `
    <div class="multimedia-hub">
      <div class="media-header-badge">📹 MULTIMEDIA LEARNING HUB</div>
      <div class="video-surface" onclick="playIntroVideo('${act.id}')">
        <i class="ti ti-player-play"></i>
        <span>${act.introVideo.label}</span>
        <span style="font-size:10px;color:#64748b;">${act.introVideo.duration} · Tap to Play</span>
        <div class="video-overlay-timeline"><div class="video-overlay-progress" id="vid-progress-${act.id}"></div></div>
      </div>
      <div class="media-trigger-grid">
        <button class="media-action-btn" onclick="speakText('${act.audioGuide.replace(/'/g, "\\'")}')">
          <i class="ti ti-headphones"></i> Audio Guide
        </button>
        <button class="media-action-btn" onclick="alert('PPT slides loading...')">
          <i class="ti ti-presentation"></i> View PPT
        </button>
        <button class="media-action-btn" onclick="alert('PDF opening...')">
          <i class="ti ti-file-text"></i> Open PDF
        </button>
        <button class="media-action-btn" onclick="alert('Word document opening...')">
          <i class="ti ti-file-word"></i> Open Doc
        </button>
      </div>
    </div>

    ${act.steps.map((s, i) => `
      <div class="interactive-node-card">
        <div class="node-title-area"><span class="step-index-pill">STEP ${i + 1}</span> ${s.title}</div>
        <div class="step-image-placeholder">
          <span style="font-size:28px;">${s.image ? s.image.split(' ')[0] : '📷'}</span>
          <span>${s.image || 'Activity Image'}</span>
        </div>
        <p class="node-body-text">${s.desc}</p>
        <div style="margin-top:8px;display:flex;gap:6px;">
          <button class="step-interactive-btn" onclick="speakText('${s.desc.replace(/'/g, "\\'")}')">
            <i class="ti ti-volume"></i> Listen
          </button>
          <div class="step-duration-tag"><i class="ti ti-clock"></i> ${s.duration}</div>
        </div>
      </div>
    `).join('')}
  `;
}

/* ── TAB: ACTIVITY STEPS ── */
function renderActivitySteps(act) {
  return `
    <div class="step-timeline-container">
      ${act.steps.map((s, i) => {
        var isComplete = state.completedSteps[act.id] && state.completedSteps[act.id][i];
        return `
          <div class="step-card-wrapper" id="step-wrapper-${i}">
            <div class="step-anchor-node ${isComplete ? 'completed' : ''}" id="step-anchor-${i}"></div>
            <div class="step-inner-box ${isComplete ? 'step-completed' : ''}" id="step-box-${i}">
              <div class="step-meta-row">
                <span class="step-index-pill">STEP ${i + 1} · ${s.title.toUpperCase()}</span>
                <div class="timer-display" id="timer-${act.id}-${i}"
                     onclick="toggleStepTimer('${act.id}', ${i}, ${parseDuration(s.duration)})">
                  <i class="ti ti-clock"></i>
                  <span id="timer-text-${act.id}-${i}">${s.duration}</span>
                </div>
              </div>
              <div class="step-image-placeholder">
                <span style="font-size:24px;">${s.image ? s.image.split(' ')[0] : '📷'}</span>
                <span style="font-size:11px;">${s.image || 'Step Visual'}</span>
              </div>
              <p class="node-body-text" style="font-weight:700;color:#111827;">${s.desc}</p>
              <p style="font-size:11px;color:var(--text-muted);margin-top:4px;font-weight:600;">💡 ${s.hint}</p>
              ${s.reflection ? `
                <textarea class="step-reflection-input" placeholder="Student reflection: ${s.reflection}" rows="2"
                  id="reflect-${act.id}-${i}" onchange="saveReflection('${act.id}', ${i}, this.value)"></textarea>
              ` : ''}
              <div class="step-action-footer">
                <button class="step-interactive-btn" onclick="speakText('${s.desc.replace(/'/g, "\\'")}')">
                  <i class="ti ti-volume"></i> Audio
                </button>
                <button class="step-interactive-btn" onclick="startVoiceForStep(${i})">
                  <i class="ti ti-microphone"></i> Voice
                </button>
                <button class="step-interactive-btn complete-trigger-btn ${isComplete ? 'completed-status' : ''}"
                  id="complete-btn-${act.id}-${i}"
                  onclick="markStepComplete('${act.id}', ${i})">
                  <i class="ti ti-${isComplete ? 'check' : 'circle-check'}"></i>
                  ${isComplete ? 'Done ✓' : 'Mark Done'}
                </button>
              </div>
            </div>
          </div>`;
      }).join('')}
    </div>
  `;
}

// Intercept tab switches engine to clear screen routing back to default container profiles
var originalSwitchLessonView = switchLessonView;
switchLessonView = function(name, btn) {
  lessonPeriodRoutingState = 0; // reset routing bypass flags
  document.querySelectorAll('.period-toggle-btn').forEach(function(b) { b.classList.remove('active'); });
  originalSwitchLessonView(name, btn);
};

// Intercept core structural renderer pipeline engine seamlessly
var coreRenderTabBypass = renderTab;
renderTab = function(act, tab) {
  if (lessonPeriodRoutingState === 1) {
    return `
      <div class="period-independent-view active-period">
        <div class="section-banner" style="background:var(--yellow); color:var(--yellow-dark); margin-bottom:16px;">
          <span class="section-banner-icon">⏰</span>
          <div>
            <div class="section-banner-title" style="font-size:18px;">Period 1 — 35 min</div>
            <div class="section-banner-sub">Curiosity Hook & Introductory Core Concepts</div>
          </div>
        </div>

        <div class="tip-card" style="background:#fff7ed; border-color:#fed7aa; margin-bottom:12px;">
          <div class="recap-num" style="background:var(--coral-dark);">1-7</div>
          <div class="tip-text" style="color:var(--text); flex:1;">
            <div style="font-weight:800; font-size:14px; color:var(--coral-dark);">The Closed Tiffin Mystery (Curiosity Hook)</div>
            <p style="font-size:12px; margin-top:4px; line-height:1.5;"><b>SETUP:</b> Enter class carrying a closed steel tiffin. Place on table. Do NOT open it. Write on board: <i>"Can you become a chef without cooking?"</i></p>
            <span class="chip chip-coral" style="margin-top:8px; font-size:10px;">Teacher script + tips</span>
          </div>
        </div>

        <div class="tip-card" style="background:#fffbeb; border-color:#fde68a; margin-bottom:12px;">
          <div class="recap-num" style="background:var(--yellow-dark);">8-15</div>
          <div class="tip-text" style="color:var(--text); flex:1;">
            <div style="font-weight:800; font-size:14px; color:var(--yellow-dark);">Maharashtra Food Map (Food Journey)</div>
            <p style="font-size:12px; margin-top:4px; line-height:1.5;"><b>ACTIVITY:</b> Draw Maharashtra map on board. Ask: "If we travel across Maharashtra, what foods will we find?" Build list by region.</p>
            <span class="chip chip-yellow" style="margin-top:8px; font-size:10px;">Regional foods + questions</span>
          </div>
        </div>

        <div class="tip-card" style="background:var(--mint); border-color:var(--mint-mid); margin-bottom:12px;">
          <div class="recap-num" style="background:var(--mint-dark);">16-20</div>
          <div class="tip-text" style="color:var(--text); flex:1;">
            <div style="font-weight:800; font-size:14px; color:var(--mint-dark);">What Is a Recipe? (p.128 Core Concept)</div>
            <p style="font-size:12px; margin-top:4px; line-height:1.5;"><b>KEY DEFINITION:</b> <b>Recipe</b> = a set of instructions that tells us how to make a dish. It has ingredients + quantities + steps to follow.</p>
            <span class="chip chip-mint" style="margin-top:8px; font-size:10px;">3-part diagram + questions</span>
          </div>
        </div>

        <div class="tip-card" style="background:var(--lavender); border-color:var(--lavender-mid); margin-bottom:12px;">
          <div class="recap-num" style="background:var(--lavender-dark);">21-32</div>
          <div class="tip-text" style="color:var(--text); flex:1;">
            <div style="font-weight:800; font-size:14px; color:var(--lavender-dark);">Recipe Detective — Koshimbir (p.132 Recipe Reading)</div>
            <p style="font-size:12px; margin-top:4px; line-height:1.5;"><b>INSTRUCTION:</b> Open textbook p.132. Students read Koshimbir recipe silently for 3 min. Then answer Recipe Detective questions.</p>
            <span class="chip chip-lavender" style="margin-top:8px; font-size:10px;">Full recipe + detective questions</span>
          </div>
        </div>

        <div class="tip-card" style="background:#f3f4f6; border-color:var(--border); margin-bottom:16px;">
          <div class="recap-num" style="background:var(--text-muted);">33-35</div>
          <div class="tip-text" style="color:var(--text); flex:1;">
            <div style="font-weight:800; font-size:14px; color:var(--text-muted);">Quick Reflection (Wrap-up)</div>
            <p style="font-size:12px; margin-top:4px; line-height:1.5;"><b>CLOSING SCRIPT:</b> "Can anyone become a chef just by guessing ingredients? Next period — we discover what happens when recipes go wrong!"</p>
          </div>
        </div>

        <button class="submit-evaluation-btn" style="background:var(--peach-dark); margin-top:4px;" onclick="directPeriodRoute(2)">
          Go to Period 2 →
        </button>
      </div>`;
  }
  
  if (lessonPeriodRoutingState === 2) {
    return `
      <div class="period-independent-view active-period">
        <div class="section-banner" style="background:var(--peach); color:var(--peach-dark); margin-bottom:16px;">
          <span class="section-banner-icon">⚡</span>
          <div>
            <div class="section-banner-title" style="font-size:18px;">Period 2 — 35 min</div>
            <div class="section-banner-sub">Interactive Practical Challenges & Delivery Evaluation</div>
          </div>
        </div>

        <div class="tip-card" style="background:#fff7ed; border-color:#fed7aa; margin-bottom:12px;">
          <div class="recap-num" style="background:var(--coral-dark);">1-8</div>
          <div class="tip-text" style="color:var(--text); flex:1;">
            <div style="font-weight:800; font-size:14px; color:var(--coral-dark);">Recipe Disaster Game (Sequence Game)</div>
            <p style="font-size:12px; margin-top:4px; line-height:1.5;"><b>BOARD WORK:</b> Write these sandwich steps in WRONG order on board. Students must rearrange.</p>
            <span class="chip chip-coral" style="margin-top:8px; font-size:10px;">Scrambled steps + activity</span>
          </div>
        </div>

        <div class="tip-card" style="background:#fffbeb; border-color:#fde68a; margin-bottom:12px;">
          <div class="recap-num" style="background:var(--yellow-dark);">9-18</div>
          <div class="tip-text" style="color:var(--text); flex:1;">
            <div style="font-weight:800; font-size:14px; color:var(--yellow-dark);">Mixing vs Spreading vs Assembling (Methods)</div>
            <p style="font-size:12px; margin-top:4px; line-height:1.5;"><b>TEXTBOOK P.128:</b> Three methods taught in Activity 1. Use hand gestures with students.</p>
            <span class="chip chip-yellow" style="margin-top:8px; font-size:10px;">Method cards + examples</span>
          </div>
        </div>

        <div class="tip-card" style="background:var(--lavender); border-color:var(--lavender-mid); margin-bottom:12px;">
          <div class="recap-num" style="background:var(--lavender-dark);">19-25</div>
          <div class="tip-text" style="color:var(--text); flex:1;">
            <div style="font-weight:800; font-size:14px; color:var(--lavender-dark);">Recipe Detective Challenge (Group Work)</div>
            <p style="font-size:12px; margin-top:4px; line-height:1.5;">Identify logic structural anomalies within faulty recipes template layout sets.</p>
            <span class="chip chip-lavender" style="margin-top:8px; font-size:10px;">Group roles + task</span>
          </div>
        </div>

        <div class="tip-card" style="background:var(--mint); border-color:var(--mint-mid); margin-bottom:12px;">
          <div class="recap-num" style="background:var(--mint-dark);">26-30</div>
          <div class="tip-text" style="color:var(--text); flex:1;">
            <div style="font-weight:800; font-size:14px; color:var(--mint-dark);">Career Connection (Careers)</div>
            <p style="font-size:12px; margin-top:4px; line-height:1.5;"><b>TEACHER PROMPT:</b> "Who uses recipes in their job every single day?" Build list with students. Connect to local community.</p>
            <span class="chip chip-mint" style="margin-top:8px; font-size:10px;">Career cards</span>
          </div>
        </div>

        <div class="tip-card" style="background:#f3f4f6; border-color:var(--border); margin-bottom:16px;">
          <div class="recap-num" style="background:var(--peach-dark);">31-35</div>
          <div class="tip-text" style="color:var(--text); flex:1;">
            <div style="font-weight:800; font-size:14px; color:var(--peach-dark);">Exit Ticket (Assessment)</div>
            <p style="font-size:12px; margin-top:4px; line-height:1.5;"><b>INSTRUCTION:</b> Students write 5 answers in notebook. Individual work. No discussion.</p>
            <span class="chip chip-sky" style="margin-top:8px; font-size:10px;">Interactive quiz</span>
          </div>
        </div>

        <button class="submit-evaluation-btn" style="background:var(--yellow-dark);" onclick="directPeriodRoute(1)">
          ← Return to Period 1
        </button>
      </div>`;
  }

  return coreRenderTabBypass(act, tab);
};

function renderSessionsLearningPlan(act) {
  var periodMins = (state.advancedOptions && state.advancedOptions.periodDuration) ? state.advancedOptions.periodDuration : 35;
  var totalMins = periodMins * act.periods;

  var html = '<div style="padding:12px 14px 4px;">';
  html += '<div class="session-activity-card">';
  html += '<div style="display:flex;align-items:center;gap:12px;flex:1;">';
  html += '<div class="session-activity-icon" style="background:var(--yellow);">📖</div>';
  html += '<div><div style="font-size:14px;font-weight:700;color:var(--text);">' + act.name + '</div>';
  html += '<div style="font-size:11px;color:var(--text-muted);margin-top:2px;">' + act.lo.slice(0,3).join(' · ') + ' · Groups of 4–5</div></div></div>';
  html += '<span class="chip chip-yellow">' + act.periods + ' periods</span>';
  html += '</div></div>';

  html += '<div class="session-half-label" style="color:var(--mint-dark);">First Half — ' + Math.round(totalMins / 2) + ' Minutes</div>';
  html += '<div class="session-split-block clickable-plan-card" onclick="directPeriodRoute(1)">';
  html += '<div class="session-split-header" style="background:var(--mint);">';
  html += '<div class="session-split-num" style="background:var(--mint-dark);">1</div>';
  html += '<div><div class="session-split-title" style="font-weight:800;">Period 1</div><div class="session-split-sub">' + Math.round(totalMins / 2) + ' Mins · First Half — Learning Plan</div></div>';
  html += '</div>';
  html += '<div class="session-seg-bar">';
  html += '<div class="session-seg" style="flex:3;background:#6bbf8e;"><span class="session-seg-label">Intro</span><span class="session-seg-time">8 m</span></div>';
  html += '<div class="session-seg" style="flex:5;background:#2d7d52;"><span class="session-seg-label">Demo</span><span class="session-seg-time">15 m</span></div>';
  html += '<div class="session-seg" style="flex:4;background:#1a5c3a;"><span class="session-seg-label">Practice</span><span class="session-seg-time">12 m</span></div>';
  html += '</div>';
  html += '<div class="session-step-list">';
  html += '<div class="session-step-item"><div class="session-step-dot" style="background:var(--mint-dark);"></div><div class="session-step-text"><b>Closed Tiffin Hook:</b> Introduction riddle session inside structural focus boundaries.</div></div>';
  html += '<div class="session-step-item"><div class="session-step-dot" style="background:var(--mint-dark);"></div><div class="session-step-text"><b>Core Concept Mapping:</b> Definition exploration matching standard recipe mechanics.</div></div>';
  html += '</div></div>';

  html += '<div class="session-half-label" style="color:var(--peach-dark);">Second Half — ' + Math.round(totalMins / 2) + ' Minutes</div>';
  html += '<div class="session-split-block clickable-plan-card" onclick="directPeriodRoute(2)">';
  html += '<div class="session-split-header" style="background:var(--peach);">';
  html += '<div class="session-split-num" style="background:var(--peach-dark);">2</div>';
  html += '<div><div class="session-split-title" style="font-weight:800;">Period 2</div><div class="session-split-sub">' + Math.round(totalMins / 2) + ' Mins · Second Half — Execution</div></div>';
  html += '</div>';
  html += '<div class="session-seg-bar">';
  html += '<div class="session-seg" style="flex:5;background:#f4a47a;"><span class="session-seg-label">Activity</span><span class="session-seg-time">18 m</span></div>';
  html += '<div class="session-seg" style="flex:3;background:#c0573a;"><span class="session-seg-label">Share</span><span class="session-seg-time">12 m</span></div>';
  html += '<div class="session-seg" style="flex:2;background:#8b3520;"><span class="session-seg-label">Clean</span><span class="session-seg-time">5 m</span></div>';
  html += '</div>';
  html += '<div class="session-step-list">';
  html += '<div class="session-step-item"><div class="session-step-dot" style="background:var(--peach-dark);"></div><div class="session-step-text"><b>Recipe Disaster Game:</b> Reordering sequencing drills active parameters.</div></div>';
  html += '<div class="session-step-item"><div class="session-step-dot" style="background:var(--peach-dark);"></div><div class="session-step-text"><b>Methods Evaluation:</b> Mixing, Spreading vs Assembling practical gestures processing.</div></div>';
  html += '</div></div>';

  return html;
}

/* ── TAB: GROUP WORK ── */
function renderGroupWork(act) {
  var gw = act.groupWork;
  return `
    <div class="group-banner">
      <div class="group-banner-title"><i class="ti ti-users"></i> ${gw.title}</div>
      <div class="group-banner-sub">${gw.description}</div>
    </div>

    <div class="interactive-node-card" style="background:#fffbeb;">
      <div class="node-title-area" style="color:#d97706;"><i class="ti ti-clock"></i> Group Activity Timer</div>
      <div style="display:flex;align-items:center;gap:10px;">
        <div class="timer-display" id="group-timer-display" style="font-size:20px;padding:10px 18px;">
          <i class="ti ti-clock"></i>
          <span id="group-timer-text">${formatTime(gw.timer)}</span>
        </div>
        <button class="step-interactive-btn complete-trigger-btn" style="flex:1;" onclick="toggleGroupTimer(${gw.timer})">
          <i class="ti ti-player-play" id="group-timer-icon"></i> Start Timer
        </button>
      </div>
    </div>

    <div class="interactive-node-card">
      <div class="node-title-area">👥 Group Roles — Tap to Assign</div>
      <div class="role-allocation-grid">
        ${gw.roles.map((r, i) => `
          <div class="role-toggle-pod" id="role-pod-${i}" onclick="toggleRole(${i})">
            <span class="role-icon">${r.icon}</span>
            <div style="font-size:12px;font-weight:800;">${r.title}</div>
            <div style="font-size:10px;font-weight:600;margin-top:3px;line-height:1.3;">${r.task}</div>
          </div>
        `).join('')}
      </div>
    </div>

    <div class="interactive-node-card" style="background:var(--lavender);">
      <div class="node-title-area" style="color:var(--lavender-dark);">🤝 Collaboration Guide</div>
      <p class="node-body-text" style="color:var(--lavender-dark);">Each member must speak at least once. Rotate roles every session. Score your team on communication at the end.</p>
      <div style="display:flex;gap:6px;margin-top:10px;flex-wrap:wrap;">
        <span class="chip" style="background:white;color:var(--lavender-dark);">🗣️ Speak Up</span>
        <span class="chip" style="background:white;color:var(--lavender-dark);">👂 Listen</span>
        <span class="chip" style="background:white;color:var(--lavender-dark);">🙌 Respect</span>
      </div>
    </div>
  `;
}

/* ── TAB: DISCUSSION ── */
function renderDiscussion(act) {
  return `
    <div class="section-banner" style="background:var(--sky);color:var(--sky-dark);">
      <span class="section-banner-icon">💬</span>
      <div>
        <div class="section-banner-title">Discussion Questions</div>
        <div class="section-banner-sub">Tap mic to record your voice answer</div>
      </div>
    </div>
    ${act.discussionQuestions.map((q, i) => `
      <div class="discussion-card">
        <div class="discussion-question">Q${i + 1}. ${q}</div>
        <div style="display:flex;gap:8px;flex-wrap:wrap;">
          <button class="voice-answer-btn" onclick="startVoiceForDiscussion(${i})">
            <i class="ti ti-microphone"></i> Speak Your Answer
          </button>
          <button class="voice-answer-btn" style="border-style:solid;" onclick="speakText('${q.replace(/'/g, "\\'")}')">
            <i class="ti ti-volume"></i> Read Question
          </button>
        </div>
        <div id="discuss-answer-${i}" style="margin-top:8px;font-size:11.5px;color:var(--sky-dark);font-weight:600;min-height:16px;"></div>
      </div>
    `).join('')}
  `;
}

/* ── TAB: CONCLUSION ── */
function renderConclusion(act) {
  return `
    <div class="section-banner" style="background:var(--mint);color:var(--mint-dark);">
      <span class="section-banner-icon">✅</span>
      <div>
        <div class="section-banner-title">What We Learned Today</div>
        <div class="section-banner-sub">Quick recap of key takeaways</div>
      </div>
    </div>
    ${act.conclusion.map((c, i) => `
      <div class="recap-card">
        <div class="recap-num">${i + 1}</div>
        <div class="recap-text">${c}</div>
      </div>
    `).join('')}
    <div class="interactive-node-card" style="background:linear-gradient(135deg,var(--mint),#d4f0e4);margin-top:4px;">
      <div class="node-title-area" style="color:var(--mint-dark);">🎉 Lesson Complete!</div>
      <p class="node-body-text" style="color:var(--mint-dark);">Tap the button below to award XP points and mark this lesson as complete.</p>
      <button class="submit-evaluation-btn" style="background:var(--mint-dark);margin-top:10px;" onclick="completeLessonAndAwardXP()">
        🏆 Complete Lesson & Earn +25 XP
      </button>
    </div>
  `;
}

/* ── TAB: ASSESSMENT ── */
function renderAssessment(act) {
  var html = `
    <div class="section-banner" style="background:var(--peach);color:var(--peach-dark);">
      <span class="section-banner-icon">📝</span>
      <div>
        <div class="section-banner-title">Activity Assessment</div>
        <div class="section-banner-sub">${act.assessments.length} assessment tasks</div>
      </div>
    </div>
    <div class="assessment-container">`;

  act.assessments.forEach((a, qi) => {
    if (a.type === 'mcq') {
      html += renderMCQ(a, qi);
    } else if (a.type === 'drag') {
      html += renderDragDrop(a, qi);
    } else if (a.type === 'match') {
      html += renderMatch(a, qi);
    } else if (a.type === 'voice') {
      html += renderVoiceAssessment(a, qi);
    } else if (a.type === 'upload') {
      html += renderUpload(a, qi);
    }
  });

  html += `
    </div>
    <button class="submit-evaluation-btn" onclick="submitAssessment()">
      <i class="ti ti-send"></i> Submit All Answers
    </button>`;
  return html;
}

function renderMCQ(a, qi) {
  return `
    <div class="assessment-card">
      <div class="assessment-type-badge badge-mcq"><i class="ti ti-list-check"></i> MCQ</div>
      <div class="assessment-prompt-text">Q${qi + 1}. ${a.question}</div>
      ${a.options.map((opt, oi) => `
        <div class="option-select-row" id="opt-${qi}-${oi}" onclick="selectMCQ(${qi}, ${oi}, ${a.correct})">
          <div class="option-marker-circle"></div>
          <span>${opt}</span>
        </div>
      `).join('')}
    </div>`;
}

function renderDragDrop(a, qi) {
  var shuffled = [...a.items].sort(() => Math.random() - 0.5);
  return `
    <div class="assessment-card">
      <div class="assessment-type-badge badge-drag"><i class="ti ti-sort-ascending"></i> Arrange Steps</div>
      <div class="assessment-prompt-text">Q${qi + 1}. ${a.question}</div>
      <p style="font-size:11px;color:var(--text-muted);margin-bottom:6px;font-weight:600;">Hold & drag to reorder ↕</p>
      <div class="drag-drop-sequence-list" id="drag-list-${qi}">
        ${shuffled.map((item, di) => `
          <div class="sequence-movable-node" draggable="true"
               data-index="${di}" data-qi="${qi}"
               ontouchstart="touchDragStart(event)"
               ontouchmove="touchDragMove(event)"
               ontouchend="touchDragEnd(event)"
               ondragstart="onDragStart(event)" ondragover="onDragOver(event)" ondrop="onDrop(event)">
            <span>${item}</span>
            <i class="ti ti-grip-vertical"></i>
          </div>
        `).join('')}
      </div>
    </div>`;
}

function renderMatch(a, qi) {
  return `
    <div class="assessment-card">
      <div class="assessment-type-badge badge-match"><i class="ti ti-arrows-left-right"></i> Match the Following</div>
      <div class="assessment-prompt-text">Q${qi + 1}. ${a.question}</div>
      <div class="match-container">
        <div class="match-col">
          <div class="match-col-header">Column A</div>
          ${a.left.map((item, li) => `
            <div class="match-item" id="match-left-${qi}-${li}"
                 onclick="selectMatchItem('left', ${qi}, ${li}, '${item.replace(/'/g, "\\'")}')">
              ${item}
            </div>
          `).join('')}
        </div>
        <div class="match-col">
          <div class="match-col-header">Column B</div>
          ${a.right.map((item, ri) => `
            <div class="match-item" id="match-right-${qi}-${ri}"
                 onclick="selectMatchItem('right', ${qi}, ${ri}, '${item.replace(/'/g, "\\'")}')">
              ${item}
            </div>
          `).join('')}
        </div>
      </div>
    </div>`;
}

function renderVoiceAssessment(a, qi) {
  return `
    <div class="assessment-card">
      <div class="voice-assessment-card">
        <div class="assessment-type-badge badge-voice" style="margin:0 auto 10px;"><i class="ti ti-microphone"></i> Voice Answer</div>
        <div class="voice-assess-prompt">Q${qi + 1}. ${a.question}</div>
        <button class="voice-record-btn" id="voice-assess-btn-${qi}" onclick="recordVoiceAnswer(${qi})">
          <i class="ti ti-microphone"></i>
        </button>
        <p style="font-size:10px;color:#94a3b8;margin-top:10px;font-weight:600;">Tap to Record · Tap again to Stop</p>
        <div id="voice-answer-text-${qi}" style="margin-top:8px;font-size:12px;color:#94a3b8;font-weight:600;min-height:24px;"></div>
      </div>
    </div>`;
}

function renderUpload(a, qi) {
  return `
    <div class="assessment-card">
      <div class="assessment-type-badge badge-upload"><i class="ti ti-photo"></i> Upload Activity</div>
      <div class="assessment-prompt-text">Q${qi + 1}. ${a.question}</div>
      <div class="upload-zone" onclick="triggerImageUpload(${qi})">
        <i class="ti ti-camera-plus"></i>
        <span>Tap to take a photo or upload from gallery</span>
      </div>
      <input type="file" accept="image/*" id="upload-input-${qi}" style="display:none;" onchange="previewUpload(${qi}, this)">
      <div id="upload-preview-${qi}"></div>
    </div>`;
}

/* ── TAB: CLASSROOM TIPS ── */
function renderClassroomTips(act) {
  var ct = act.classroomTips;
  return `
    <div class="section-banner" style="background:var(--lavender);color:var(--lavender-dark);">
      <span class="section-banner-icon">💡</span>
      <div>
        <div class="section-banner-title">Classroom Tips</div>
        <div class="section-banner-sub">For experienced teaching delivery</div>
      </div>
    </div>

    <div class="tips-category">
      <div class="tips-category-title"><i class="ti ti-notebook"></i> Teacher Notes</div>
      ${ct.teacherNotes.map(t => `
        <div class="tip-card"><span class="tip-icon">📌</span><span class="tip-text">${t}</span></div>
      `).join('')}
    </div>

    <div class="tips-category">
      <div class="tips-category-title"><i class="ti ti-alert-triangle"></i> Common Mistakes</div>
      ${ct.commonMistakes.map(m => `
        <div class="tip-card" style="background:#fff7ed;border-color:#fed7aa;"><span class="tip-icon">⚠️</span><span class="tip-text" style="color:#9a3412;">${m}</span></div>
      `).join('')}
    </div>

    <div class="tips-category">
      <div class="tips-category-title"><i class="ti ti-shield-check"></i> Safety Reminders</div>
      ${ct.safetyAlerts || ct.safetyReminders ? (ct.safetyAlerts || ct.safetyReminders).map(s => `
        <div class="safety-alert"><span class="safety-alert-icon">🛡️</span><span class="safety-alert-text">${s}</span></div>
      `).join('') : ''}
    </div>

    <div class="tips-category">
      <div class="tips-category-title"><i class="ti ti-clock"></i> Time Management</div>
      ${ct.timeManagement.map(t => `
        <div class="tip-card" style="background:var(--mint);border-color:var(--mint-mid);"><span class="tip-icon">⏱️</span><span class="tip-text" style="color:var(--mint-dark);">${t}</span></div>
      `).join('')}
    </div>
  `;
}

/* ── TAB: DOWNLOADS ── */
function renderDownloads(act) {
  var typeMap = {
    'pdf': { icon: 'ti-file-text', css: 'pdf-type', label: 'PDF' },
    'ppt': { icon: 'ti-presentation', css: 'ppt-type', label: 'PowerPoint' },
    'doc': { icon: 'ti-file-word', css: 'doc-type', label: 'Word Doc' },
    'xlsx': { icon: 'ti-table', css: 'xlsx-type', label: 'Excel' }
  };
  return `
    <div class="section-banner" style="background:var(--peach);color:var(--peach-dark);">
      <span class="section-banner-icon">📥</span>
      <div>
        <div class="section-banner-title">Lesson Downloads</div>
        <div class="section-banner-sub">${act.downloads.length} resources available</div>
      </div>
    </div>
    <div class="download-deck-grid">
      ${act.downloads.map(d => {
        var t = typeMap[d.type] || typeMap['pdf'];
        return `
          <div class="download-asset-card ${t.css}" onclick="triggerDownloadAsset('${d.name}', '${d.type}')">
            <i class="ti ${t.icon}"></i>
            <div class="download-asset-title">${d.name}</div>
            <div class="download-asset-size">${d.size} · ${t.label}</div>
            <button class="download-btn-sm"><i class="ti ti-download"></i> Download</button>
          </div>`;
      }).join('')}
    </div>
    <div class="interactive-node-card" style="margin-top:12px;">
      <div class="node-title-area">⚡ Quick Generate</div>
      <div style="display:flex;flex-direction:column;gap:8px;">
        <button class="step-interactive-btn" style="background:var(--coral);color:var(--coral-dark);border-color:var(--coral-mid);" onclick="triggerDownload('PDF')">
          <i class="ti ti-file-pdf"></i> Auto-Generate Lesson PDF
        </button>
        <button class="step-interactive-btn" style="background:var(--peach);color:var(--peach-dark);border-color:var(--peach-mid);" onclick="triggerDownload('PPT')">
          <i class="ti ti-presentation"></i> Auto-Generate PPT Slides
        </button>
        <button class="step-interactive-btn" style="background:var(--sky);color:var(--sky-dark);border-color:var(--sky-mid);" onclick="triggerDownload('Worksheet')">
          <i class="ti ti-file-text"></i> Student Worksheet
        </button>
      </div>
    </div>
  `;
}

/* ── INTERACTIVITY WIRING ── */
function wireInteractivity() {
  document.querySelectorAll('.drag-drop-sequence-list').forEach(list => {
    wireDropzone(list);
  });
}

/* ── MCQ HANDLER ── */
function selectMCQ(qi, oi, correct) {
  document.querySelectorAll(`[id^="opt-${qi}-"]`).forEach(el => {
    el.classList.remove('selected-correct', 'selected-wrong');
  });
  var chosen = document.getElementById(`opt-${qi}-${oi}`);
  if (oi === correct) {
    chosen.classList.add('selected-correct');
    showToast('✅ Correct Answer! +5 XP earned');
    awardXP(5);
  } else {
    chosen.classList.add('selected-wrong');
    var correctEl = document.getElementById(`opt-${qi}-${correct}`);
    if (correctEl) setTimeout(() => correctEl.classList.add('selected-correct'), 600);
  }
}

/* ── MATCH HANDLER ── */
function selectMatchItem(side, qi, idx, val) {
  state.matchSelected[side] = { qi, idx, val };
  document.getElementById(`match-${side}-${qi}-${idx}`).classList.add('selected');

  if (state.matchSelected.left && state.matchSelected.right && state.matchSelected.left.qi === state.matchSelected.right.qi) {
    var leftEl = document.getElementById(`match-left-${qi}-${state.matchSelected.left.idx}`);
    var rightEl = document.getElementById(`match-right-${qi}-${state.matchSelected.right.idx}`);
    leftEl.classList.remove('selected'); leftEl.classList.add('matched');
    rightEl.classList.remove('selected'); rightEl.classList.add('matched');
    state.matchSelected = { left: null, right: null };
    showToast('🎯 Match Found! +3 XP');
    awardXP(3);
  }
}

/* ── DRAG DROP ── */
function onDragStart(e) {
  state.dragSrc = e.target;
  e.dataTransfer.effectAllowed = 'move';
  e.target.classList.add('dragging');
}

function onDragOver(e) {
  e.preventDefault();
  e.dataTransfer.dropEffect = 'move';
  document.querySelectorAll('.sequence-movable-node').forEach(n => n.classList.remove('drag-over'));
  if (e.currentTarget !== state.dragSrc) e.currentTarget.classList.add('drag-over');
  return false;
}

function onDrop(e) {
  e.preventDefault();
  var target = e.currentTarget;
  if (target !== state.dragSrc) {
    var list = target.parentNode;
    var nodes = Array.from(list.querySelectorAll('.sequence-movable-node'));
    var srcIdx = nodes.indexOf(state.dragSrc);
    var tgtIdx = nodes.indexOf(target);
    if (srcIdx < tgtIdx) list.insertBefore(state.dragSrc, target.nextSibling);
    else list.insertBefore(state.dragSrc, target);
  }
  document.querySelectorAll('.sequence-movable-node').forEach(n => { n.classList.remove('dragging', 'drag-over'); });
  state.dragSrc = null;
}

/* Touch drag support */
var touchItem = null, touchClone = null, touchList = null;
function touchDragStart(e) {
  touchItem = e.currentTarget;
  touchList = touchItem.parentNode;
  touchClone = touchItem.cloneNode(true);
  touchClone.style.cssText = 'position:fixed;opacity:0.75;pointer-events:none;z-index:9999;width:' + touchItem.offsetWidth + 'px;';
  document.body.appendChild(touchClone);
  touchItem.classList.add('dragging');
}
function touchDragMove(e) {
  if (!touchClone) return;
  e.preventDefault();
  var touch = e.touches[0];
  touchClone.style.left = (touch.clientX - touchItem.offsetWidth / 2) + 'px';
  touchClone.style.top  = (touch.clientY - 30) + 'px';
}
function touchDragEnd(e) {
  if (!touchClone) return;
  var touch = e.changedTouches[0];
  touchClone.remove(); touchClone = null;
  touchItem.classList.remove('dragging');
  var target = document.elementFromPoint(touch.clientX, touch.clientY);
  var node = target ? target.closest('.sequence-movable-node') : null;
  if (node && node !== touchItem && node.parentNode === touchList) {
    var nodes = Array.from(touchList.querySelectorAll('.sequence-movable-node'));
    var si = nodes.indexOf(touchItem), ti = nodes.indexOf(node);
    if (si < ti) touchList.insertBefore(touchItem, node.nextSibling);
    else touchList.insertBefore(touchItem, node);
  }
  touchItem = null;
}

function wireDropzone(list) {
  list.addEventListener('dragover', e => e.preventDefault());
}

/* ── STEP COMPLETE ── */
function markStepComplete(actId, stepIdx) {
  if (!state.completedSteps[actId]) state.completedSteps[actId] = {};
  state.completedSteps[actId][stepIdx] = true;

  var btn = document.getElementById(`complete-btn-${actId}-${stepIdx}`);
  var anchor = document.getElementById(`step-anchor-${stepIdx}`);
  var box = document.getElementById(`step-box-${stepIdx}`);
  if (btn) { btn.classList.add('completed-status'); btn.innerHTML = '<i class="ti ti-check"></i> Done ✓'; }
  if (anchor) anchor.classList.add('completed');
  if (box) box.classList.add('step-completed');
  showToast('⭐ Step Complete! +10 XP earned');
  awardXP(10);
}

/* ── VOICE RECORDING ── */
function setupRecognition(onResult, onEnd) {
  var SpeechRec = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SpeechRec) { alert('Voice input is not supported in this browser.'); return null; }
  var rec = new SpeechRec();
  rec.lang = 'en-IN';
  rec.interimResults = true;
  rec.onresult = onResult;
  rec.onend = onEnd || function() {};
  return rec;
}

function toggleVoiceInput() {
  if (recognition) { stopVoiceInput(); return; }
  document.getElementById('voice-modal').classList.add('active');
  document.getElementById('voice-float-btn').classList.add('recording');
  document.getElementById('voice-result-text').textContent = 'Speak now...';

  recognition = setupRecognition(function(e) {
    var transcript = '';
    for (var i = e.resultIndex; i < e.results.length; i++) {
      transcript += e.results[i][0].transcript;
    }
    document.getElementById('voice-result-text').textContent = transcript;
  }, function() {
    stopVoiceInput();
  });
  if (recognition) recognition.start();
}

function stopVoiceInput() {
  if (recognition) { recognition.stop(); recognition = null; }
  document.getElementById('voice-modal').classList.remove('active');
  document.getElementById('voice-float-btn').classList.remove('recording');
}

function startVoiceForStep(stepIdx) {
  var rec = setupRecognition(function(e) {
    var t = e.results[e.results.length - 1][0].transcript;
    var el = document.getElementById(`reflect-${state.activity.id}-${stepIdx}`);
    if (el) el.value = t;
  });
  if (rec) rec.start();
  showToast('🎤 Listening for Step ' + (stepIdx + 1));
}

function startVoiceForDiscussion(idx) {
  var rec = setupRecognition(function(e) {
    var t = e.results[e.results.length - 1][0].transcript;
    var el = document.getElementById(`discuss-answer-${idx}`);
    if (el) el.textContent = '🎤 "' + t + '"';
  });
  if (rec) rec.start();
  showToast('🎤 Recording Answer...');
}

function startVoiceForChat() {
  var btn = document.getElementById('chat-voice-btn');
  var inp = document.getElementById('ai-custom-input');
  if (!btn || !inp) return;
  btn.classList.add('recording');
  var rec = setupRecognition(function(e) {
    inp.value = e.results[e.results.length - 1][0].transcript;
  }, function() {
    btn.classList.remove('recording');
  });
  if (rec) rec.start();
}

function recordVoiceAnswer(qi) {
  var btn = document.getElementById(`voice-assess-btn-${qi}`);
  var out = document.getElementById(`voice-answer-text-${qi}`);
  if (!btn || !out) return;
  btn.classList.add('recording');
  var rec = setupRecognition(function(e) {
    out.textContent = '🎤 "' + e.results[e.results.length - 1][0].transcript + '"';
  }, function() { btn.classList.remove('recording'); });
  if (rec) rec.start();
}

/* ── SPEECH SYNTHESIS ── */
function speakText(txt) {
  if (!('speechSynthesis' in window)) return;
  window.speechSynthesis.cancel();
  var u = new SpeechSynthesisUtterance(txt);
  u.lang = 'en-IN';
  u.rate = 0.9;
  window.speechSynthesis.speak(u);
}

/* ── TIMERS ── */
function parseDuration(str) {
  var match = str.match(/(\d+)/);
  return match ? parseInt(match[1]) * 60 : 600;
}

function formatTime(secs) {
  var m = Math.floor(secs / 60);
  var s = secs % 60;
  return m + ':' + (s < 10 ? '0' : '') + s;
}

var stepTimerIntervals = {};
function toggleStepTimer(actId, stepIdx, totalSecs) {
  var key = actId + '-' + stepIdx;
  var display = document.getElementById(`timer-${actId}-${stepIdx}`);
  var text = document.getElementById(`timer-text-${actId}-${stepIdx}`);
  if (!display || !text) return;

  if (stepTimerIntervals[key]) {
    clearInterval(stepTimerIntervals[key]);
    delete stepTimerIntervals[key];
    display.classList.remove('running');
    return;
  }

  var remaining = totalSecs;
  display.classList.add('running');
  text.textContent = formatTime(remaining);

  stepTimerIntervals[key] = setInterval(function() {
    remaining--;
    text.textContent = formatTime(remaining);
    if (remaining <= 0) {
      clearInterval(stepTimerIntervals[key]);
      delete stepTimerIntervals[key];
      display.classList.remove('running');
      text.textContent = '✅ Done';
      speakText('Time is up!');
    }
  }, 1000);
}

var groupTimerInterval = null, groupTimerRunning = false;
function toggleGroupTimer(totalSecs) {
  var text = document.getElementById('group-timer-text');
  var icon = document.getElementById('group-timer-icon');
  var display = document.getElementById('group-timer-display');
  if (!text || !display) return;

  if (groupTimerRunning) {
    clearInterval(groupTimerInterval);
    groupTimerRunning = false;
    if (icon) icon.className = 'ti ti-player-play';
    display.classList.remove('running');
    return;
  }

  var remaining = totalSecs;
  groupTimerRunning = true;
  if (icon) icon.className = 'ti ti-player-pause';
  display.classList.add('running');

  groupTimerInterval = setInterval(function() {
    remaining--;
    if (text) text.textContent = formatTime(remaining);
    if (remaining <= 0) {
      clearInterval(groupTimerInterval);
      groupTimerRunning = false;
      if (text) text.textContent = '✅ Done!';
      display.classList.remove('running');
      speakText('Group activity time is up!');
    }
  }, 1000);
}

/* ── ROLE TOGGLE ── */
function toggleRole(idx) {
  var pod = document.getElementById(`role-pod-${idx}`);
  if (pod) pod.classList.toggle('active-pod');
}

/* ── GAMIFICATION ── */
function awardXP(amount) {
  state.xp += amount;
  var el1 = document.getElementById('lesson-xp');
  var el2 = document.getElementById('xp-count');
  if (el1) el1.textContent = state.xp;
  if (el2) el2.textContent = state.xp;

  if (state.xp >= 200 && !state.badges.includes('Kitchen Learner')) {
    state.badges.push('Kitchen Learner');
    setTimeout(() => showToast('🍳 Badge Unlocked! Kitchen Learner'), 500);
  }
  if (state.xp >= 300 && !state.badges.includes('Recipe Reader')) {
    state.badges.push('Recipe Reader');
    setTimeout(() => showToast('📖 Badge Unlocked! Recipe Reader'), 500);
  }
}

function completeLessonAndAwardXP() {
  awardXP(25);
  state.completedSteps[state.activity.id] = state.completedSteps[state.activity.id] || {};
  state.completedSteps[state.activity.id]['lesson'] = true;
  showToast('🏆 Lesson Complete! +25 XP');
  var badge = document.getElementById('lesson-badge');
  if (badge) badge.textContent = '🏆';
}

function showToast(msg) {
  var t = document.createElement('div');
  t.className = 'dash-toast'; t.textContent = msg;
  document.body.appendChild(t);
  setTimeout(() => t.remove(), 2200);
}

function submitAssessment() {
  showToast('🎯 Assessment Submitted! +20 XP');
  awardXP(20);
}

/* ── UPLOAD ── */
function triggerImageUpload(qi) {
  var input = document.getElementById(`upload-input-${qi}`);
  if (input) input.click();
}
function previewUpload(qi, inp) {
  if (!inp.files || !inp.files[0]) return;
  var preview = document.getElementById(`upload-preview-${qi}`);
  if (!preview) return;
  var reader = new FileReader();
  reader.onload = function(e) {
    preview.innerHTML = `<img src="${e.target.result}" style="width:100%;border-radius:10px;margin-top:8px;" alt="Uploaded activity">`;
    showToast('📸 Photo Uploaded! Great work!');
    awardXP(5);
  };
  reader.readAsDataURL(inp.files[0]);
}

/* ── AI CHAT ── */
function openAiChat() { document.getElementById('ai-chat-modal').classList.add('active'); }
function closeAiChat() { document.getElementById('ai-chat-modal').classList.remove('active'); }

async function sendAiMessage(presetMsg) {
  var inp = document.getElementById('ai-custom-input');
  var stream = document.getElementById('ai-chat-stream');
  var sugArea = document.getElementById('ai-suggestions-area');
  if (!inp || !stream) return;

  var msg = presetMsg || inp.value.trim();
  if (!msg) return;

  stream.innerHTML += `<div class="ai-bubble-user">${msg}</div>`;
  inp.value = '';
  if (sugArea) sugArea.style.display = 'none';

  var typingId = 'typing-' + Date.now();
  stream.innerHTML += `<div class="ai-typing" id="${typingId}"><span></span><span></span><span></span></div>`;
  stream.scrollTop = stream.scrollHeight;

  var act = state.activity;
  var context = act ? `You are a helpful bilingual (English + Marathi/Hindi) teaching assistant for an NCERT Kaushal Bodh vocational lesson called "${act.name}". The lesson is about: ${act.objectives.text}. Materials used: ${act.materials.join(', ')}. Answer in a friendly, short, classroom-appropriate way. Mix simple English and Marathi/Hindi phrases naturally.` : `You are a helpful bilingual teaching assistant for NCERT Kaushal Bodh Grade 6-8 vocational education. Answer helpfully and briefly.`;

  try {
    var response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'claude-sonnet-4-6',
        max_tokens: 1000,
        system: context,
        messages: [{ role: 'user', content: msg }]
      })
    });
    var data = await response.json();
    var reply = data.content && data.content[0] ? data.content[0].text : 'Sorry, I could not fetch a response. Please try again!';

    var typingEl = document.getElementById(typingId);
    if (typingEl) typingEl.remove();
    stream.innerHTML += `<div class="ai-bubble-bot">${reply}</div>`;
  } catch (err) {
    var typingEl2 = document.getElementById(typingId);
    if (typingEl2) typingEl2.remove();
    var fallbacks = {
      'salt': 'Salt kiti: Lemon Water maddhe fakt 1 chutki (pinch) meedh ghala. Jast nako! 🧂',
      'measurement': 'Measurement: 1 tablespoon = 3 teaspoons. Level kara, heap nako! 📏',
      'next': 'Pudhi activity: ' + (act ? act.name + ' - Activity Steps tab baghaa!' : 'Please select an activity first.'),
      'safety': 'Safety rules: 1) Haath dhuva 2) Apron ghala 3) Safe tools vapra 4) Spill lathkhan saaf kara 🛡️',
      'default': 'Namaste! Mi NCERT Kaushal Bodh saathi aahe. Tumhi recipe, measurement, ya safety baddal vichar karu shakat. 🙏'
    };
    var key = Object.keys(fallbacks).find(k => msg.toLowerCase().includes(k)) || 'default';
    stream.innerHTML += `<div class="ai-bubble-bot">${fallbacks[key]}</div>`;
  }

  stream.scrollTop = stream.scrollHeight;
}

/* ── VIDEO PLAYER SIMULATION ── */
function playIntroVideo(actId) {
  var bar = document.getElementById(`vid-progress-${actId}`);
  if (!bar) return;
  var pct = 0;
  showToast('▶️ Video Playing...');
  var iv = setInterval(function() {
    pct += 2;
    bar.style.width = pct + '%';
    if (pct >= 100) { clearInterval(iv); showToast('✅ Video Complete! +5 XP'); awardXP(5); }
  }, 200);
}

/* ── INITIALIZATION ── */
var navStack = [];
var _origGo = go;
var _projectsCtx = { topic: 'services', projId: 'p-cooking-fireless' };

go = function(id) {
  var current = document.querySelector('.screen.active');
  if (current && current.id !== id) navStack.push(current.id);
  _origGo(id);
  highlightDesktopNav(id);
};

function goBack() {
  var prev = navStack.pop();
  if (prev) _origGo(prev); else _origGo('s-teacher-home');
  highlightDesktopNav(document.querySelector('.screen.active')?.id);
}

function highlightDesktopNav(id) {
  document.querySelectorAll('.desktop-sidebar .ds-item').forEach(b => {
    b.classList.toggle('active', b.dataset.target === id);
  });
}

function signOut() {
  if (confirm('Sign out of Kaushal Saathi?')) { navStack = []; _origGo('s-splash'); }
}

/* ── MOBILE HAMBURGER DRAWER (referenced by markup, previously undefined) ── */
function openSidebar() {
  var d = document.getElementById('sidebar-drawer');
  var o = document.getElementById('sidebar-overlay');
  if (d) d.classList.add('open');
  if (o) o.classList.add('active');
}
function closeSidebar() {
  var d = document.getElementById('sidebar-drawer');
  var o = document.getElementById('sidebar-overlay');
  if (d) d.classList.remove('open');
  if (o) o.classList.remove('active');
}

var TH_FEATURES = [
  { ico:'📅', bg:'var(--mint)',    name:'Today',           meta:'Aaj ka din - आज की कक्षा', onclick:"openTodayPlan()" },
  { ico:'🧭', bg:'var(--peach)',   name:'Projects',        meta:'Project Navigator',     onclick:"goProjects()" },
  { ico:'📊', bg:'var(--yellow)',  name:'Assessments',     meta:'Competencies & marks',  onclick:"goAssessments()" },
  { ico:'📈', bg:'var(--mint)',    name:'Dashboard',       meta:'Class & personal progress', onclick:"goDashboard()" },
  { ico:'🧩', bg:'var(--sky)',     name:'AI Lesson Plans', meta:'NCF-aligned, in seconds', onclick:"go('s-home')" },
  { ico:'✨', bg:'var(--lavender)', name:'Saathi AI',       meta:'Voice-first companion',  onclick:"openAiChat()" },
  { ico:'📸', bg: 'var(--coral)',   name:'Evidence',        meta:'Photo-first reports',    onclick:"goStub('Evidence','📸','Photo-first reports')" },
  { ico:'🤝', bg: 'var(--sky)',     name:'Community',       meta:'Teacher network',        onclick:"goStub('Community','🤝','Teacher network')" }
];

var BOTTOM_NAV = [
  { key:'home',     ico:'ti-home',      label:'Home',      target:'s-teacher-home', onclick:"go('s-teacher-home')" },
  { key:'today',    ico:'ti-calendar',  label:'Today',     target:'s-lesson',       onclick:"openTodayPlan()" },
  { key:'projects', ico:'ti-folder',    label:'Projects',  target:'s-projects',     onclick:"goProjects()" },
  { key:'stats',    ico:'ti-chart-bar', label:'Stats',     target:'s-dashboard',    onclick:"goDashboard()" },
  { key:'saathi',   ico:'ti-sparkles',  label:'Saathi',    target:'chat',           onclick:"openAiChat()" }
];

function renderTeacherHome() {
  var grid = document.getElementById('th-feature-grid');
  if (!grid) return;
  grid.innerHTML = TH_FEATURES.map(f => `
    <div class="th-feat-card" onclick="${f.onclick}">
      <div class="th-feat-ico" style="background:${f.bg};">${f.ico}</div>
      <div>
        <div class="th-feat-name">${f.name}</div>
        <div class="th-feat-meta">${f.meta}</div>
      </div>
    </div>`).join('');
  renderBottomNavs();
}

function renderBottomNavs() {
  document.querySelectorAll('.th-bottom-nav').forEach(nav => {
    var active = nav.dataset.nav || 'home';
    nav.innerHTML = BOTTOM_NAV.map(n => `
      <button class="th-nav-item ${n.key===active?'active':''}" onclick="${n.onclick}">
        <i class="ti ${n.ico}"></i><span>${n.label}</span>
      </button>`).join('');
  });
}

function openTodayPlan() {
  var topic = 'services';
  var d = DATA[topic];
  if (d && d.projects && d.projects[0] && d.projects[0].activities[0]) {
    igniteInteractiveLesson(topic, d.projects[0].id, d.projects[0].activities[0].id);
  } else { go('s-home'); }
}

function goProjects() { _pdState.mode='list'; renderProjects(); go('s-projects'); }
function goDashboard() { renderDashboard(); go('s-dashboard'); }
function goAdapt() { renderAdapt(); go('s-adapt'); }
function goStub(title, emoji, sub) {
  document.getElementById('stub-title').textContent = title;
  document.getElementById('stub-emoji').textContent = emoji;
  document.getElementById('stub-h').textContent = title;
  document.getElementById('stub-sub').textContent = sub;
  go('s-stub');
}

var KS_PROJECTS = [
  {
    id:'p_soap',
    name:'Make & Sell: Herbal Soap',
    shortName:'Herbal Soap',
    hindi:'हर्बल साबुन बनाना और बेचना',
    category:'Health & Wellness',
    status:'in_progress',
    behind:'2w behind',
    weeks:5, currentWeek:3, periods:12, students:40,
    heroImg:'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=800&q=80',
    outcomes:[
      'Identify herbs and their everyday uses',
      'Follow a safe production process in teams',
      'Set a fair price and pitch to a buyer',
      'Reflect on what worked and what didn\'t'
    ],
    weeks_map:[
      { n:1, title:'Explore: What is in your bathroom?',       state:'done' },
      { n:2, title:'Investigate: Herbs around our village',    state:'done' },
      { n:3, title:'Design: Label, brand, customer',           state:'now' },
      { n:4, title:'Make: Produce herbal soap',                state:'next' },
      { n:5, title:'Sell & Reflect',                           state:'next' }
    ],
    activities:[
      { id:'soap_a1', week:1, title:'Explore: What is in your bathroom?', periods:2 },
      { id:'soap_a2', week:2, title:'Investigate: Herbs around our village', periods:3 },
      { id:'soap_a3', week:3, title:'Design: Label, brand, customer', periods:2 },
      { id:'soap_a4', week:4, title:'Produce: Small batch with safety', periods:3 },
      { id:'soap_a5', week:5, title:'Sell & Reflect: Pitch and review', periods:2 }
    ]
  },
  {
    id:'p_garden',
    name:'Kitchen Garden in 4×4 ft',
    shortName:'Kitchen Garden',
    hindi:'4×4 फुट में रसोई बागवानी',
    category:'Agriculture',
    status:'starts_soon',
    startsOn:'Mon, 10 Mar',
    weeks:4, currentWeek:0, periods:10, students:40,
    heroImg:'https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?w=800&q=80',
    outcomes:['Plan plot','Sow seeds','Track growth','Harvest'],
    weeks_map:[{ n:1, title:'Plan plot', state:'next' }],
    activities:[{ id:'gar_a1', week:1, title:'Plan the plot', periods:2 }]
  },
  {
    id:'p_circuit',
    name:'Simple Electric Circuit',
    shortName:'Electric Circuit',
    hindi:'सरल विद्युत परिपथ',
    category:'Engineering',
    status:'completed',
    studentsEarned:18,
    weeks:3, currentWeek:3, periods:8, students:40,
    heroImg:'https://images.unsplash.com/photo-1581090700227-1e8e0d6e0fa1?w=800&q=80',
    outcomes:['Components','Build circuit','Diagnose','Document'],
    weeks_map:[{ n:1, title:'Safety', state:'done' }],
    activities:[{ id:'cir_a1', week:1, title:'Components & safety', periods:2 }],
    _allDone:true
  },
  {
    id:'p_solar',
    name:'Solar Cooker Prototype',
    shortName:'Solar Cooker',
    hindi:'सौर कुकर प्रोटोटाइप',
    category:'Energy & Environment',
    status:'locked',
    unlockNote:'Unlocks after Soap project',
    weeks:4, currentWeek:0, periods:10, students:40,
    heroImg:'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&q=80',
    outcomes:['Solar basics','Build cooker','Test efficiency'],
    weeks_map:[{ n:1, title:'Solar energy', state:'next' }],
    activities:[{ id:'sol_a1', week:1, title:'Solar energy basics', periods:2 }]
  }
];

var KS_STATUS_META = {
  in_progress: { label: 'IN PROGRESS', dot: '#10b981', cls: 'st-progress' },
  starts_soon: { label: 'STARTS SOON', dot: '#f97316', cls: 'st-soon' },
  completed:   { label: 'COMPLETED',   dot: '#10b981', cls: 'st-done' },
  locked:      { label: 'LOCKED',      dot: '#9ca3af', cls: 'st-locked' }
};

var _pdState = { id: null, mode: 'list', weekFilter: null };

function ksActDone(a) { return !!state.completedSteps[a.id]; }
function ksProgress(p) {
  if (p.status === 'completed' || p._allDone) return 100;
  if (p.status === 'locked' || p.status === 'starts_soon') return 0;
  var total = p.activities.length || 1;
  var done = p.activities.filter(ksActDone).length;
  return Math.round(done / total * 100);
}
function ksDoneCount(p) {
  if (p._allDone || p.status === 'completed') return p.activities.length;
  return p.activities.filter(ksActDone).length;
}
function ksRealStatus(p) {
  if (p.status === 'completed' || p._allDone) return 'completed';
  if (p.status === 'locked') return 'locked';
  if (p.status === 'starts_soon') return 'starts_soon';
  return 'in_progress';
}

function ksTotals() {
  var t = { active:1, completed:1, upcoming:1, locked:1, donePeriods:127, totalPeriods:150 };
  return t;
}

/* ── ANALYTICS ENGINE DISPLAY ── */
/* renderDashboard() — legacy alias; all calls now route through renderDashboardNew() */
function renderDashboard() {
  renderDashboardNew();
}

function initializeDashboardAnimations() {
  document.querySelectorAll('[data-dash-counter]').forEach(function(node) {
    var targetValue = parseInt(node.getAttribute('data-dash-counter')) || 0;
    var suffix = node.getAttribute('data-dash-suffix') || '';
    var currentValue = 0;
    var animationDuration = 800;
    var totalSteps = Math.min(targetValue, 30) || 10;
    var stepInterval = animationDuration / totalSteps;
    var incrementValue = Math.ceil(targetValue / totalSteps);

    var counterInterval = setInterval(function() {
      currentValue += incrementValue;
      if (currentValue >= targetValue) {
        currentValue = targetValue;
        clearInterval(counterInterval);
      }
      node.textContent = currentValue + suffix;
    }, stepInterval);
  });

  document.querySelectorAll('[data-dash-pbar]').forEach(function(barFillNode) {
    var targetedPercent = barFillNode.getAttribute('data-dash-pbar') || "0";
    barFillNode.style.width = targetedPercent + "%";
  });
}

function downloadExcel() {
  showToast('Excel Data Matrix compiled and exported successfully.');
}

function downloadPDF() {
  showToast('PDF Monthly Curriculum report created and saved.');
}

function downloadPPT() {
  showToast('Analytical project presentation deck compiled successfully.');
}

/* ==========================================================================
   END UPGRADED INTERACTIVE DASHBOARD SYSTEM ENGINE
   ========================================================================== */

function renderProjects() {
  var body = document.getElementById('projects-body');
  if (!body) return;
  body.innerHTML = `
    <div class="mp-header">
      <h1 class="mp-title">My Projects</h1>
      <div class="mp-sub">Kaushal Bodh · Class 7 · Term 1</div>
    </div>
    <div class="mp-list">
      ${KS_PROJECTS.map(renderKsProjectCard).join('')}
    </div>
    <div class="mp-suggested">
      <h3 class="mp-section-h">Suggested for your school</h3>
      <div class="mp-suggest-card" onclick="showToast('Suggested notebook covers added')">
        <div class="mp-suggest-icon">🌼</div>
        <div style="flex:1;min-width:0;">
          <div class="mp-suggest-h">Madhubani-style Notebook Covers</div>
          <div class="mp-suggest-meta">Loved by 7-B classrooms in your district</div>
        </div>
        <i class="ti ti-chevron-right" style="color:var(--text-muted);"></i>
      </div>
    </div>
    <div style="height:24px;"></div>
  `;
  renderBottomNavs();
}

function renderKsProjectCard(p) {
  var pct = ksProgress(p);
  var s = ksRealStatus(p);
  var meta = KS_STATUS_META[s];
  var sub = '';
  var behind = '';
  
  if (p.id === 'p_soap') {
    sub = 'Week 3 of 5';
    behind = '<span class="mp-pill-behind">2w behind</span>';
  } else if (p.id === 'p_garden') {
    sub = 'Starts Mon, 10 Mar';
  } else if (p.id === 'p_circuit') {
    sub = 'Completed · 18 students earned competency';
  } else if (p.id === 'p_solar') {
    sub = 'Unlocks after Soap project';
  }

  var click = s === 'locked' ? "showToast('Locked project')" : `openProject('${p.id}')`;
  return `
    <div class="mp-card" onclick="${click}">
      <div class="mp-card-top">
        <span class="mp-status"><span class="mp-dot" style="background:${meta.dot};"></span>${meta.label}</span>
        <span class="mp-cat">· ${p.category}</span>
        ${behind}
      </div>
      <div class="mp-name">${p.name}</div>
      <div class="mp-sub-line">${sub}</div>
      <div class="pbar"><span style="width:${pct}%;"></span></div>
    </div>
  `;
}

function openProject(id) {
  _pdState = { id:id, mode:'detail', weekFilter:3 };
  renderProjectDetail();
  go('s-project-detail');
}

function renderProjectDetail() {
  var body = document.getElementById('pd-body');
  if (!body) return;
  var p = KS_PROJECTS.find(x => x.id === _pdState.id) || KS_PROJECTS[0];
  var pct = ksProgress(p);

  body.innerHTML = `
    <div class="pd-hero" style="background-image:linear-gradient(180deg, rgba(0,0,0,0) 50%, rgba(0,0,0,0.6)), url('${p.heroImg}');">
      <button class="pd-back" onclick="goBack()" aria-label="Back"><i class="ti ti-chevron-left"></i></button>
    </div>
    <div class="pd-body-wrap">
      <div class="pd-eye">KAUSHAL BODH · CLASS 7 · TERM 1</div>
      <h1 class="pd-title">${p.name}</h1>
      <div class="pd-hindi">${p.hindi}</div>

      <div class="pd-stats">
        <div class="pd-stat"><div class="v">5 Weeks</div><div class="l">TIMELINE</div></div>
        <div class="pd-stat"><div class="v">12 Periods</div><div class="l">DURATION</div></div>
        <div class="pd-stat"><div class="v">40 Students</div><div class="l">ENROLLED</div></div>
      </div>

      <div class="pd-outcomes">
        <div class="pd-outcomes-h">Learning Outcomes card: What students will be able to do</div>
        <div class="pd-outcome"><i class="ti ti-check"></i> Identify herbs and their everyday uses</div>
        <div class="pd-outcome"><i class="ti ti-check"></i> Follow a safe production process in teams</div>
        <div class="pd-outcome"><i class="ti ti-check"></i> Set a fair price and pitch to a buyer</div>
        <div class="pd-outcome"><i class="ti ti-check"></i> Reflect on what worked and what didn't</div>
      </div>

      <h3 class="pd-section-h">Week Roadmap</h3>
      <div class="pd-weeks">
        ${p.weeks_map.map(w => {
          var isCurrent = w.n === 3;
          return `
            <div class="pd-week ${w.state} ${isCurrent?'now':''}" style="${isCurrent?'border:2px solid var(--mint-dark); background:var(--mint);':''}">
              <div class="pd-week-ico">${w.n}</div>
              <div class="pd-week-info">
                <div class="pd-week-eye">Week ${w.n} - ${w.state.toUpperCase()}</div>
                <div class="pd-week-title" style="${isCurrent?'font-weight:bold; color:var(--mint-dark);':''}">${w.title}</div>
              </div>
            </div>
          `;
        }).join('')}
      </div>
      <div style="height:24px;"></div>
    </div>
  `;
  renderBottomNavs();
}

/* ── ADAPT LAB PROCESSING MODULE ── */
var ADAPT_CONDITIONS = [
  { key:'nolab',   emoji:'🧪', name:'No lab' },
  { key:'noint',   emoji:'📡', name:'No internet' },
  { key:'big',     emoji:'👥', name:'55+ students' },
  { key:'limited', emoji:'📦', name:'Limited materials' },
  { key:'bhili',   emoji:'🗣️', name:'Bhili-speaking class' },
  { key:'short',   emoji:'⏱️', name:'Only 30 min' }
];
var _adaptSelected = new Set(['big','limited']);

function renderAdapt() {
  var body = document.getElementById('adapt-body');
  if (!body) return;

  body.innerHTML = `
    <div class="adapt-grid">
      <div>
        <div class="adapt-h">Classroom Conditions</div>
        <div class="adapt-sub">Tell Saathi about your class</div>
        <div class="cond-grid">
          ${ADAPT_CONDITIONS.map(c => {
            var isSel = _adaptSelected.has(c.key);
            return `
              <div class="cond-chip ${isSel?'selected':''}" onclick="toggleAdapt('${c.key}')" style="${isSel?'background:var(--mint); border-color:var(--mint-dark);':''}">
                <div class="cond-emoji">${c.emoji}</div>
                <div class="cond-name">${c.name}</div>
                ${isSel?'<div class="cond-sel">✓ Selected</div>':''}
              </div>`;
          }).join('')}
        </div>
      </div>

      <div>
        <div class="adapt-card">
          <div class="adapt-card-h">SAATHI'S ADAPTATION</div>
          <div class="adapt-block">
            <div class="adapt-lbl">INSTEAD OF</div>
            <div class="adapt-strike">10 groups of 4 with chart paper</div>
            <div class="adapt-try-lbl">TRY</div>
            <div class="adapt-try">14 groups of 4 on the floor; 1 slate per group; rotate sketch pens</div>
          </div>
          <div class="adapt-block">
            <div class="adapt-lbl">INSTEAD OF</div>
            <div class="adapt-strike">Each group designs on paper</div>
            <div class="adapt-try-lbl">TRY</div>
            <div class="adapt-try">Quick 5-min design on slate, then 1 final on chart paper per row</div>
          </div>
          <div class="adapt-block">
            <div class="adapt-lbl">INSTEAD OF</div>
            <div class="adapt-strike">Gallery walk in classroom</div>
            <div class="adapt-try-lbl">TRY</div>
            <div class="adapt-try">Pin slates outside; students vote with bindi stickers</div>
          </div>
          <div class="adapt-confirm">✓ All 4 competencies still met. Time: still 40 min.</div>
        </div>

        <div class="adapt-actions">
          <button class="adapt-btn-primary" onclick="useAdaptedPlan()">Use this plan</button>
          <button class="adapt-btn-secondary" onclick="tryAnotherAdapt()">Try another</button>
        </div>
        <div class="adapt-footer-note">Adapted from 84 similar classrooms in Rajasthan that succeeded.</div>
      </div>
    </div>
  `;
}

function toggleAdapt(k) {
  if (_adaptSelected.has(k)) _adaptSelected.delete(k); else _adaptSelected.add(k);
  renderAdapt();
}

function tryAnotherAdapt() {
  _adaptVariant++;
  renderAdapt();
  showToast('Saathi updated alternative configurations');
}

function useAdaptedPlan() {
  showToast('Adaptation rules injected to workspace configuration layer');
  openTodayPlan();
}

/* ── SYSTEM DATA INITIALIZATION ── */
document.addEventListener('DOMContentLoaded', function() {
  renderTeacherHome();
  renderBottomNavs();
});
if (document.readyState !== 'loading') {
  renderTeacherHome();
  renderBottomNavs();
}
/* ══════════════════════════════════════════════════════
   KAUSHAL SAATHI — EXTENSION MODULE v3.0
   Phase 1-6: Class Structure + AI Voice/Chat Everywhere
   ══════════════════════════════════════════════════════ */

/* ── BOOK COVER IMAGES (base64 embedded) ── */
var BOOK_IMAGES = {
  part1: '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MATAAAAiRAJRJAAs4+fp5ZqsdOSdPB0xZfp8zc7Fb41lets6sNYlE1laJxu0p3iEiMtcs72ROsATS9JY0z0lM67xfmr3anndvHYtl6PKa4Ootlrly6aonWQsil6TU2rZJiYslBZAiQAAAAAJIkAAAExMAABQEgAAAAAAAAAgAkCyVRycvXyzXRE2xeHqxjriu1+VOjppTNa8dF9JGcbIkpEs7vMY757uPHU9LGl+fTWYpc6Iys2pxXsvXP0K830OTPU27OPrxrLi9DmHZW0BKx2xzrWYnWSJsZ3pNL0uTErIBKESiaAAAAASAAkgAmAAAAoCUACUCUSAAAAEwECYAAADl5evjOm9L41PN0TqYc/ZnrO/HrkM9banZ5XqeVHRj6Pnandpjtw63870eXpztr5t9zvztjy3jvz9HXnh6Xn9svBtONduuWnHrbh7o3jzPQjQoiefS41gCM9cc61GszBYpek0vS4FgRKBKBIoAAAABMSAAAAJhEokACgQAAFkAAABAAAAEEqow4+zjrpvS+NJLJmJqnN2LPL7lyODoz3nu8zs4079Kaces008vpz9Lj6c65unPomuD0+Om8d8c3Vi48noKw68tMakgkGcxOd3GsIkRlrlNai5CxS9JpelwLACYgAKlAkAAACQAAAkQAAAAFAgEokiRQABAEEVW7OJbqSoiUDPi7eLfPqvS+NSNSZiRE1imueksonWVLwZbZa51Od53jnvqqtZc96IneAVS+ebN62JRNggpfO81ZE6ygGWmedapaxAFL0zpetrAoSIICpgEwJQJAAAmBIAAJRMAAABQAImJIACyiJbM4l0rUs1mJQCRAJgAM+Pt4t8+m9LZ1aYmwSM755t7w1JCKXymp0rZJROoQM75641I3gBnplnesxNyAIM9M9ZpMNYArW1c70S1iJgTlpWaWiUCkwAAAAAEgAAAmJAAEkACahMAABERZSFvFUswTQAAAgAAJAEApxdvD059Vq2xqwskRWK6zUjWJQGVmd3k1gBW+StaXhMNZArWZxu43kmbIpplLGlLyhcgURbO7oawCzFq2BKAAAAAASgKAJgJAAARIAAABQRDOwVMBMCUBMSAAQBMABMCUACnD3cPTn1WppjUhJrOc1bSJuQsFJa656SyTrMJixleuN6SayFgiWl89c6kbzKCTlfPO72idZBBBS9NZqExYVJMTEt4rNkokCUAKACJRIRNAASgSiYAAASESAqRUzsJQoAASQSEFkJNQJgAATAuNZx4e7h1npvS/PczFUi9dFTE6wBGczndpNYkIIrO8XzqUTrJAmls86teJqRYBWqcauN4mClbUzV4sjk6+Lc0z0zs6oqxLxAEE3pK3Uu0EokiYVMWqTCYAChMBRWE0jn6SJkRJYApojGNomspy0zsFAEkTBZIkJigUEAAkAEApxdvDvn0aZzz3KNVkawmJsVnKammGFnp6Y73AAAlISWEildGaFATE0WulLS2GsiUiQCxxdvFbpnfJOoYkSExMEWrJE1GzLRuZgqYkmCggKIXJDWZQ1KZdHLK7eTpzdBAAABEnBW1dXfTnnF3RbHUQswEomBFkoExIgkhaAgJgAU4e7z942vTfn0tMTrEolExlTDSus4Z6ZanodPN04AASiQVryPTpQ600ytPNB1OVXTPN0w5unmOkAEihI4e7iq2O2WnUwjE6K345OuvJvWsZ2kmYSWiC6Tnzb33uDU6hQWFWs2QJiYJkJ4e7hlvtlaXpmGUgECYQmByZa57SrZmdsomulS/LuQllAlCyUSAAQkRIQkQCnD3cPTG+uWvPUzEomKJGK/XNRrOOO+Mvd1cvVgOY6XKs63KrTn6tDinsVy36VVvAlEnH083Tyrl6uY6QABUoknh7eOrY7YadPP0cmZ6ETEZTl1V5vRjEnY5dZNLVtJbj7eXpuNcta6qp1ICEiEggJgW4+vkl0mEvWMoEAASiTly2x2rCqTsslOnk1zvaJjl2SUVFlZJAQCRAAAM+Lt4OmOjXk25dN2Rm2d8dRfPTtyrMSZY7YR3dfF25rn6ME6Ynm21jLzz1PN9ChGl7l3Pmdjj6yZiTj6eXq51z9HPHQBMSIlQkcXbxVbDfLScUZenGV5ODo5ttM+3n6cTOuiSLRJbl6uXeotE7dgsIJMAAISQObp5VvCM67oMAAAJhJz8/TzbZ2r31xaKpOtc5bWyiXXFa5jatma52ou01zb6r8e2LtCcdUAABnwd/B0xOuWvHtaa3TKtq9+E646ayVkzw2yjq7uHuzWG/OnVlrzaa25Va5dFjmnbE1pSxVj2GU9fGOrm6cWObq5MuoEkEomkxNOPs5ajO9KmumeJbp4+o5pNW20RzxMJExJPPvjuxERu98FyAJIBCVkJDm6cJa1tTOu8c7MFSEAJGXJ3efpTv4O3UzrvlGc6ZzVNc9LgLmJiStNaLNZhuLTozGnL153KY59QlAy4e7i682menHvfTPbXPnpenbitFiJgUx3wjp7+DvzXP0YJ01nh02znWsr06jj1VK4+lU5L9gjm6uQnp5erBzdPNL0giQiQTE0w3xrmmmlRNejnnlrautdNJ0qCeeBBM546dGfRh0sZbYL3zE3KYsQkARWsJopoMOjJcc7VmvQHKzCQLEwJQJ870fP0p08/TqTjtlJWIidJvne87TWbClDbK3cvBG2TW9q9tUiYSM9a51QceoLnxdvF1511z049tN8tOvDnz05d53tWSJiSuG2MdHoeb6Waw3wTp4u3l04enr0rj31HLMSdSJAHJtzlurl6snN08ub1AAAlCpy0qcGmc6W35a5zpalm3Rjvc4xTTOeWey2nF6OcVvy9PNbXDp5F9OLRcotzRYTOk4yuhCr0VrS028Kt5eu+O3KpiaIkBBNOHu46x0z10rp1czPOM9E2tc4O1c8u+upEmryY74Zuvbwd1kCxCCsWrx7QMapxdvH2501y14d975aejy48PbxrvaupWJFMdco19PzPTzWG/OnVzdPNt0gI5yJw7C+EbHM6eY225LDp5+jJydfLHUIIkABVL1rhJ1LdfJ12edrlrnb0PM9SzHHpzYy0raFZGuGsavPhvkvoUiUZXymdqApjua56wvP0c0HVrzanHrne606ebp50SAAiYmnJ181c8zXU9Dn6OasK2jG9ZpaztVtrIUBz4b4Sx3+b6SCLICKXrnUIcO+fJ18vblntjtx7aXpf0+XLDbOaXpaVEjPLXKNPU8v1M1z9GCdXB3U05nRlVejmHbjjYo67HN0hPJ18g6eXpynn3xjW1LkSAACJL5umd9S3Zx91eVpnrnWfRmZ1vEMWnO5aJhV6Rbgi9q1JmEwmZx1suWlq1pWeVrtBE4QRaml1PXx9mKEJiUATE05+jGubPXHT1eLu5bOZpGN1m4dnF07xoxonS5i6cs4rHqeRtJ6Lz7WdjjHXXmL0KuHavN083bnlvz9HLpe9bd/NjlvjNxrnpLEBnlpnGnq+R6+bGHRgm/B38emfRx3rrxnUvqAADktA3y0wtjrTNaYb0mCSKATA820To9LzfSrydcNs6IM9FZ5WOm3Pc3nh6bdZgcm2Wt1XTLpmederFNM9FksYzeGtlbGVOuq86/Pbr2+b6eCJQiQAkpnpWuDK1dNorJKwrXSCJkLUg1nnF61kpM2ibxJFdLRjHRJg6WdU5ujn6Zw6Ofo59L6Z37eevN0453XbPRcrUuY565xPr+R62bOO2MmuOuPRvdmXnkg7HFJvjexhMwbW5eorMRlpEsXDo5umgEwJFgHmIaW9TyfRrzNNMc29s9zWmuNxLIm+bNrfTjE68a3r6/Iud7humlLRC9IJrK0kUXsc91inqeV05drz849RybGoiUCYDy59OdPLv6I4naOO3WOWekY20RWSABBMAEoWAvLhvh0nP0c/RnWmmV+nGuWuc2vntLzyGdL5xPq+T6ubfPSkMdI6TK+XSZ1vQLc5tW+o4/SzOTSc43rn1ZJiZebp5eoQEgTAkWebGsaZRoM73uYRuM2is5VLqIsWMq6lyttcw0vKYx1Wjij0ZPNt6A4XdMcV+qTkjrHl53y1QAJ0oPV08r1cwIAkEAmazUihWJZRGythAABKFgLzYb4dc83RzdGdaWpp05Uz1xzpvz7zWKBTLXKHreT6ubpWaxQncjLrg5+rkqduGOsZupLy33iExMJiaiQ5erl6qCAAExNnFj6Nq8y/owcU9g5nTJyW6RjeyBBKJgiVEEoRKJoAABMSjK/k1VauqadBxz2wcbr4x6vl9UnoDICQCCQJjnp58V0QE9fGPU38T0sukZoCJUQOfHbLrnj6ebpltel984x3xzqu2V5rKYsZZ6Zw9TyvQl6s+LGOjTjadM5M3vtw9uZIhABSYkTE6Ac3TzdIEAAASibAAAAClTVCJAAiSwISUAABIsz8z1fKtp0Y+oqQhMDPWJfJk1n2lL4gEgRMCYE+T6XlaINITEQmCenmg9tz9OEABYBz56Z9c8XTzdMWstvDn6ubO66VvLjasmdLUlikhMRFuzk77uaW89Y6cInL2Z4e7FRMQSoBMToBzdPN0gQAAiQRJKJsChwGnFmpKSezjg9pxdmEoExMCYmUAKAEoTFPP8AQ5Tz/Q8/str06yscXbBnaaS+bvj3XPWiZBMIkImASY+X6vHpSvomvJn0eCzMlIWqa+v4vswiWUJhSE1hS9O3Pi6ebqNJi1zbk7eLO4vnoY2rJTDXCW9ZEIsad3H1uvNzjnM1tI9fx++TqGKJqJBMToBy9XL1AQAAAABIs5vM6ebQCZCQX9byfWygRMTAEsgCgJFgmoIy5uX1OS3pnK9uO3J1DLXmjD07EEpEgECACefo5qq2pdW4O/M86ybKVmE19fh74gZQmCiGeudL078eLq5dkX57s+hxb4TpXXLQyRJTn6eaVMWKTEnRrhLeK2sxhbfc8/q6EdAyAkAUmJObo5+gTAkAgkgkACYHlZbY7RMEtNbE9mt5rl7eXaTQSACYBQExNgnSAImMki8PY49N9Oeq6xz9EnUpeJFgAAgAnk6+U2UtdImJXnej5dlLV9GzqsZkJECMRjtnS9PRw470lK6Y3meqsQ3Gmd1zQI5unllm9NDJMG2vL3S9EyyiYxrfC+adaYyAlEgUmJOXq5eogCYEgiYkAAA4uL2vJ0yaKr32vLlj1Wime2B2CZTEgCJ4id+LDT2WG+UzCklQMhzrpz0ppTs5bFcttbaW0L1W870ZgBEogAkhKOKVta1glef6GNnP6kwyEAREjAc+9KXp6OHEytM2tlomyLKlLWYK8vZxw1zutItUel53RHoIZuddrVjTr5LnsiWLAEgFJia5ujDaJAJAAAAFbefWWV6am/R5+0voxMTUzFivPeGeomQiQBxduVebF9NJ9DyuyOmeXqgAIef28mreYnW1NYLJRSJrUb51me0TIAQABGO9Y4Cdb6eHXRce7lyZ9MMhEAxQ59qUvT0cfKtE5i06JpfWltUSuaLDj7eOF6WVW9ASenp5/fmzMC/Hvz3PcMoSlCgCRhpSa0ECQAAAB5PreZVM9cdRrjuvoxPPnXRbzt0nanQiYmREgAAlXn49G1uHR53Qei5umSExGGdq61F8NtatW1S81sUw3wNstKHoM9M8wEwCRCURjrylNK2eiIQX5OvFnXr8novLucNk6q81luOfWlbV78fMGZvaCd/LE3USFEWKc+9IymC6560ikxNT6Xl+lGs1rLSuXoJZCSUSAoE8nV41b35NrPVYbZpS5IQTUJgBZ870PPMsZjUiy9dVuRLHZwynsxW+BEgACSklcOnVyrydO3IUs11qevgzmd7c+7WevN01fO9FtOck0vWs9MdRth15xlOkxjG0mMbjnncYZdnMue3P0TrUous0zZz6eba46pmqImCEs6yraOvPzE3zLdtrW25OrhJmJMrBXLpxjntMra6Y5tJ6is7YKv1s5iQASAESLxcXfz6ZXtWy+mGsY9nB1nfMIlEgCJEeb6RfE32m4nk64Z5iutwvvJbu8f1s6tEoiQEVZlSulywdbkqdriLfj65XGWOrtMUWbdHNmaVvGrS1bWzVJjrlqkdnF25gSAAAObpocXThtNxzdWK2nLrc+PTTK67oiWQAMYmN55ujCY6efHcytvgWraDNepal6GO+G+b6OHR50Z72jfbGOmkxp0ed3Z53EAJiQALeTLoxs55YVp0Z7HH18nZHeISAUARWOG2ernZbA1QZmtqmGlNL12jXkmt46Jrnnaq1vlJqpeAABJFbjjt1KcvVxG8TXWqrRbFozSutRbrx1xmYmBMSAAK2zMU0mtYk3h1Z5MdPL2chrvw6az1OYdLmJetq6nItaW1qWSc7UL1vUrW0ExaDn2x1zfT8z0fPa2mLa6zTSEzzr0zn0ubpzgIAlBZFZ8nfx1yVmLOrfimXunKsdlMLk10sYxurB0DnvqPO3x2nHXm6smkRLJJMubp6b157dPA36Uc0GuOtzGJFtyIkAJiREgMK04VNTe/PFvTnjNa1raN+fbI36cefOe9zQvTPMOmOfE6KazrOWO2mdW5unjzvpqxajpte4c23KX2w6LutotrEKunGKzXnvnVRa1JL0mhvWBOd6xaEnLpneX0uLs42525ujW9K2rJSm/Izfv4tpjcZiYmhKwjlrp8zfIivo2lry9nAd4RaFCSJASRIedtntOWkRzq0pZLYz1t0Vwu79E5G1MdDO/RJneYAgyrXQ5q2dbmg6a5QTSMrmJs2gzJrv241nj08cuWud947ubo4pn0M7V1Zmt1rhrGdaVc2sX6Iw5dKXVmsu+VyzpyGumdG79XBvXQOnKg3iK2ry3yVmsXBdWTLSczeqC8SOW0JfU4u7z5vRbHWuuYtJStuNNNMdpnsGczPLnp1czoXm6McFdcawZ8hPT53q2TMRLZSSys1ZUllReKjhr3Z3OetOib4NtNmY56c9sa0vZvtybS9LnHRPOs1ymy5xtNmd4tvLn1rjptEmIpeJvimnRrDO9KztTUrKSsWqO2sMufLaXtROyTnvNbhHRWuW/Nn3S59FedejmtrLz3vgvVz16DLTLr6cebbm6NyRZSl6c98lL5xeYFprYSgz0nI6ZkckTEvred6HBNa4bVvTavF0sZ9ksznw7uFOqvSK3ryV08unQZbxMMb8ZjTr5rI9fx/TNIx1lwKVN53rKu5cKdPLcXzt06nPfXKzn9Hz+rlrbjXTmt0wxG+V5M8uzK6004Nul6Ct1WDHS0xHTlNoyM+ml+eyY1zmtme3FtlpvlnnehfSmlmcWzKXnWK509Qw5vQ849CYlUGNRjpezkWwze+vFpK6Ofoz0mHMumWtrmcHZvnFHn6569nP1atRqUravLfJnplF5ixF6STMSWRYy6cala6Zy+pxdfHGg13rGmUx1TlpjM47Dnty72U67STCCaxxk9kSvJjrSzPu4tTozQN72tVGrI57iq19c9JU3NMOvjxq2ejly0RKq3FDnOy2Oy559ONV157a6apXa0T05TzTrz3eJJBZUTE3xWq3yjPTM6JqsiES+iTZ5fq+Z6ER5/fx13InGyJKWiqWy358avosufJ38ZXbCi7Tztc+vnz3s5t+rPTPo5uqyqVZ1tXnrky2wl0tWyALRJMwJrS0ZR1by889FJcrZa76zpndOXrjkzjtmJyzvIJilcsiOubFbJOBGlnNM3s26VWrRWWkzyM2Ndc67zTcm9NCnFrPOzFq45WtTQtNNGs8emhjrz7JvGWpnz9WdaW4+zr0WjKs+rPXnsmNcokz2iYuz58TG81mLEzMFazSvUkTh3zsbcvVgbXy157iU7zGHRzxtltlz6NuLtTlw662cVfU4avferokGetenDm6uLtLgwramNc2HRzy6TEpKKGlb7S8+21ZbqJZQi0QXn2w23qb0tbplrWZ5OzHnme+3HEnXyR0mXRBZMzXPBZz3y9CsMtsTvgdJtWrNJpbXK/ROepE10ssMb5tKbscemHRjMTESaznZdYrouPL3UKxC5vDFbac3XvWvLvi6dF6yiJWE1z1tMxeXnDSNM+grntkVz0pXp2y0TlhJ0cvVGN5bRYkbxPJ04Sb1lx7cPfg1N8Ojljr4e3l0m+WzqGuSJb5cfdydWdWFxhS1efTn5erkW19rRXaky2QlkCYkEEorGG/Hfo6tOK69bmJrnSq6747YgCcaG+VYstbTa3ze3i7DmztKdVqVbtlMa5W7ImyKROszpCVatsdOPq5NLzrh11vOrJzuloSWvQbs9Gss9uGte3HpvXk6MNNzHow6c6RLfGJMd0TdFq3vPy4it1PXxd6Rz9fIUJrtnj1Stsby9TBne889k2pE2RlrpHHOW0tS69Oc6ZvDNp1KXz6VwnolOV1RZxza8Q3LjW1bnDk7OKXqtS81NqzEzEiYEoEokc3TyWWtWe3PRNTTn2xjat+WXstSOXTSuVbL1joM+pFszlC8fZw9pya473Oe2WiR2G8zS2dzNouTEs7kY3n5nrebc66401y7MspTLqxrjXTOG+czlTtvTlw6+bV6evj7JeXPTStU1uYmIubMIz26L8lWOrzs7VE1iJ6uLvVz7chrGazr6ubpxvGm3Nc90E1MQggTCTivWus26+D0JeNcZb5aDfm6VCVMErYCBlW1d4x4O/z5eu+d86vNZLIklAlAlEjk7OOy0007c9K2qTnfKL1i0usxfnulaXOqeVb1VwldoiV4e7h7E4Orm67jH0vN9LWYK6kQtZacIzeicIxvonlS9Xl9XLZ6+fLaza3MjHp5bFNcuiK9nF2zfNhrjc29Hh6Vzre8YxuXG95iLqjPQvnX7ps5LdAzy6vMKzNdZlrvDprOdMN4JIJAmBxZaTZXsytEXpRd+W2lmUdeMZ9nF22zBKCIkQkYVtXeMvN9Py17LVtjV5rJdAmYEzAEFuPr5NSdMdenO8FRWYi2s1laZbc9pIkVMWGUbDzOrD0a8rt5fSTy+3k9IwbjC+iVMIFhUVw93Hc9k0tNJiVwiy5w7vP9A5+vk65eSLLJmBqtmXEq1bkREhEqABPH1jm3uIAATKQkQtBFNJOK3QTmdi3lx7uMy6dUk8zpXj9CFSiIsrJKIJBz1mN4z8v1fJXr0x2zqZiYtNZJAmBKBPL081lNs79ca1tnZNbVjpi1TPp5enl0mYmJQJBJWuL0ODuPP9Dg7Dj7eXc1mEsoEoFk1AHL1c1mumO0qYLhaFzHTCaw6+TrTkmJpFsk7/ADt4rdzdUs1siq0lJtCwsKzMEqiyosqS8QAAAVaLJEBEpHL1ZmVNtitpghMExIgAglA54mu8V8r1fKXbo5erNmYlVqzFkSEiJBzdPNZBXrjpy0pZaExtETLl08vTz3M1mWZgTAK2oc/ZydlnF08+5RbI6yJbQE2iABMCeffGxvh0rVZHPF62br1l5+nh7Ky3x1i3L0RW1vO6rM9IyN0TmgsASAAACQTEoAJKyEyqSAAAiQgSAACAAc1Zjpinl+p5cT2cXZLeUykSq1ZiyBMBPPvhZWl6dcdFL1SNMtC18tJcujm6Oe5mJlkEgnPTIy6+Tqrl0pZNeTv849CLparWqsTESgWVknDbCyd+foWJIzx6Oazs5+jnXow7LWeZ2acMdRMsVvY59ZAABIhIIEkkSBIhIARIFiICYkQAAAAAACEiyqzkia7zXy/U8yI6OfWXpmsy3mgvOcy3UGikls7rORFuuLznoVvWbJ0x3zc+jm357vNZlmYmpmsk464pXq5uk56aZHX53o+eehFbS2rMABIiUkSCYEgji7sa3zvMc3XTns78udToy2zZrMBIARIhIIBMkSkgACQiYkAWiKkiJRIgACJBBKBICuNdDiws63Gs6q2rZTzfS82ItWV65rbOpmJgBMCSS1YHLel+vONcN6raJqN8N8s+jm6Oe7TCWZrJMwLc+3PVt+feM8N+ezt4+zmXTfn2BMRMSASAiQkRIAEgACbKgCYkTAIEgJCSgISESISCUQlSACAoipdlU3csJ1OPM78+FZ1ZZKRKyCSUDoialfO9Dz4rMSb6Yb51ZEyygTMWFQlEnNZHTFdstdRatiu+G8Zb8/Rz6TNZiyBILc3Rzl9stSvH3cFehltWOXq4u6ggCQEiJCUSAEwJBMSEXFQSAgmK0rZzQnU4q2ejTzld8cEnZXklOqvOraMxqyg2nAbMRrfKhtGQ1pWCQANsYNcpglEgCJAkgV0VtWKcHfwRQFurk3l1Es2rYRCWUBMSYxanTC9Z1LzWyRvz7S574b8+kzExIJmJHN08tb6U0h5/oedZ6lYmXzvQ8/0rIEoAkiQATEgAkATAsnA1jjys7M+adZvQoEAIFkACYBau9ZQiAJCpiREiEwCBMSIkIAkEwSiSATBQHRW1Ypwd3FGYJvQdk0vnUwASgAUy2x3m0xOszel9SNM75tOjm6ee5JlSCYknk6+OurSlot5vqeXZ6Ql4O7k6LNYJUgAJIlAkABIRQ0y5c9TTNNzEwqUEkAk0rbMiZEJgJEJUBCQAAmLRCYWCSI1oQhUwQCASFAIEomgjorNSnF28ZkIkGu/J1S2EoASkimPRzbzcrrOtoVKaxHTzdPPczEyyCQTxdvDZ26VtK870OCzvmtpeW1s7OuJmWsyoASRMkhMrVZEM+GzbnNZRKoTAmZKhJA0zkhJUwExCWQW9AkEBExJElBC1SiCYQSgkkBMkTUWiYVKCQRKbISP/xAAC/9oADAMBAAIAAwAAACHbRNfboa4Pas/6oAATywQAwAAABAEFf731HAATzzzzzEAAAyJL7oIRgIPv7JnS0J4p/oGAShDGstTzzygAagAEFHHzz3200EEH3iyDEAABTj7777zgAILAKplVO9dBEEBDiDzwkp/TgSyMMEMMMHz1X12kGMNf/wA4AAC++++2++sCKB0MAH73U6rjfR+EssQ4wRce3RhDDFBDDT199/8A/YQR/wD3w0EAz77777776oIJlwyDMRHq5Ic8dBDyhDwBDEQMFcEEMM8MPW3/AP8ASQQV/OMAQENvvvvvvvrAFvsvRYqc/wBKpes2ElTgBTwgBB7FGEEFH0MPFXv32EEE3zzyQwBL/wC++++mIAWuT8gBZe3DqCVxtpAoAU8oAE/fpFRhF9PBRxD1DtBBV8csIQAA+++/+++AAApfAZx+WO7/AAnReKDKAFPKAEEPR1PPPffQwQQ0/wD3+8v/AA8c4EQ22/8A/wD44gDyhTA0MMJaerbEX0DCABTgABTzjSXzz330+8MMdP3/ALDC088owAW+/wD/APbqIJb/AEMjfDHOLvCXF/A0Ikc4AAA8E4J985999vLDDz//AKwwwvPvLCE9/v8A974IJLjMJeT/AOujXOO7/wAtKEtHMAKMIEH/AHzz3332MNMP/wDvLDAA+88gC++v/wDvgggtEALMf+lxwnkiT4/ohNKAIHLDCTfPPPfffbTww/8A/wDjDEc+++CK+++++eKACczx3hvCLXGibhvD2MMQsMAwAwAk188599999PHT/wD/AONb77aIMP77777qIIw778ZlN4euYRkEEUhiCDioAQgADj3TxH30nH33mNP/APrC+3+vDD2+iyyyiABU9D0pj6eWYYgo0nZUKE44oAAAA9ygEjVJZxx9tLDzz/7DW+PrDCyCCCCCAUUaDgRn2CBjwfm5U2GKfKWokc4oRAAAAAAAAAA19NDTzmOCyy2+OCCCCCCAU4rzUT/mH8cX+fKOL89sUs8cwgAIDUAAAAAAAB95DHL+wICW++6CSiCCKCAUrLOCvy6attqOVJEsI0oQ0s08sctgQsA88gAAA8U9DKU88sAy2u6CiCCGA80XBBi/O2qjbiucp59pwkow4E8s8ZhBd5xlBhBFt9DDX/8A/wCsPf8AvCGe6O2+84oQ8v7yQmqrrWevXd9o04I88Y8liAM4sYwMNNJRxNPXr3/2KqX+OOw08W884AMDj7CTljvmqfDX9g89xZs40IUy8w8098wZxzBN9zDHP++yiX+u+088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',
  part2: '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s5s6OOa9E88Ttnks3hbBCoKQWWJrNVrNEEqBUUpCVZSyAFLCVc0WAqyLAolvoPPKWLAoiiKIpI2PnWWKC7xutEKUgKgazQQ1EO3PNNxDTNJaIAarNE1cSXteKOzjV2yNZSyBCFqCyw0zRYFzYpldyRNZAUBSUlLBYigCbzqslIIlVYpACqltM1TLps4PVs8T6G1+Zv6ZPn79yPLr0DlvQij/xAAC/9oADAMBAAIAAwAAACEKxb67w7770gIJbz/znnTz33wLVf3pZP8AzRxHDHPNIsesV7B9999WAXECuo+++8o6+9hAOKAMQxAA8/8APCkHeYlvyUQyAZnvnmfvvrnYcfbw7w/Pv2qFvvvbHuOIQggqNDAQgtvXPCgv6AFvaQaw+TfffffTt/vf/ff9/a9zQqEKPsPfPvvgSQgssMPXulvfPogvSgEEQQBx/ffffffff7PP/ff8/YVTsfRLdFPMPvvgUQghgggKAgqNAggFqgAgZwx//wD/AM888+//AP8AzL/33/cEG4P2D7Hzzz774kAIIAIJbgLLTyoIBGYxLUIJb7rb7777774/75H3310EATDzTQVfz/776oIIIAIJagI7zyoIBx/mLsIJ77777777776oILb0U30lfgBxRR23z/z7777KoAAJQ3zjRWwIC4NdysL7647X77777b7KoJYMFO80NQDxQBX3lHjDJ77L5b6oIIIoLCIID1yyCELb76I336lK/r4oIEJgEc/MFX7xwB38Ikw76AAIII4oKIpKIIYKLSd+84ILLKXl4pXbYb24AEChX34MEnPxSj33/wB9+6rEOCI0qCS+CGa4iAT4l/7ACOOe+++++++eoBRBKwvaBBs900I55+V9eu4gyDDCCKG+OKCCCQCrZEum3rT+++++++iCABBD2R74BRm98Ug995gEe2+ADCCGS2688+uOKAA7IJQ09rHHD/8Af/8A74oEEENEdCkGk/2Bbz33/b7657774IAIILwIILyIIAPW8Bh/Fh//AN99/wD+gwwQyF+WEhf/APESrz3/AO+++++iGCCkyCi2Oe+4mOOOQMtoYtBrb3T/AP8A/ee/elkE0FfHf/JTbz7777b7775IIIIIIIpbb7zz676nJc0ZjdHnU6/OvcH9Ny2v4l33/wDxUW8942ue8+++KCACCCCqyi2c8+c8OQgtkAQDBb93/EA+9DdbSiI2jUJCW009sc++s8++iCCWuGO++++4w+402ObMo52MAjSVNGHJiY1e1kbwCSiCSYw98+++88yiAODDJDB4++++++Mc86+/E/riEwsWmgGfxKAvocoCCGCCEuy9c+KewgAMAAFJN9994w+++w9//wDfPPfsBBUUmDFbiwIHqUOhgggjguFAPUMMCAAEABUVddf/AP31zaqAQtkN/wD/AP612gMaiuqhl9PMgAHsgnikglOA+/PPPMABEAQQff8A/PnX664jyoE123LWyMwDABayhbyIQg77oZJKIIJaoMsgAAADwzAFHH//AP8A/fcAAAAggn0BQgsgMADghHOPvvAIFvrkvihvvlqg7zHDTSwwQQQYV+f/APe7w8TFIMHAIIIIIYYoZbr744IIJ7664JL7774AHEN30kX2kw540tbXfs4GZ0ssc0AIYYIIIZThYr754pQJ7766IIJbzz5yRQgEEQDjT76zAEkctFMN/NO93iJY5777777777rLKIDRzx6oIJrzzzz/ALYCmYCU6+//AP8A7kBRgAEEMN/HFABZLb6DLa777Kb64IJLa4IIKb7z333E0INuSDT1HHHUKEBzyx2k033QwxxrT6ISxR777ALLLgZ544IYpb7z3sO8N9XthKd0zXoYV/Dyzzzn1977b5L7ZYLzz6oZ4JYYJpL774oIJ5bb6739etfu9NII8/8AKt5n7CJe6mf+i2y++Wi++2+2+gBBWAoMaqCCi+++8uxC9VOG+CCDft1pL29rEH3iByAXV5uOCKCCCAhICCNd79tx+iCEE81Jc3PPBJWqyCBRDXDDDX8/LXZhdKQ85mOBf5zDBNFxCC3s895f7DEwmcT2+4ywBp2GCCGMKbHusUU84A4M5AIglc89/j08avNSNCB+G8//AIzmbndaADCHMQ6XzgnvslvsontHI1ygtzbaXNfdfSQY/cOqkTz+hjcf+yXP60SBsvLAQR+Tx/rvjx28+1/vjrhABBQVYPSUcRQR01fPgd/agIPcF5X3zwHA/pEQQS7Y9fPvwzyYXR7+oDCPPLEpSNbSSUcYUdcMBXvPxoghSUc+7fLECzzYTVy0xOoAsi0//wD33xDSgzxzBzxzoA9c8F2wAQH56Eoc8EMd+d/jwBR22UIevRO0IY4kHPLLaKaDDDazCAAAwDa4nX3zywVUj713X/g7KJVz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',
  part3: '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yzy4rxyxJT6zzjzyAAAAABQzzzzzzyAAAABhDzwMSDBXSsU1fwt2JhDBEMtPLyJLwRyxdf77zzgAAAAAABzTzzzxDAAAAABzzzz/AC0k2gmDn4LEvgwDTCjjbv0DPDUgATK++8AAIAAAAAAc8880IAgAAAAA8884T6kgxkUEE1ylQwThBA/eqDD3DDiPfPq++ywwgAAAAAAQ8888sAAAAAc88884riSI9SWc2kNdpJjzsQbHDsn7TH7/AO0yPrjiCCAAAAAAFPPPPIAAAAAPPPOtPP8A44ic8IYCqURs9gdDlWsMhc8cIK89+jb64wwgAAAAABzzzywoAAAARDz6zzytDxD0X6HSHN/MmTwnwxMECOdQBKPN+3z7zzzjIAAAAADzzzyigAARDDzzyQAekxekYKCtO/t+u1WPRfpGy8gbIpK//j777zzz6AAAABTzzzyxAAAAxzzzwAB1HAQ8xAC0kP8AxkYeyQ1Qe+MsKTz+I9p+++8848AAAAQ088+6yQACA088+8sM9BAEvgk8cINCWCG08Mou2+mwRLHIM9hww88s8cAAAAIA888sAEAAAA+++sQI+BAA88Y4NqaGGkE84oQuKCIxBIWGAZn8888888IAAAAA8884MAACCC+888s8Gx0QC4BtLiGQAWdVsBNWGCwpdF7k8r8888ssYAIAAAEc888IAAAAAAw88888U1oAo4JZsCbwhK6JBNAiiCd9BVAId18s0888888oAAA08888ACCCAwc88888o1MUss+ESyWdZ4YQsIQMKSWYAggAN/8APPPDNLCAIAAAPPPPMAAAAAAAOPPPPAPOAFoMn8Vdpfh1TxTx4FzKRwUbes//AHjzzzwwwwQwAATzzzziAAAAAyzzzzwpEARS8Dj4R4WdxbY3SEGy1usH8Mxz/wAs88888888gAAAw8888oEAAAAy84wQnFIQFWyQu0xqHPUeCPL5LRlFbTAIU88888888888gAAAM8884gAAAAAAAgQw5FAUg6YInUwx89oyyMCcJNzSAAAAA08o088888884AAAU8888SEAEAACAggApUIQEc+nKtmG+GDNSa6NOvAAgAAoU88oI88888888AAAU8888K4Q8kAAAAAEp8oMoAgAXuCWL2IEw88wyyoIOIAMA8c888868s88sAAAQ0ywo3NTOfGIMAOgh0g8oAA28AAKvIwK2+eCSspU+MEMM888K4k9tPNz5sAWZyCSQEEAQ+zJacyvV8oAgAAU++g6q4i+YA0KyIse+88888840wwIeJcOQYtYgYgtXwCaGG2ona7n904UAA888c8sMcecce8e088888s8s88dOiSOSqaIiNAIw+epLDMey4wasALRx88+S08+8888888888888888+c8c849MG6EyCQc4MyyKeuKwSuUq0GmK4/L3d88yAE8++8888888888sIswAM4c88kdi00+GEmmC2643PKsCjBzA0kuKynH1U8oiOc88+888+888888888C2ocow7fDD7ICuB+q22mQ8eOCcYcs972OCGR70S+CGK888888888+88++wkKAAAE4UtHHX3W8iZ2C2+GkA6KKeKwiCRRiC68wgP+W8++8088Mcs88M8+W0cAAAEsS5hB8ULBaov7bWmGU8gUYwGU0gHFXMYaL5ACw6e++iCwwgoAQwwK2gQiCCS83uPua2dRvWe3TnfjaksEwmIE0MwFxTvx3NGtQMZ+CCGACCCCCCCCCCCGKGCWK+2CEl+eGJyfUol2q0++IrHQ0kKbDfDb2MZxDpca+S08ssEECCKEACCKCSCIm6iyI4wIMm6PhkqS9H7lvC6owEZb/LIOrwggvp1cjKW4www0CUwggAIACCCWx2GC4meYcyChVF94niO28+r/abbHxT39L9CClIG+ove8+OCCCAAAAAgCCCCS0MYeE864u04ypAKW0J8fLFskoLXdSWfrrRRuF5k1+Y1+++8EEQ8s884UoCiuZMKAKeMA2mI4OpUuKuack0nnZCuWpQXB15iDb99s1182++McwCSyOY8ggAw0gFQakOuc4w8iwfZqM9Gk/sAdRy2G/AzzRYAAn62/4Wv22+GoECOOOS+KC6VZSFDR7N9zdvO9dx/wCKr8FUA7mYWbPilhNyYUwApqvP5cPMMc/vvvvvrvrJwvwtPcT42a/PeVATcutCPKMCTatns38Y72JDUVXg1rpYZcvN4Tjds9THfbgUbDnNGN/y+Hfx1CELNMmNCEBDb4uxJWPgYBocTVURfExQggqH1/PPWZWQpHPBDHHNIIaxjhkGqu7fffYGPEQWREh1Om7NwinVcTwUYQzfSz2BE7PHunC9zvHdfefaPAMBvRqcSKJ/8QJvJs5LQXZhS3Ge20ANZdXVAxTuHkm/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'
};

/* ── PHASE 1 & 2: CLASS-BASED PROJECT STRUCTURE ── */
var CLASS_DATA = {
  6: {
    label: 'Class 6',
    emoji: '6️⃣',
    sectors: [
      {
        id: 'life',
        icon: '🌱',
        name: 'Work with Life Forms',
        part: 'Part 1',
        color: 'mint',
        bg: 'var(--mint)',
        textColor: 'var(--mint-dark)',
        bookImage: 'part1',
        projects: [
          { id: 'c6_kitchen_garden', name: 'Kitchen Garden', periods: 48, progress: 35, status: 'in_progress', desc: 'Grow, observe, document seasonal plants in a school plot.', activities: 8 },
          { id: 'c6_biodiversity', name: 'Biodiversity Documentation', periods: 48, progress: 10, status: 'starts_soon', desc: 'Survey, photograph and document local flora & fauna.', activities: 6 }
        ]
      },
      {
        id: 'machines',
        icon: '⚙️',
        name: 'Work with Machines and Materials',
        part: 'Part 2',
        color: 'peach',
        bg: 'var(--peach)',
        textColor: 'var(--peach-dark)',
        bookImage: 'part2',
        projects: [
          { id: 'c6_maker_skills', name: 'Maker Skills', periods: 48, progress: 60, status: 'in_progress', desc: 'Hands-on tool use, construction and design thinking activities.', activities: 9 },
          { id: 'c6_animation', name: 'Animation', periods: 48, progress: 20, status: 'in_progress', desc: 'Create flipbooks, shadow puppets and digital animations.', activities: 7 }
        ]
      },
      {
        id: 'services',
        icon: '🤝',
        name: 'Work in Human Services',
        part: 'Part 3',
        color: 'lavender',
        bg: 'var(--lavender)',
        textColor: 'var(--lavender-dark)',
        bookImage: 'part3',
        projects: [
          { id: 'c6_school_museum', name: 'School Museum', periods: 48, progress: 45, status: 'in_progress', desc: 'Curate, label and present local heritage objects in a class museum.', activities: 8 },
          { id: 'c6_cooking_fire', name: 'Cooking without Fire', periods: 48, progress: 80, status: 'in_progress', desc: 'Prepare healthy, safe food without heat — recipes, hygiene & nutrition.', activities: 7 }
        ]
      }
    ]
  },
  7: {
    label: 'Class 7',
    emoji: '7️⃣',
    sectors: [
      {
        id: 'life7',
        icon: '🌱',
        name: 'Work with Life Forms',
        part: 'Part 1',
        color: 'mint',
        bg: 'var(--mint)',
        textColor: 'var(--mint-dark)',
        bookImage: 'part1',
        projects: [
          { id: 'c7_herbal_garden', name: 'Herbal Garden', periods: 48, progress: 55, status: 'in_progress', desc: 'Grow medicinal herbs and document their properties.', activities: 7 },
          { id: 'c7_composting', name: 'Composting Project', periods: 48, progress: 0, status: 'starts_soon', desc: 'Convert organic waste into compost, study decomposition.', activities: 5 }
        ]
      },
      {
        id: 'machines7',
        icon: '⚙️',
        name: 'Work with Machines and Materials',
        part: 'Part 2',
        color: 'peach',
        bg: 'var(--peach)',
        textColor: 'var(--peach-dark)',
        bookImage: 'part2',
        projects: [
          { id: 'c7_electrical', name: 'Basic Electrical Work', periods: 48, progress: 72, status: 'in_progress', desc: 'Simple circuits, switches and basic home electrical concepts.', activities: 8 },
          { id: 'c7_weaving', name: 'Weaving & Textile', periods: 48, progress: 30, status: 'in_progress', desc: 'Traditional and modern weaving techniques and pattern design.', activities: 6 }
        ]
      },
      {
        id: 'services7',
        icon: '🤝',
        name: 'Work in Human Services',
        part: 'Part 3',
        color: 'lavender',
        bg: 'var(--lavender)',
        textColor: 'var(--lavender-dark)',
        bookImage: 'part3',
        projects: [
          { id: 'c7_first_aid', name: 'First Aid & Health', periods: 48, progress: 50, status: 'in_progress', desc: 'Basic first aid skills, hygiene and community health awareness.', activities: 7 },
          { id: 'c7_storytelling', name: 'Community Storytelling', periods: 48, progress: 15, status: 'in_progress', desc: 'Collect and retell local stories, heritage documentation.', activities: 5 }
        ]
      }
    ]
  },
  8: {
    label: 'Class 8',
    emoji: '8️⃣',
    sectors: [
      {
        id: 'life8',
        icon: '🌱',
        name: 'Work with Life Forms',
        part: 'Part 1',
        color: 'mint',
        bg: 'var(--mint)',
        textColor: 'var(--mint-dark)',
        bookImage: 'part1',
        projects: [
          { id: 'c8_aquaponics', name: 'Aquaponics System', periods: 48, progress: 20, status: 'in_progress', desc: 'Build an integrated fish and plant growth system.', activities: 8 },
          { id: 'c8_seed_bank', name: 'Seed Bank Project', periods: 48, progress: 5, status: 'starts_soon', desc: 'Collect, preserve, classify and exchange native seeds.', activities: 6 }
        ]
      },
      {
        id: 'machines8',
        icon: '⚙️',
        name: 'Work with Machines and Materials',
        part: 'Part 2',
        color: 'peach',
        bg: 'var(--peach)',
        textColor: 'var(--peach-dark)',
        bookImage: 'part2',
        projects: [
          { id: 'c8_solar', name: 'Solar Energy Systems', periods: 48, progress: 40, status: 'in_progress', desc: 'Solar cooker, solar lamp construction and energy principles.', activities: 9 },
          { id: 'c8_coding', name: 'Coding & Robotics', periods: 48, progress: 0, status: 'starts_soon', desc: 'Block coding, simple robot construction and automation.', activities: 7 }
        ]
      },
      {
        id: 'services8',
        icon: '🤝',
        name: 'Work in Human Services',
        part: 'Part 3',
        color: 'lavender',
        bg: 'var(--lavender)',
        textColor: 'var(--lavender-dark)',
        bookImage: 'part3',
        projects: [
          { id: 'c8_enterprise', name: 'Student Enterprise', periods: 48, progress: 65, status: 'in_progress', desc: 'Plan, produce and sell a product or service in school.', activities: 8 },
          { id: 'c8_survey', name: 'Community Survey', periods: 48, progress: 30, status: 'in_progress', desc: 'Design, conduct and present a community needs survey.', activities: 6 }
        ]
      }
    ]
  }
};

/* ── SELECTED CLASS STATE ── */
var selectedClass = 6;

/* ── SUBJECT-TOPIC MAP (Phase 5) ── */
var SUBJECT_TOPICS = {
  'Mathematics': ['Fractions & Decimals','Measurement','Geometry','Data Handling','Profit & Loss','Ratio & Proportion','Algebra Basics'],
  'Science': ['Materials & Properties','Energy & Motion','Plants & Animals','Environment','Force & Pressure','Heat & Light','Food & Nutrition'],
  'Social Science': ['History & Heritage','Geography','Civic Life','Community Services','Mapping Skills','Trade & Economy'],
  'Hindi': ['Descriptive Writing','Poetry & Rhyme','Reading Comprehension','Letter Writing','Vocabulary'],
  'English': ['Reading Comprehension','Creative Writing','Vocabulary','Speaking & Listening','Grammar'],
  'Art & Craft': ['Design Principles','Color Theory','Pattern Making','Texture & Materials','Folk Art Forms'],
  'Physical Education': ['Body Mechanics','Team Coordination','Safety Awareness','Health & Hygiene'],
  'Environmental Science': ['Biodiversity','Conservation','Waste Management','Water & Soil','Climate Awareness']
};

/* ── PROJECT-SUBJECT RELEVANCE MAP ── */
var PROJECT_RELEVANCE = {
  'Kitchen Garden':          ['Measurement','Plants & Animals','Food & Nutrition','Data Handling','Environment','Geography'],
  'Biodiversity Documentation': ['Plants & Animals','Environment','Mapping Skills','Data Handling','Biodiversity'],
  'Maker Skills':            ['Measurement','Geometry','Materials & Properties','Design Principles','Force & Pressure'],
  'Animation':               ['Design Principles','Color Theory','Pattern Making','Data Handling','Creative Writing'],
  'School Museum':           ['History & Heritage','Civic Life','Community Services','Descriptive Writing','Folk Art Forms'],
  'Cooking without Fire':    ['Food & Nutrition','Fractions & Decimals','Measurement','Health & Hygiene','Materials & Properties'],
  'Herbal Garden':           ['Plants & Animals','Food & Nutrition','Environment','Measurement','Health & Hygiene'],
  'Composting Project':      ['Environment','Biodiversity','Waste Management','Plants & Animals','Conservation'],
  'Basic Electrical Work':   ['Energy & Motion','Force & Pressure','Materials & Properties','Measurement','Heat & Light'],
  'Weaving & Textile':       ['Design Principles','Pattern Making','Color Theory','Materials & Properties','Trade & Economy'],
  'First Aid & Health':      ['Health & Hygiene','Body Mechanics','Safety Awareness','Food & Nutrition'],
  'Community Storytelling':  ['Descriptive Writing','History & Heritage','Reading Comprehension','Community Services'],
  'Aquaponics System':       ['Plants & Animals','Water & Soil','Measurement','Food & Nutrition','Environment'],
  'Seed Bank Project':       ['Biodiversity','Plants & Animals','Conservation','Data Handling','Geography'],
  'Solar Energy Systems':    ['Energy & Motion','Heat & Light','Measurement','Environment','Conservation'],
  'Coding & Robotics':       ['Geometry','Algebra Basics','Data Handling','Design Principles','Energy & Motion'],
  'Student Enterprise':      ['Profit & Loss','Ratio & Proportion','Data Handling','Community Services','Trade & Economy'],
  'Community Survey':        ['Data Handling','Civic Life','Community Services','Descriptive Writing','Mapping Skills']
};

/* ── WARM-UP TEMPLATES (Phase 6) ── */
var WARMUP_STRATEGIES = {
  'Kitchen Garden':         { type:'Observation Activity', prompt:'Show students a tray with 5 different seeds. Ask: "Which of these do you think will grow into a food plant? Touch them. Smell them. What do you notice?"' },
  'Biodiversity Documentation': { type:'Visual Prompt', prompt:'Display a photo of a crowded city street and a forest. Ask: "Spot 5 living things in each image. What would disappear if trees were removed?"' },
  'Maker Skills':           { type:'Mystery Challenge', prompt:'Place a covered box with a simple tool inside (e.g. a clamp). Let students feel it without looking. Ask: "What is this? What could it be used for?"' },
  'Animation':              { type:'Visual Prompt', prompt:'Flip a small flipbook (or 5 drawn cards) in front of students. Ask: "What did you see? How did movement happen from still images?"' },
  'School Museum':          { type:'Story Starter', prompt:'"An old woman donated a clay pot to our school. Nobody knew what it was for. Three students decided to find out..."  Ask students to continue the story in pairs.' },
  'Cooking without Fire':   { type:'Real-Life Situation', prompt:'"The power went out at your home just as your family was about to cook dinner. There are vegetables, spices, and dal in the kitchen. What can you make?"' },
  'Herbal Garden':          { type:'Observation Activity', prompt:'Crush a tulsi leaf and a neem leaf. Pass around. Ask: "Which one smells stronger? Which do you think is used for medicine? Why?"' },
  'Composting Project':     { type:'Puzzle', prompt:'Show a banana peel and a plastic bag. Ask: "Which of these will become soil in 6 months? Which will still be here in 100 years? Why does that matter?"' },
  'Basic Electrical Work':  { type:'Mini Demonstration', prompt:'Touch both terminals of a small LED and a battery together briefly. Ask: "What happened? Where did the energy come from? How did it reach the light?"' },
  'Weaving & Textile':      { type:'Observation Activity', prompt:'Unravel a small piece of cloth thread by thread. Ask: "How many threads make this fabric? What happens if one breaks? What does this tell us about structure?"' },
  'First Aid & Health':     { type:'Real-Life Situation', prompt:'"Your friend falls and cuts their knee at the playground. There is no teacher nearby. You have only a water bottle and your school bag. What do you do? You have 2 minutes."' },
  'Community Storytelling': { type:'Story Starter', prompt:'"My grandmother always said there used to be a pond right where our school stands today..." Give 3 minutes in pairs to complete the story.' },
  'default':                { type:'Think-Pair-Share', prompt:'Ask students to think for 1 minute about one skill they use in daily life that they learned at home. Then share with their partner. Finally share with the class.' }
};

/* ════════════════════════════════════
   CLASS SELECTOR RENDERING
   ════════════════════════════════════ */
function renderClassSelector(containerId, onSelect) {
  var c = document.getElementById(containerId);
  if (!c) return;
  c.innerHTML = `
    <div class="ks-class-selector">
      <span class="ks-class-label">Class:</span>
      ${[6,7,8].map(cl => `
        <button class="ks-class-btn ${selectedClass===cl?'active':''}" onclick="setClass(${cl}); ${onSelect||''}">
          ${cl}
        </button>`).join('')}
    </div>`;
}

function setClass(cls) {
  selectedClass = cls;
  document.querySelectorAll('.ks-class-btn').forEach(b => {
    b.classList.toggle('active', parseInt(b.textContent.trim()) === cls);
  });
}

/* ════════════════════════════════════
   PHASE 1 & 2: NEW PROJECTS RENDERING
   ════════════════════════════════════ */
function renderProjectsNew() {
  var body = document.getElementById('projects-body');
  if (!body) return;
  var cd = CLASS_DATA[selectedClass];

  var totalProjects = cd.sectors.reduce((a,s)=>a+s.projects.length,0);
  var activeProjects = cd.sectors.reduce((a,s)=>a+s.projects.filter(p=>p.status==='in_progress').length,0);

  body.innerHTML = `
    <div style="padding:16px 16px 0;">
      <div id="projects-class-selector"></div>
      <div style="display:flex;gap:8px;margin:10px 0 4px;">
        <input class="ks-search-input" type="text" placeholder="🔍 Search projects..." oninput="filterProjectsSearch(this.value)" id="proj-search-inp">
      </div>
      <div style="display:flex;gap:6px;flex-wrap:wrap;margin-bottom:10px;" id="proj-sector-filters">
        <button class="ks-filter-chip active" onclick="filterBySector('all',this)">All</button>
        ${cd.sectors.map(s=>`<button class="ks-filter-chip" onclick="filterBySector('${s.id}',this)" style="--fc:${s.bg};--ft:${s.textColor};">${s.icon} ${s.name.split(' ').slice(-2).join(' ')}</button>`).join('')}
      </div>
      <div style="display:flex;gap:8px;margin-bottom:12px;">
        <div class="ks-mini-stat" style="background:var(--mint);">
          <div class="ks-mini-stat-n" style="color:var(--mint-dark);">${totalProjects}</div>
          <div class="ks-mini-stat-l">Projects</div>
        </div>
        <div class="ks-mini-stat" style="background:var(--sky);">
          <div class="ks-mini-stat-n" style="color:var(--sky-dark);">${activeProjects}</div>
          <div class="ks-mini-stat-l">Active</div>
        </div>
        <div class="ks-mini-stat" style="background:var(--yellow);">
          <div class="ks-mini-stat-n" style="color:var(--yellow-dark);">${cd.sectors.length}</div>
          <div class="ks-mini-stat-l">Sectors</div>
        </div>
      </div>
    </div>
    <div id="projects-sectors-list" style="padding:0 16px 100px;">
      ${cd.sectors.map(s=>renderSectorBlock(s)).join('')}
    </div>
  `;

  renderClassSelector('projects-class-selector', 'renderProjectsNew()');
  renderBottomNavs();
}

function renderSectorBlock(sector) {
  return `
    <div class="ks-sector-block" data-sector="${sector.id}">
      <div class="ks-sector-header" style="background:${sector.bg};border-color:${sector.textColor}20;" onclick="toggleSector('${sector.id}')">
        <div style="display:flex;align-items:center;gap:8px;">
          <span style="font-size:22px;">${sector.icon}</span>
          <div>
            <div style="font-size:11px;font-weight:700;color:${sector.textColor};opacity:0.7;text-transform:uppercase;letter-spacing:0.05em;">${sector.part}</div>
            <div style="font-size:14px;font-weight:800;color:${sector.textColor};">${sector.name}</div>
          </div>
        </div>
        <div style="display:flex;align-items:center;gap:8px;">
          <button class="ks-book-btn" onclick="event.stopPropagation();openBookViewer('${sector.bookImage}','${sector.name}','${sector.part}')" style="background:${sector.textColor};color:white;">
            📖 Book
          </button>
          <i class="ti ti-chevron-down sector-chevron" style="color:${sector.textColor};font-size:18px;transition:transform 0.3s;"></i>
        </div>
      </div>
      <div class="ks-sector-projects" id="sector-projects-${sector.id}">
        ${sector.projects.map(p=>renderNewProjectCard(p, sector)).join('')}
      </div>
    </div>`;
}

function renderNewProjectCard(project, sector) {
  var statusMeta = {
    'in_progress': { label:'In Progress', dot:'#10b981', bg:'#e8f7ef', tc:'#2d7d52' },
    'starts_soon': { label:'Starts Soon', dot:'#f97316', bg:'#fde8df', tc:'#c0573a' },
    'completed':   { label:'Completed',   dot:'#10b981', bg:'#e8f7ef', tc:'#2d7d52' },
    'locked':      { label:'Locked',      dot:'#9ca3af', bg:'#f3f4f6', tc:'#6b7280' }
  };
  var sm = statusMeta[project.status] || statusMeta.in_progress;

  return `
    <div class="ks-proj-card-new" onclick="openNewProjectDetail('${project.id}','${sector.id}')">
      <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:6px;">
        <div>
          <div style="font-size:15px;font-weight:800;color:var(--text);">${project.name}</div>
          <div style="font-size:11px;color:var(--text-muted);margin-top:2px;">${sector.icon} ${sector.name} · Class ${selectedClass}</div>
        </div>
        <span style="font-size:10px;font-weight:700;padding:3px 8px;border-radius:20px;background:${sm.bg};color:${sm.tc};white-space:nowrap;">
          <span style="display:inline-block;width:6px;height:6px;border-radius:50%;background:${sm.dot};margin-right:3px;vertical-align:middle;"></span>
          ${sm.label}
        </span>
      </div>
      <div style="font-size:12px;color:var(--text-muted);margin-bottom:10px;line-height:1.5;">${project.desc}</div>
      <div style="display:flex;gap:6px;flex-wrap:wrap;margin-bottom:10px;">
        <span class="chip chip-${sector.color}">${project.periods} Periods</span>
        <span class="chip chip-${sector.color}">${project.activities} Activities</span>
        <span class="chip chip-${sector.color}">${project.progress}% Done</span>
      </div>
      <div style="background:rgba(0,0,0,0.06);border-radius:8px;height:6px;overflow:hidden;margin-bottom:10px;">
        <div style="height:100%;width:${project.progress}%;background:${sector.textColor};border-radius:8px;transition:width 0.8s;"></div>
      </div>
      <div style="display:flex;gap:6px;">
        <button class="ks-proj-action-btn" onclick="event.stopPropagation();openNewProjectDetail('${project.id}','${sector.id}')" style="background:${sector.bg};color:${sector.textColor};">
          <i class="ti ti-arrow-right"></i> Open
        </button>
        <button class="ks-proj-action-btn" onclick="event.stopPropagation();openBookViewer('${sector.bookImage}','${sector.name}','${sector.part}')" style="background:var(--yellow);color:var(--yellow-dark);">
          📖 Book Page
        </button>
        <button class="ks-proj-action-btn" onclick="event.stopPropagation();openProjectAiChat('${project.name}','${sector.name}')" style="background:var(--lavender);color:var(--lavender-dark);">
          🤖 AI Help
        </button>
      </div>
    </div>`;
}

function toggleSector(id) {
  var el = document.getElementById('sector-projects-' + id);
  var chevron = el.previousElementSibling.querySelector('.sector-chevron');
  if (!el) return;
  if (el.style.display === 'none') {
    el.style.display = 'block';
    if (chevron) chevron.style.transform = 'rotate(0deg)';
  } else {
    el.style.display = 'none';
    if (chevron) chevron.style.transform = 'rotate(-90deg)';
  }
}

function filterBySector(sectorId, btn) {
  document.querySelectorAll('.ks-filter-chip').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  document.querySelectorAll('.ks-sector-block').forEach(block => {
    if (sectorId === 'all' || block.dataset.sector === sectorId) {
      block.style.display = 'block';
    } else {
      block.style.display = 'none';
    }
  });
}

function filterProjectsSearch(val) {
  var q = val.toLowerCase();
  document.querySelectorAll('.ks-proj-card-new').forEach(card => {
    var text = card.textContent.toLowerCase();
    card.style.display = text.includes(q) ? 'block' : 'none';
  });
}

/* ════════════════════════════════════
   PHASE 3: BOOK PAGE VIEWER MODAL
   ════════════════════════════════════ */
function openBookViewer(imageKey, sectorName, partLabel) {
  var imgSrc = 'data:image/jpeg;base64,' + (BOOK_IMAGES[imageKey] || BOOK_IMAGES.part1);
  var modal = document.getElementById('book-viewer-modal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'book-viewer-modal';
    modal.className = 'book-modal-overlay';
    document.querySelector('.frame').appendChild(modal);
  }
  modal.innerHTML = `
    <div class="book-modal-box">
      <div class="book-modal-header">
        <div>
          <div style="font-size:10px;font-weight:700;opacity:0.7;text-transform:uppercase;">${partLabel}</div>
          <div style="font-size:14px;font-weight:800;">${sectorName}</div>
        </div>
        <div style="display:flex;gap:8px;align-items:center;">
          <button class="book-ctrl-btn" onclick="zoomBookImage(1.2)" title="Zoom In">🔍+</button>
          <button class="book-ctrl-btn" onclick="zoomBookImage(0.8)" title="Zoom Out">🔍−</button>
          <button class="book-ctrl-btn" onclick="fullscreenBook()" title="Fullscreen">⛶</button>
          <button class="book-close-btn" onclick="closeBookViewer()"><i class="ti ti-x"></i></button>
        </div>
      </div>
      <div class="book-modal-img-area" id="book-img-area">
        <img id="book-img" src="${imgSrc}" alt="${sectorName} NCERT Book Page" style="width:100%;border-radius:8px;transition:transform 0.3s;transform-origin:top center;">
      </div>
      <div class="book-modal-footer">
        <span style="font-size:11px;color:var(--text-muted);">NCERT Kaushal Bodh · ${partLabel}</span>
        <button class="ks-proj-action-btn" onclick="openProjectAiChat('${sectorName}','${partLabel}')" style="background:var(--lavender);color:var(--lavender-dark);">
          🤖 Ask AI about this
        </button>
      </div>
    </div>`;
  modal.classList.add('active');
}

var _bookZoom = 1;
function zoomBookImage(factor) {
  _bookZoom *= factor;
  _bookZoom = Math.min(Math.max(_bookZoom, 0.5), 3);
  var img = document.getElementById('book-img');
  if (img) img.style.transform = 'scale(' + _bookZoom + ')';
}

function fullscreenBook() {
  var area = document.getElementById('book-img-area');
  if (!area) return;
  if (area.requestFullscreen) area.requestFullscreen();
  else if (area.webkitRequestFullscreen) area.webkitRequestFullscreen();
}

function closeBookViewer() {
  var modal = document.getElementById('book-viewer-modal');
  if (modal) { modal.classList.remove('active'); _bookZoom = 1; }
}

/* ════════════════════════════════════
   PHASE 4: DYNAMIC DASHBOARD
   ════════════════════════════════════ */
function renderDashboardNew() {
  var body = document.getElementById('dash-body');
  if (!body) return;
  var cd = CLASS_DATA[selectedClass];

  /* ── Compute all dynamic stats from NEW VERSION project data ── */
  var allProjects = cd.sectors.flatMap(function(s) { return s.projects; });
  var activeCount = allProjects.filter(function(p) { return p.status === 'in_progress'; }).length;
  var completedCount = allProjects.filter(function(p) { return p.status === 'completed'; }).length;
  var totalPeriods = allProjects.reduce(function(a, p) { return a + p.periods; }, 0);
  var totalActivities = allProjects.reduce(function(a, p) { return a + p.activities; }, 0);
  var avgProgress = Math.round(allProjects.reduce(function(a, p) { return a + p.progress; }, 0) / allProjects.length);

  /* assessed = 80% of total students (40), pending rest */
  var studentsReached = 40;
  var studentsAssessed = Math.round(studentsReached * 0.8);
  var pendingAssessment = studentsReached - studentsAssessed;
  var competenciesRecorded = allProjects.reduce(function(a, p) { return a + p.activities * 3; }, 0);
  var assessmentCompletion = Math.round((completedCount / allProjects.length) * 100) || avgProgress;

  /* Most active project by highest progress among in-progress */
  var inProgress = allProjects.filter(function(p) { return p.status === 'in_progress'; });
  var mostActive = inProgress.sort(function(a,b) { return b.progress - a.progress; })[0] || allProjects[0];
  var mostActiveSector = cd.sectors.find(function(s) { return s.projects.some(function(sp) { return sp.id === mostActive.id; }); });

  /* Evidence upload rate — computed from avg activities completed */
  var evidenceRate = Math.min(100, Math.round(avgProgress * 1.15));

  /* Period filter label */
  var periodEl = document.getElementById('dash-period');
  var periodLabel = periodEl ? periodEl.options[periodEl.selectedIndex].text : 'This Month';

  body.innerHTML = `
    <div class="dash-container-fluid">

      <!-- Class Selector row -->
      <div style="padding:4px 0 8px;">
        <div id="dash-class-selector"></div>
      </div>

      <!-- KPI Cards — OLD version 2×2 grid design -->
      <div class="dash-kpi-grid-layout">

        <div class="dash-metric-card-box" onclick="renderProjectsNew();go('s-projects')">
          <div class="dash-kpi-header-row">
            <span class="dash-kpi-lbl-text">Total<br>Projects</span>
            <div class="dash-kpi-ico-wrap" style="background:var(--sky);color:var(--sky-dark);">
              <i class="ti ti-folders"></i>
            </div>
          </div>
          <div class="dash-kpi-num-val" data-dash-counter="${allProjects.length}">0</div>
          <div style="font-size:11px;color:var(--text-muted);margin-top:4px;">${activeCount} active · ${completedCount} done</div>
        </div>

        <div class="dash-metric-card-box" onclick="renderProjectsNew();go('s-projects')">
          <div class="dash-kpi-header-row">
            <span class="dash-kpi-lbl-text">Active<br>Projects</span>
            <div class="dash-kpi-ico-wrap" style="background:var(--mint);color:var(--mint-dark);">
              <i class="ti ti-activity"></i>
            </div>
          </div>
          <div class="dash-kpi-num-val" data-dash-counter="${activeCount}">0</div>
          <div style="font-size:11px;color:var(--text-muted);margin-top:4px;">Class ${selectedClass} · ${periodLabel}</div>
        </div>

        <div class="dash-metric-card-box" onclick="showToast('Reviewing period logs for Class ${selectedClass}')">
          <div class="dash-kpi-header-row">
            <span class="dash-kpi-lbl-text">Total<br>Periods</span>
            <div class="dash-kpi-ico-wrap" style="background:var(--yellow);color:var(--yellow-dark);">
              <i class="ti ti-calendar"></i>
            </div>
          </div>
          <div class="dash-kpi-num-val" data-dash-counter="${totalPeriods}">0</div>
          <div style="font-size:11px;color:var(--text-muted);margin-top:4px;">${totalActivities} total activities</div>
        </div>

        <div class="dash-metric-card-box" onclick="showToast('Avg progress across ${allProjects.length} projects')">
          <div class="dash-kpi-header-row">
            <span class="dash-kpi-lbl-text">Avg<br>Progress</span>
            <div class="dash-kpi-ico-wrap" style="background:var(--lavender);color:var(--lavender-dark);">
              <i class="ti ti-chart-bar"></i>
            </div>
          </div>
          <div class="dash-kpi-num-val" data-dash-counter="${avgProgress}" data-dash-suffix="%">0%</div>
          <div style="font-size:11px;color:var(--text-muted);margin-top:4px;">across all sectors</div>
        </div>

      </div>

      <!-- Desktop split layout (left + right columns) -->
      <div class="dash-layout-row-split-desktop">

        <!-- ── LEFT COLUMN ── -->
        <div style="display:flex;flex-direction:column;gap:20px;">

          <!-- Sector Distribution — UNIQUE TO NEW VERSION -->
          <div>
            <h3 class="dash-block-title">Sector Distribution — Class ${selectedClass}</h3>
            ${cd.sectors.map(function(sector) {
              var sProjects = sector.projects;
              var sAvg = Math.round(sProjects.reduce(function(a,p) { return a+p.progress; }, 0) / sProjects.length);
              return `
              <div style="margin-bottom:14px;">
                <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px;">
                  <div style="font-size:13px;font-weight:700;">${sector.icon} ${sector.name}</div>
                  <div style="display:flex;align-items:center;gap:8px;">
                    <span style="font-size:12px;color:var(--text-muted);">${sProjects.length} projects</span>
                    <button class="ks-proj-action-btn" style="background:${sector.bg};color:${sector.textColor};padding:3px 8px;font-size:10px;" onclick="openBookViewer('${sector.bookImage}','${sector.name}','${sector.part}')">📖</button>
                  </div>
                </div>
                <div style="background:rgba(0,0,0,0.06);border-radius:8px;height:8px;overflow:hidden;">
                  <div style="height:100%;width:${sAvg}%;background:${sector.textColor};border-radius:8px;transition:width 1s;"></div>
                </div>
                <div style="font-size:11px;color:var(--text-muted);margin-top:3px;">${sAvg}% average completion</div>
              </div>`;
            }).join('')}
          </div>

          <!-- Project Progress — OLD version style (dash-progress-stack) with NEW data -->
          <div>
            <h3 class="dash-block-title">Project Progress</h3>
            <div class="dash-progress-stack">
              ${allProjects.map(function(p) {
                var sector = cd.sectors.find(function(s) { return s.projects.some(function(sp) { return sp.id === p.id; }); });
                if (!sector) return '';
                var isActive = p.status === 'in_progress';
                var isDone   = p.status === 'completed';
                var label    = isDone ? 'Completed' : isActive ? 'On Track' : 'Coming Soon';
                var cls      = isDone ? 'dash-badge-completed' : isActive ? 'dash-badge-completed' : 'dash-badge-attention';
                var fillCls  = isDone || isActive ? 'dash-fill-completed' : 'dash-fill-attention';
                return `
                <div class="dash-prog-item-node" onclick="openNewProjectDetail('${p.id}','${sector.id}')">
                  <div class="dash-prog-meta-line">
                    <div class="dash-prog-headline">${sector.icon} ${p.name}</div>
                    <span class="dash-status-pill-badge ${cls}">${label}</span>
                  </div>
                  <div class="dash-pbar-track-line">
                    <span class="dash-pbar-fill-node ${fillCls}" data-dash-pbar="${p.progress}"></span>
                  </div>
                  <div class="dash-prog-foot-row">
                    <span>${p.periods} periods · ${p.activities} activities</span>
                    <span style="font-weight:800;color:var(--text);">${p.progress}%</span>
                  </div>
                </div>`;
              }).join('')}
            </div>
          </div>

          <!-- Assessment Status — OLD version grid + NEW computed data -->
          <div>
            <h3 class="dash-block-title">Assessment Status</h3>
            <div class="dash-assess-grid-matrix">
              <div class="dash-assess-tile-pod" onclick="showToast('Opening verified student tracking grid')">
                <div class="dash-assess-lbl">Students Assessed</div>
                <div class="dash-assess-dynamic-val" data-dash-counter="${studentsAssessed}">0</div>
              </div>
              <div class="dash-assess-tile-pod" onclick="showToast('Filtering batch by pending assessment items')">
                <div class="dash-assess-lbl">Pending Assessment</div>
                <div class="dash-assess-dynamic-val" data-dash-counter="${pendingAssessment}">0</div>
              </div>
              <div class="dash-assess-tile-pod" onclick="showToast('Opening competencies registry')">
                <div class="dash-assess-lbl">Competencies Recorded</div>
                <div class="dash-assess-dynamic-val" data-dash-counter="${competenciesRecorded}">0</div>
              </div>
              <div class="dash-assess-tile-pod" onclick="showToast('Opening assessment completion log')">
                <div class="dash-assess-lbl">Assessment Completion</div>
                <div class="dash-assess-dynamic-val" data-dash-counter="${assessmentCompletion}" data-dash-suffix="%">0%</div>
              </div>
            </div>
          </div>

        </div>

        <!-- ── RIGHT COLUMN ── -->
        <div style="display:flex;flex-direction:column;gap:20px;">

          <!-- AI Teaching Assistant — NEW feature retained in OLD column layout -->
          <div>
            <h3 class="dash-block-title">AI Teaching Assistant</h3>
            <div class="dash-ai-panel">
              <div class="dash-ai-icon">🤖</div>
              <div style="flex:1;">
                <div style="font-size:13px;font-weight:700;margin-bottom:4px;">Saathi AI is ready to help</div>
                <div style="font-size:11px;color:var(--text-muted);">Ask about any project, lesson plan or strategy</div>
              </div>
              <button class="ks-proj-action-btn" onclick="openGlobalAiChat()" style="background:var(--lavender);color:var(--lavender-dark);">Chat 💬</button>
            </div>
            <div class="dash-ai-voice-panel" onclick="openGlobalVoice()">
              <i class="ti ti-microphone" style="font-size:20px;color:var(--mint-dark);"></i>
              <div>
                <div style="font-size:13px;font-weight:700;">Voice Assistant</div>
                <div style="font-size:11px;color:var(--text-muted);">Speak your question aloud</div>
              </div>
              <div class="voice-ripple-indicator"><span></span><span></span></div>
            </div>
          </div>

          <!-- Reports & Downloads — OLD version card design -->
          <div>
            <h3 class="dash-block-title">Reports & Downloads</h3>
            <div class="dash-reports-grid-deck">
              <div class="dash-report-action-node excel-type" onclick="downloadExcel()">
                <i class="ti ti-file-spreadsheet"></i>
                <div class="dash-report-action-lbl">Export<br>Excel</div>
              </div>
              <div class="dash-report-action-node pdf-type" onclick="downloadPDF()">
                <i class="ti ti-file-type-pdf"></i>
                <div class="dash-report-action-lbl">Export<br>PDF</div>
              </div>
              <div class="dash-report-action-node ppt-type" onclick="downloadPPT()">
                <i class="ti ti-presentation"></i>
                <div class="dash-report-action-lbl">Export<br>PPT</div>
              </div>
            </div>
          </div>

          <!-- Teaching Insights — OLD version row-bar layout + NEW computed metrics -->
          <div>
            <h3 class="dash-block-title">Teaching Insights</h3>
            <div class="dash-insights-box-stack">
              <div class="dash-insight-row-bar">
                <div class="dash-insight-lbl-pod">
                  <span>🔥</span><span>Most Active Project</span>
                </div>
                <span class="dash-insight-metric-pill" style="background:var(--mint);color:var(--mint-dark);">${mostActive ? mostActive.name : '—'}</span>
              </div>
              <div class="dash-insight-row-bar">
                <div class="dash-insight-lbl-pod">
                  <span>🎯</span><span>Assessment Completion</span>
                </div>
                <span class="dash-insight-metric-pill" style="background:var(--sky);color:var(--sky-dark);">${assessmentCompletion}%</span>
              </div>
              <div class="dash-insight-row-bar">
                <div class="dash-insight-lbl-pod">
                  <span>📸</span><span>Evidence Upload Rate</span>
                </div>
                <span class="dash-insight-metric-pill" style="background:var(--yellow);color:var(--yellow-dark);">${evidenceRate}%</span>
              </div>
              <div class="dash-insight-row-bar">
                <div class="dash-insight-lbl-pod">
                  <span>📚</span><span>Total Activities</span>
                </div>
                <span class="dash-insight-metric-pill" style="background:var(--lavender);color:var(--lavender-dark);">${totalActivities}</span>
              </div>
            </div>
          </div>

          <!-- Recent Activity Timeline — OLD version timeline card -->
          <div>
            <h3 class="dash-block-title">Recent Activity</h3>
            <div class="dash-timeline-card-surface">
              ${(function() {
                var timelineItems = [];
                allProjects.forEach(function(p) {
                  if (p.status === 'in_progress') timelineItems.push({ text: p.name + ' updated', meta: 'Today · Progress ' + p.progress + '%', bullet: '✓', color: '' });
                });
                if (completedCount > 0) timelineItems.push({ text: studentsAssessed + ' assessments completed', meta: 'Yesterday, 4:30 PM · Class ' + selectedClass, bullet: '✓', color: '' });
                timelineItems.push({ text: 'PDF report generated', meta: '14 Jun 2026 · Monthly Evaluation Sheet', bullet: '✓', color: '' });
                timelineItems.push({ text: mostActiveSector ? mostActiveSector.name + ' resource added' : 'Community resource added', meta: '11 Jun 2026 · Kaushal Bodh Template', bullet: '+', color: 'background:var(--lavender);color:var(--lavender-dark);' });
                return timelineItems.slice(0, 4).map(function(item) {
                  return `
                  <div class="dash-timeline-node-row">
                    <div class="dash-timeline-check-bullet" style="${item.color}">${item.bullet}</div>
                    <div class="dash-timeline-body-wrap">
                      <div class="dash-timeline-main-txt">${item.text}</div>
                      <div class="dash-timeline-stamp-meta">${item.meta}</div>
                    </div>
                  </div>`;
                }).join('');
              })()}
            </div>
          </div>

        </div>
      </div>

      <div style="height:16px;"></div>
    </div>`;

  renderClassSelector('dash-class-selector', 'renderDashboardNew()');
  renderBottomNavs();
  setTimeout(initializeDashboardAnimations, 50);
}

/* ════════════════════════════════════
   PROJECT DETAIL (new)
   ════════════════════════════════════ */
function openNewProjectDetail(projId, sectorId) {
  var cd = CLASS_DATA[selectedClass];
  var sector = cd.sectors.find(s => s.id === sectorId);
  if (!sector) return;
  var project = sector.projects.find(p => p.id === projId);
  if (!project) return;

  var body = document.getElementById('pd-body');
  if (!body) return;

  var warmup = WARMUP_STRATEGIES[project.name] || WARMUP_STRATEGIES.default;
  var relevant = PROJECT_RELEVANCE[project.name] || [];

  body.innerHTML = `
    <div style="background:${sector.bg};padding:20px 16px 16px;">
      <button class="pd-back" onclick="goBack()" style="background:rgba(255,255,255,0.8);" aria-label="Back"><i class="ti ti-chevron-left"></i></button>
      <div style="font-size:10px;font-weight:700;color:${sector.textColor};opacity:0.7;text-transform:uppercase;margin-top:8px;">${sector.part} · ${sector.name}</div>
      <div style="font-size:22px;font-weight:900;color:${sector.textColor};margin-top:4px;">${project.name}</div>
      <div style="font-size:12px;color:${sector.textColor};opacity:0.8;margin-top:4px;">Class ${selectedClass} · ${project.periods} Periods · ${project.activities} Activities</div>
      <div style="margin-top:12px;background:rgba(255,255,255,0.5);border-radius:10px;height:8px;overflow:hidden;">
        <div style="height:100%;width:${project.progress}%;background:${sector.textColor};border-radius:10px;"></div>
      </div>
      <div style="font-size:11px;color:${sector.textColor};margin-top:4px;">${project.progress}% Complete</div>
    </div>

    <div style="padding:16px;">
      <p style="font-size:13px;color:var(--text-muted);margin-bottom:16px;">${project.desc}</p>

      <div style="display:flex;gap:8px;margin-bottom:16px;flex-wrap:wrap;">
        <button class="ks-proj-action-btn" onclick="openBookViewer('${sector.bookImage}','${sector.name}','${sector.part}')" style="background:var(--yellow);color:var(--yellow-dark);">
          📖 View Book Page
        </button>
        <button class="ks-proj-action-btn" onclick="openProjectAiChat('${project.name}','${sector.name}')" style="background:var(--lavender);color:var(--lavender-dark);">
          🤖 AI Lesson Help
        </button>
        <button class="ks-proj-action-btn" onclick="startVoiceForProject('${project.name}')" style="background:var(--mint);color:var(--mint-dark);">
          🎙️ Voice Q&A
        </button>
      </div>

      <div class="pd-outcomes">
        <div class="pd-outcomes-h">🎯 Warm-up Strategy: ${warmup.type}</div>
        <div style="font-size:12px;color:var(--text-muted);margin-top:6px;line-height:1.6;">${warmup.prompt}</div>
      </div>

      <div style="margin:16px 0;">
        <div style="font-size:12px;font-weight:800;text-transform:uppercase;letter-spacing:0.05em;margin-bottom:8px;color:var(--text-muted);">✅ Relevant Subject Integrations</div>
        <div style="display:flex;gap:6px;flex-wrap:wrap;">
          ${relevant.map(r=>`<span class="chip chip-${sector.color}">${r}</span>`).join('')}
        </div>
      </div>

      <div class="pd-outcomes" style="margin-top:8px;">
        <div class="pd-outcomes-h">Learning Outcomes</div>
        <div class="pd-outcome"><i class="ti ti-check"></i> Plan and execute a ${project.name.toLowerCase()} project with peers</div>
        <div class="pd-outcome"><i class="ti ti-check"></i> Document observations and findings systematically</div>
        <div class="pd-outcome"><i class="ti ti-check"></i> Connect vocational work to academic subjects</div>
        <div class="pd-outcome"><i class="ti ti-check"></i> Present work and reflect on learning</div>
      </div>

      <div style="margin-top:16px;">
        <div style="font-size:12px;font-weight:800;text-transform:uppercase;letter-spacing:0.05em;margin-bottom:10px;color:var(--text-muted);">Activities Overview</div>
        ${Array.from({length: project.activities}, (_,i) => `
          <div style="display:flex;align-items:center;gap:10px;padding:10px;background:var(--bg2);border-radius:10px;margin-bottom:6px;">
            <div style="width:28px;height:28px;border-radius:50%;background:${sector.bg};color:${sector.textColor};display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:800;flex-shrink:0;">${i+1}</div>
            <div style="font-size:12px;font-weight:700;">Activity ${i+1}</div>
            <div style="margin-left:auto;width:60px;background:rgba(0,0,0,0.08);border-radius:4px;height:4px;overflow:hidden;">
              <div style="height:100%;width:${i<Math.floor(project.activities*project.progress/100)?100:0}%;background:${sector.textColor};"></div>
            </div>
          </div>`).join('')}
      </div>

      <div style="margin-top:16px;padding:14px;background:var(--lavender);border-radius:14px;">
        <div style="font-size:13px;font-weight:800;color:var(--lavender-dark);margin-bottom:8px;">🤖 Saathi AI — Project Assistant</div>
        <div style="font-size:11px;color:var(--lavender-dark);margin-bottom:10px;">Get instant help with lesson planning, warm-ups, assessments or activities for this project.</div>
        <div style="display:flex;gap:8px;">
          <button class="ks-proj-action-btn" onclick="openProjectAiChat('${project.name}','${sector.name}')" style="background:var(--lavender-dark);color:white;flex:1;">💬 Chat with AI</button>
          <button class="ks-proj-action-btn" onclick="startVoiceForProject('${project.name}')" style="background:white;color:var(--lavender-dark);flex:1;">🎙️ Voice Mode</button>
        </div>
      </div>
    </div>
  `;

  go('s-project-detail');
}

/* ════════════════════════════════════
   GLOBAL AI CHAT MODAL (accessible everywhere)
   ════════════════════════════════════ */
function openGlobalAiChat() {
  openProjectAiChat('General Teaching', 'All Sectors');
}

function openProjectAiChat(projectName, sectorName) {
  var modal = document.getElementById('global-ai-chat-modal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'global-ai-chat-modal';
    modal.className = 'global-ai-modal-overlay';
    modal.innerHTML = `
      <div class="global-ai-modal-box">
        <div class="global-ai-header">
          <div class="global-ai-header-left">
            <div class="global-ai-avatar">🤖</div>
            <div>
              <div class="global-ai-title">Saathi AI</div>
              <div class="global-ai-subtitle" id="global-ai-context-label">Teaching Assistant</div>
            </div>
          </div>
          <div style="display:flex;gap:8px;align-items:center;">
            <button class="global-ai-voice-btn" onclick="toggleGlobalVoice()" id="global-voice-btn" title="Voice Input">
              <i class="ti ti-microphone"></i>
            </button>
            <button class="global-ai-close-btn" onclick="closeGlobalAiChat()"><i class="ti ti-x"></i></button>
          </div>
        </div>
        <div class="global-ai-stream" id="global-ai-stream">
          <div class="ai-bubble-bot">Namaste! 🙏 I'm Saathi, your AI teaching companion. I can help with lesson plans, warm-ups, subject integrations, assessments, and more. What do you need today?</div>
        </div>
        <div class="global-ai-quick-chips" id="global-ai-chips">
          <button class="ai-quick-chip" onclick="sendGlobalAiMessage('Suggest a warm-up activity for this project')">🌟 Warm-up idea</button>
          <button class="ai-quick-chip" onclick="sendGlobalAiMessage('How do I integrate Mathematics with this project?')">📐 Math integration</button>
          <button class="ai-quick-chip" onclick="sendGlobalAiMessage('Give me a group activity for 40 students')">👥 Group activity</button>
          <button class="ai-quick-chip" onclick="sendGlobalAiMessage('What assessment questions should I use?')">📋 Assessment help</button>
          <button class="ai-quick-chip" onclick="sendGlobalAiMessage('How can I adapt this for mixed-ability groups?')">🎯 Differentiation</button>
        </div>
        <div class="global-ai-input-row">
          <input type="text" id="global-ai-input" class="global-ai-input" placeholder="Ask Saathi anything..." onkeydown="if(event.key==='Enter')sendGlobalAiMessage()">
          <button class="global-ai-send-btn" onclick="sendGlobalAiMessage()"><i class="ti ti-send"></i></button>
        </div>
      </div>`;
    document.querySelector('.frame').appendChild(modal);
  }

  document.getElementById('global-ai-context-label').textContent = projectName + ' · ' + sectorName;
  window._globalAiContext = { project: projectName, sector: sectorName };
  modal.classList.add('active');
}

function closeGlobalAiChat() {
  var m = document.getElementById('global-ai-chat-modal');
  if (m) m.classList.remove('active');
}

async function sendGlobalAiMessage(presetMsg) {
  var inp = document.getElementById('global-ai-input');
  var stream = document.getElementById('global-ai-stream');
  if (!stream) return;

  var msg = presetMsg || (inp ? inp.value.trim() : '');
  if (!msg) return;
  if (inp) inp.value = '';

  var ctx = window._globalAiContext || {};
  stream.innerHTML += `<div class="ai-bubble-user">${msg}</div>`;

  var typingId = 'gtyping-' + Date.now();
  stream.innerHTML += `<div class="ai-typing" id="${typingId}"><span></span><span></span><span></span></div>`;
  stream.scrollTop = stream.scrollHeight;

  var systemPrompt = `You are Saathi, a bilingual (English + Hindi/Marathi) AI teaching assistant for NCERT Kaushal Bodh vocational education (Classes 6-8, NEP 2020). 
Current context: Project = "${ctx.project || 'General'}", Sector = "${ctx.sector || 'All Sectors'}", Class = ${selectedClass}.
Your role: Help teachers with lesson plans, warm-ups, group activities, subject integrations, assessments, classroom management, and differentiation strategies.
Response style: Friendly, practical, short (under 150 words), mix English with occasional Hindi/Marathi phrases. Use emojis sparingly. Always give actionable advice.`;

  try {
    var res = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'claude-sonnet-4-6',
        max_tokens: 1000,
        system: systemPrompt,
        messages: [{ role: 'user', content: msg }]
      })
    });
    var data = await res.json();
    var reply = data.content && data.content[0] ? data.content[0].text : 'Sorry, please try again!';
    document.getElementById(typingId).remove();
    stream.innerHTML += `<div class="ai-bubble-bot">${reply}</div>`;
  } catch(e) {
    document.getElementById(typingId).remove();
    stream.innerHTML += `<div class="ai-bubble-bot">Namaste! 🙏 Mi offline aahe, pan mala tumala maddat karayla avadel. ${ctx.project ? ctx.project + 'sathi warm-up: students na ek interesting observation task dya.' : 'Kaushal Bodh project sathi AI tips ghenyasathi internet connect kara.'}</div>`;
  }
  stream.scrollTop = stream.scrollHeight;
}

/* ════════════════════════════════════
   GLOBAL VOICE INPUT
   ════════════════════════════════════ */
var _globalVoiceActive = false;
var _globalVoiceRec = null;

function openGlobalVoice() {
  openProjectAiChat('Voice Mode', 'All Sectors');
  setTimeout(() => toggleGlobalVoice(), 300);
}

function startVoiceForProject(projectName) {
  openProjectAiChat(projectName, 'Voice Mode');
  setTimeout(() => toggleGlobalVoice(), 300);
}

function toggleGlobalVoice() {
  var btn = document.getElementById('global-voice-btn');
  if (_globalVoiceActive) {
    if (_globalVoiceRec) { try { _globalVoiceRec.stop(); } catch(e){} }
    _globalVoiceActive = false;
    if (btn) { btn.classList.remove('recording'); btn.innerHTML = '<i class="ti ti-microphone"></i>'; }
    showToast('Voice stopped');
    return;
  }
  var SpeechRec = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SpeechRec) { showToast('Voice not supported on this browser'); return; }
  _globalVoiceRec = new SpeechRec();
  _globalVoiceRec.lang = 'en-IN';
  _globalVoiceRec.continuous = false;
  _globalVoiceRec.interimResults = false;
  _globalVoiceRec.onresult = function(e) {
    var text = e.results[0][0].transcript;
    var inp = document.getElementById('global-ai-input');
    if (inp) inp.value = text;
    sendGlobalAiMessage(text);
    _globalVoiceActive = false;
    if (btn) { btn.classList.remove('recording'); btn.innerHTML = '<i class="ti ti-microphone"></i>'; }
  };
  _globalVoiceRec.onerror = function() {
    _globalVoiceActive = false;
    if (btn) { btn.classList.remove('recording'); btn.innerHTML = '<i class="ti ti-microphone"></i>'; }
    showToast('Could not understand. Try again.');
  };
  _globalVoiceRec.start();
  _globalVoiceActive = true;
  if (btn) { btn.classList.add('recording'); btn.innerHTML = '<i class="ti ti-microphone-off"></i>'; }
  showToast('🎙️ Listening...');
}

/* ════════════════════════════════════
   FLOATING AI BUTTON (everywhere)
   ════════════════════════════════════ */
function injectFloatingAiBtn() {
  if (document.getElementById('floating-ai-fab')) return;
  var fab = document.createElement('div');
  fab.id = 'floating-ai-fab';
  fab.innerHTML = `
    <button class="fab-ai-btn" onclick="toggleFabMenu()" id="fab-main-btn">
      <i class="ti ti-sparkles"></i>
    </button>
    <div class="fab-menu" id="fab-menu">
      <button class="fab-menu-item" onclick="openGlobalAiChat();toggleFabMenu()">
        <span class="fab-menu-ico">💬</span><span>AI Chat</span>
      </button>
      <button class="fab-menu-item" onclick="openGlobalVoice();toggleFabMenu()">
        <span class="fab-menu-ico">🎙️</span><span>Voice</span>
      </button>
      <button class="fab-menu-item" onclick="go('s-home');toggleFabMenu()">
        <span class="fab-menu-ico">📚</span><span>Lesson AI</span>
      </button>
    </div>`;
  document.querySelector('.frame').appendChild(fab);
}

var _fabOpen = false;
function toggleFabMenu() {
  _fabOpen = !_fabOpen;
  var menu = document.getElementById('fab-menu');
  var btn = document.getElementById('fab-main-btn');
  if (menu) menu.classList.toggle('open', _fabOpen);
  if (btn) btn.classList.toggle('fab-open', _fabOpen);
}

/* ════════════════════════════════════
   SUBJECT-TOPIC SELECTOR (Phase 5)
   ════════════════════════════════════ */
function updateTopicDropdown() {
  var subjectEl = document.getElementById('adv-subject');
  if (!subjectEl) return;
  var subject = subjectEl.value;
  var topics = SUBJECT_TOPICS[subject] || [];
  var topicEl = document.getElementById('adv-topic');
  if (!topicEl) {
    // Insert topic dropdown after subject dropdown
    var parentRow = subjectEl.closest('.adv-row');
    if (!parentRow) return;
    var topicField = document.createElement('div');
    topicField.className = 'adv-field';
    topicField.innerHTML = `<label class="adv-label">Topic</label><select class="adv-input adv-select" id="adv-topic" onchange="checkTopicRelevance()"><option value="">Select topic</option></select>`;
    parentRow.appendChild(topicField);
    topicEl = document.getElementById('adv-topic');
  }
  topicEl.innerHTML = '<option value="">Select topic</option>' + topics.map(t=>`<option value="${t}">${t}</option>`).join('');
}

function checkTopicRelevance() {
  var topicEl = document.getElementById('adv-topic');
  if (!topicEl || !topicEl.value) return;
  var topic = topicEl.value;
  var project = state.project ? state.project.name : '';
  var relevant = PROJECT_RELEVANCE[project] || [];
  var warning = document.getElementById('adv-relevance-warning');
  if (!warning) {
    warning = document.createElement('div');
    warning.id = 'adv-relevance-warning';
    warning.style.cssText = 'padding:8px 12px;border-radius:8px;font-size:11px;margin-top:8px;';
    topicEl.parentElement.appendChild(warning);
  }
  if (relevant.includes(topic)) {
    warning.style.background = 'var(--mint)';
    warning.style.color = 'var(--mint-dark)';
    warning.textContent = '✅ Strong connection! This topic naturally fits ' + (project||'the project') + '.';
  } else {
    warning.style.background = 'var(--yellow)';
    warning.style.color = 'var(--yellow-dark)';
    warning.textContent = '⚠️ Weak connection. This integration may feel forced. Consider: ' + relevant.slice(0,3).join(', ') + '.';
  }
}

/* ════════════════════════════════════
   OVERRIDE: goDashboard & goProjects
   ════════════════════════════════════ */
var _origGoDashboard = goDashboard;
goDashboard = function() {
  renderDashboardNew();
  go('s-dashboard');
};

var _origGoProjects = goProjects;
goProjects = function() {
  _pdState.mode = 'list';
  renderProjectsNew();
  go('s-projects');
};

/* ════════════════════════════════════
   INIT EXTENSION
   ════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', function() {
  injectFloatingAiBtn();

  // Patch subject dropdown to add topic
  var subjEl = document.getElementById('adv-subject');
  if (subjEl) subjEl.addEventListener('change', updateTopicDropdown);
});

if (document.readyState !== 'loading') {
  injectFloatingAiBtn();
  var subjEl2 = document.getElementById('adv-subject');
  if (subjEl2) subjEl2.addEventListener('change', updateTopicDropdown);
}
/* ════════════════════════════════════════════════════════════════
   ASSESSMENT MODULE (NEW — additive only)
   Self-contained engine: data banks, state, navigation, rendering,
   student management, scoring, report generation & exports.
   Namespaced globals: ASM (state), PROJECT_BANK, ASM_TYPES.
   Nothing in this section modifies any pre-existing function/var.
   ════════════════════════════════════════════════════════════════ */

/* ── Grade labels (mirrors CLASS_DATA's "Class N" convention) ── */
var ASM_GRADES = [6, 7, 8];

/* ── Content bank: one entry per project. Plant Nursery is drawn
   from the teacher's own uploaded reference (Plant_Nursery_Assessment.xlsx);
   the other five follow the same NCERT Kaushal Bodh activity structure
   with originally-authored, age-appropriate content. ── */
var PROJECT_BANK = {

  plant_nursery: {
    id: 'plant_nursery', name: 'Plant Nursery', icon: '🌱', theme: 'mint',
    tagline: 'Grow & raise saplings in a school nursery bed',
    tools: ['Trowel', 'Watering Can', 'Shade Net', 'Seed Tray', 'Spade', 'Measuring Tape'],
    materials: ['Seeds', 'Potting Soil', 'Cocopeat', 'Compost / Manure', 'Polythene Bags', 'Shade Net'],
    safety: ['Wash hands after handling soil or fertiliser', 'Handle tools carefully, point away from the body', 'Do not taste seeds, soil or fertiliser', 'Wear gloves when handling compost'],
    activities: [
      { t: 'Field Visit to a Local Nursery', d: 'Observe plants, tools and layout at a real plant nursery.' },
      { t: 'Planning & Site Setup', d: 'Select a sunny site, mark boundaries, fix shade-net and fencing.' },
      { t: 'Germination Trial', d: 'Sow test seeds and record which ones sprout and how long they take.' },
      { t: 'Plant Propagation', d: 'Practice seed-sowing and stem-cutting methods in trays.' },
      { t: 'Daily Observation & Record Keeping', d: 'Track growth, watering and changes in a nursery diary.' },
      { t: 'Cost & Application Study', d: 'List materials used, estimate cost, and discuss usefulness to farmers.' }
    ],
    fillBlanks: [
      { q: 'Plants need ______, ______ and ______ to grow.', a: 'sunlight, water, air' },
      { q: 'A plant nursery is a place where plants are ______.', a: 'grown / raised for sale or transplanting' },
      { q: 'Seeds need ______ to germinate.', a: 'moisture / water' },
      { q: '______ is used to provide shade to young plants.', a: 'Shade net' },
      { q: 'Not all seeds grow; this is called the ______ rate.', a: 'germination' },
      { q: '______ is added to soil to improve its fertility.', a: 'Compost / manure' },
      { q: 'A ______ is used to dig small holes for transplanting saplings.', a: 'trowel' },
      { q: 'Young seedlings should be watered in the ______ or evening, not at midday.', a: 'early morning' }
    ],
    mcq: [
      { q: "Which tool is used to dig small holes for transplanting?", opts: ['Trowel', 'Hammer', 'Shade net', 'Bucket'], a: 0 },
      { q: 'The best time to water young seedlings is:', opts: ['Midday in full sun', 'Early morning or evening', 'Never', 'Only once a month'], a: 1 },
      { q: 'Which of these improves soil fertility?', opts: ['Plastic sheet', 'Compost', 'Stones', 'Sand only'], a: 1 },
      { q: 'What protects young plants from harsh sunlight?', opts: ['Fertiliser', 'Shade net', 'Pesticide', 'Polythene bag'], a: 1 },
      { q: 'Germination means:', opts: ['A plant dying', 'A seed sprouting into a seedling', 'Watering a plant', 'Selling plants'], a: 1 },
      { q: 'Which method is a way of plant propagation?', opts: ['Stem cutting', 'Painting leaves', 'Cutting roots off', 'Removing all soil'], a: 0 }
    ],
    match: [
      { l: 'Trowel', r: 'Digging small holes' }, { l: 'Shade Net', r: 'Protecting from harsh sun' },
      { l: 'Watering Can', r: 'Watering plants' }, { l: 'Compost', r: 'Improving soil fertility' },
      { l: 'Seed Tray', r: 'Germinating seeds' }, { l: 'Measuring Tape', r: 'Marking nursery boundaries' }
    ],
    shortAnswer: [
      { q: 'What is a plant nursery? (2)' }, { q: 'Name any two tools used in a nursery. (2)' },
      { q: 'Why is watering important for plants? (2)' }, { q: 'What is germination? (2)' },
      { q: 'Name one method of plant propagation. (2)' },
      { q: 'Why do plants grow better near water sources? Explain in 2–3 lines. (3)' }
    ],
    oralLevels: [
      { l: 1, t: 'Basics (Recall)', q: ['What do plants need to grow?', 'What is a plant nursery?', 'Name any one tool used in a nursery.', 'What is germination?', 'What is soil used for?'] },
      { l: 2, t: 'Understanding', q: ['Why do plants need sunlight?', 'Why is water important for plants?', 'Why do plants grow more near water sources?', 'What is the role of temperature in plant growth?', 'Why do we use compost?'] },
      { l: 3, t: 'Activity-based (Field Visit)', q: ['Which plants did you see in the nursery?', 'What tools were used there?', 'How were plants watered?', 'How did they protect plants from heat?', 'How did they prevent pests?'] },
      { l: 4, t: 'Planning & Setup', q: ['How did you select the place for the nursery?', 'Why should the place have sunlight?', 'What is the use of a shade net?', 'Why is fencing needed?'] },
      { l: 5, t: 'Germination', q: ['Why do all seeds not germinate?', 'How many days did your seeds take to grow?', 'What conditions are needed for germination?', 'Why is moisture important?'] },
      { l: 6, t: 'Plant Propagation', q: ['Which method did your group use?', 'What is the difference between seed sowing and stem cutting?', 'Why do we cover seeds with soil?', 'Why should we not overwater plants?'] },
      { l: 7, t: 'Observation', q: ['What changes did you observe in the plants?', 'When did your plant germinate?', 'Why is observation important in a nursery?'] },
      { l: 8, t: 'Cost & Application', q: ['What materials did you use, and which was costliest?', 'Why should we calculate the cost of a nursery?', 'How can a nursery help farmers?'] },
      { l: 9, t: 'Higher-Order Thinking', q: ['What will happen if plants do not get sunlight?', 'What happens if plants get too much water?', 'How can you grow plants at home with limited space?'] },
      { l: 10, t: 'Reflection', q: ['What did you enjoy the most about this project?', 'What challenges did you face?', 'What will you do differently next time?'] },
      { l: 11, t: 'Career Linkage', q: ['What does a gardener do?', 'Who is a farmer, and what is their work?', 'Would you like to do nursery-related work? Why?'] }
    ]
  },

  kitchen_garden: {
    id: 'kitchen_garden', name: 'School Kitchen Garden', icon: '🥬', theme: 'mint',
    tagline: 'Grow seasonal vegetables in a school garden plot',
    tools: ['Khurpi (Hand Hoe)', 'Spade', 'Watering Can', 'Measuring Tape', 'Garden Gloves'],
    materials: ['Vegetable Seeds / Seedlings', 'Compost', 'Manure', 'Mulch', 'Garden Twine'],
    safety: ['Wear gloves while digging or weeding', 'Wash hands & vegetables before eating', 'Keep sharp tools away from younger children', 'Watch for insects or stinging plants'],
    activities: [
      { t: 'Site Selection & Bed Preparation', d: 'Choose a sunny plot and prepare raised garden beds.' },
      { t: 'Soil Testing & Improvement', d: 'Check soil quality and add compost/manure to enrich it.' },
      { t: 'Sowing Seeds & Seedlings', d: 'Sow vegetable seeds or transplant seedlings into rows.' },
      { t: 'Watering & Composting Schedule', d: 'Maintain a watering routine and build a compost pit.' },
      { t: 'Pest & Weed Management', d: 'Identify weeds/pests and manage them without harsh chemicals.' },
      { t: 'Harvest & Healthy-Eating Reflection', d: 'Harvest vegetables and discuss their nutritional value.' }
    ],
    fillBlanks: [
      { q: 'A kitchen garden grows ______ that can be eaten fresh at home or school.', a: 'vegetables' },
      { q: '______ improves soil fertility naturally without chemicals.', a: 'Compost' },
      { q: 'Vegetable seeds need regular ______ to germinate well.', a: 'watering' },
      { q: '______ is spread on soil to keep weeds away and retain moisture.', a: 'Mulch' },
      { q: 'We rotate crops every season to avoid ______ depletion in the soil.', a: 'nutrient' },
      { q: 'A healthy kitchen garden gives us fresh ______ almost every day.', a: 'vegetables' },
      { q: 'A ______ is a small hand tool used to loosen soil and remove weeds.', a: 'khurpi' },
      { q: 'Leafy vegetables generally need ______ sunlight each day to grow well.', a: 'several hours of' }
    ],
    mcq: [
      { q: 'Mulching mainly helps to:', opts: ['Add chemicals', 'Retain soil moisture & block weeds', 'Kill all plants', 'Increase pests'], a: 1 },
      { q: 'Compost is made mainly from:', opts: ['Plastic waste', 'Kitchen & garden waste', 'Stones', 'Metal scraps'], a: 1 },
      { q: 'Which is a kitchen-garden tool?', opts: ['Khurpi', 'Stethoscope', 'Calculator', 'Paintbrush'], a: 0 },
      { q: 'Crop rotation mainly helps prevent:', opts: ['Excess sunlight', 'Soil nutrient depletion', 'Rainfall', 'Overwatering'], a: 1 },
      { q: 'Before eating raw vegetables from the garden, we should:', opts: ['Eat them straight from soil', 'Wash them well', 'Skip washing', 'Add only salt'], a: 1 },
      { q: 'A garden bed should ideally be placed where it gets:', opts: ['Full shade all day', 'Good sunlight', 'No water nearby', 'Heavy foot traffic'], a: 1 }
    ],
    match: [
      { l: 'Khurpi', r: 'Loosening soil & weeding' }, { l: 'Compost', r: 'Improving soil fertility' },
      { l: 'Mulch', r: 'Reducing weeds & moisture loss' }, { l: 'Watering Can', r: 'Watering young plants' },
      { l: 'Crop Rotation', r: 'Preventing nutrient loss' }, { l: 'Garden Twine', r: 'Supporting climbing plants' }
    ],
    shortAnswer: [
      { q: 'What is a kitchen garden? (2)' }, { q: 'Name two vegetables that grow easily in a school garden. (2)' },
      { q: 'Why is composting useful in a kitchen garden? (2)' }, { q: 'What is mulching? (2)' },
      { q: 'Name one pest-control method that does not use chemicals. (2)' },
      { q: 'How does a kitchen garden support healthy eating at school? Explain in 2–3 lines. (3)' }
    ],
    oralLevels: [
      { l: 1, t: 'Basics (Recall)', q: ['What is a kitchen garden?', 'Name one vegetable you grew.', 'What tool did you use to dig?', 'Why do we water plants daily?'] },
      { l: 2, t: 'Understanding', q: ['Why do we test soil before planting?', 'Why is sunlight important for vegetables?', 'Why do we remove weeds regularly?', 'What is the use of mulch?'] },
      { l: 3, t: 'Activity-based (Bed Prep)', q: ['How did you prepare the garden bed?', 'Which tools did your group use?', 'How did you mark the rows for sowing?'] },
      { l: 4, t: 'Sowing & Care', q: ['How did you sow the seeds or seedlings?', 'How often did you water the plants?', 'What problems did you face while growing vegetables?'] },
      { l: 5, t: 'Harvest & Reflection', q: ['Which vegetable grew best in your garden?', 'What did you do with the harvest?', 'What would you grow differently next time?'] },
      { l: 6, t: 'Career Linkage', q: ['Who is a farmer?', 'What does a horticulturist do?', 'Would you like to grow your own food at home? Why?'] }
    ]
  },

  cooking_fireless: {
    id: 'cooking_fireless', name: 'Cooking Without Fire', icon: '🍲', theme: 'peach',
    tagline: 'Prepare safe, healthy food without using heat',
    tools: ['Mixing Bowl', 'Measuring Cups & Spoons', 'Grater', 'Child-Safe Knife', 'Chopping Board'],
    materials: ['Fruits & Vegetables', 'Bread / Sprouts', 'Curd / Milk', 'Spices', 'Lemon'],
    safety: ['Wash hands & ingredients thoroughly before starting', 'Use knives carefully and only under supervision', 'Keep the workspace clean and dry', 'Never share food if a classmate has a known allergy'],
    activities: [
      { t: 'Hygiene & Safety Briefing', d: 'Learn hand-washing and food-safety rules before cooking begins.' },
      { t: 'Reading a No-Cook Recipe', d: 'Read and understand a simple no-fire recipe card together.' },
      { t: 'Measuring Ingredients', d: 'Practice using cups and spoons to measure ingredients accurately.' },
      { t: 'Preparing a No-Fire Dish', d: 'Prepare a simple dish such as a fruit or sprout salad.' },
      { t: 'Plating & Presentation', d: 'Arrange the finished dish neatly for serving.' },
      { t: 'Tasting & Feedback Circle', d: 'Taste the dish and share feedback with the group.' }
    ],
    fillBlanks: [
      { q: 'Cooking without fire means preparing food without using ______.', a: 'heat / flame' },
      { q: 'We must always ______ our hands before handling food.', a: 'wash' },
      { q: 'A ______ is used to measure exact quantities of ingredients.', a: 'measuring cup / spoon' },
      { q: '______ should be washed thoroughly before being eaten raw.', a: 'Fruits and vegetables' },
      { q: 'Hygiene means keeping our hands, tools and ______ clean.', a: 'workspace / surroundings' },
      { q: 'A no-fire dish like a fruit salad is also called a ______ recipe.', a: 'raw / no-cook' },
      { q: 'A ______ is used to cut fruits and vegetables safely.', a: 'chopping board and child-safe knife' },
      { q: 'Curd and milk are examples of ______ ingredients used in no-fire cooking.', a: 'dairy' }
    ],
    mcq: [
      { q: 'Which of these is a no-fire dish?', opts: ['Fried rice', 'Fruit salad', 'Boiled egg', 'Roti'], a: 1 },
      { q: 'Why do we measure ingredients carefully?', opts: ['To waste food', 'For taste & consistency', "It isn't needed", 'To save time only'], a: 1 },
      { q: 'Before cooking, we should always:', opts: ['Skip hand-washing', 'Wash hands & ingredients', 'Use dirty tools', 'Ignore hygiene'], a: 1 },
      { q: 'A chopping board is mainly used to:', opts: ['Serve food', 'Cut/prepare ingredients safely', 'Store leftovers', 'Heat food'], a: 1 },
      { q: 'If a classmate is allergic to nuts, we should:', opts: ['Ignore it', 'Avoid using nuts in their portion', 'Add more nuts', 'Not tell anyone'], a: 1 },
      { q: 'A grater is mainly used to:', opts: ['Shred vegetables/fruits', 'Boil water', 'Measure spices', 'Wash dishes'], a: 0 }
    ],
    match: [
      { l: 'Measuring Cup', r: 'Measuring exact quantity' }, { l: 'Grater', r: 'Shredding vegetables' },
      { l: 'Chopping Board', r: 'Cutting ingredients safely' }, { l: 'Mixing Bowl', r: 'Mixing ingredients' },
      { l: 'Curd', r: 'A dairy ingredient' }, { l: 'Lemon', r: 'Adding tangy flavour' }
    ],
    shortAnswer: [
      { q: 'What does "cooking without fire" mean? (2)' }, { q: 'Name two hygiene steps to follow before preparing food. (2)' },
      { q: 'Why is measuring important in a recipe? (2)' }, { q: 'Name one no-fire dish you prepared. (2)' },
      { q: 'Why should we taste-test food before serving it? (2)' },
      { q: 'Why is hygiene especially important when food is not cooked with heat? Explain in 2–3 lines. (3)' }
    ],
    oralLevels: [
      { l: 1, t: 'Basics (Recall)', q: ['What does cooking without fire mean?', 'Name one ingredient you used.', 'Why do we wash our hands before cooking?', 'What tool did you use to mix the dish?'] },
      { l: 2, t: 'Understanding', q: ['Why is hygiene important in cooking?', 'Why do we measure ingredients carefully?', 'Why must vegetables be washed well before eating raw?'] },
      { l: 3, t: 'Activity-based', q: ['How did your group prepare the dish?', 'What steps did you follow from the recipe?', 'What was difficult about the recipe?'] },
      { l: 4, t: 'Presentation', q: ['How did you plate or present your dish?', 'What did your classmates think of the taste?'] },
      { l: 5, t: 'Reflection', q: ['What did you enjoy most about this activity?', 'What would you change next time?'] },
      { l: 6, t: 'Career Linkage', q: ['Who is a chef?', 'What does a nutritionist do?', 'Would you like to cook at home regularly? Why?'] }
    ]
  },

  school_museum: {
    id: 'school_museum', name: 'School Museum', icon: '🏺', theme: 'lavender',
    tagline: 'Curate and present local heritage objects',
    tools: ['Label Cards', 'Glue / Tape', 'Display Stands', 'Camera / Phone', 'Notebook'],
    materials: ['Old Household Objects', 'Photographs', 'Charts', 'String / Thread for Labels'],
    safety: ['Handle borrowed or old objects gently', 'Always take permission before borrowing an item', 'Keep fragile objects away from table edges', 'Return all borrowed objects safely after the exhibition'],
    activities: [
      { t: 'Identifying a Theme', d: 'Decide a theme for the museum, e.g. farming tools or old utensils.' },
      { t: 'Collecting / Borrowing Objects', d: 'Gather objects from home with permission from family members.' },
      { t: "Researching Each Object's History", d: "Find out an object's age, use and story." },
      { t: 'Labelling & Captioning', d: 'Write short, clear captions describing each object.' },
      { t: 'Designing the Museum Layout', d: 'Arrange exhibits so visitors can view them easily.' },
      { t: 'Hosting a Class Visit Day', d: 'Present the museum to classmates and answer their questions.' }
    ],
    fillBlanks: [
      { q: 'A museum displays ______ that tell us about history or culture.', a: 'objects / artefacts' },
      { q: "Each object in a museum needs a ______ describing it.", a: 'label / caption' },
      { q: "We must take ______ before borrowing an object from someone's home.", a: 'permission' },
      { q: '______ helps visitors understand the story behind an object.', a: 'A caption / label' },
      { q: 'A good museum layout makes it easy for visitors to ______ the exhibits.', a: 'view / explore' },
      { q: 'Old objects should be handled ______ to avoid damage.', a: 'gently / carefully' },
      { q: 'A ______ is the overall idea that connects all the exhibits in a museum.', a: 'theme' },
      { q: 'We use a ______ to photograph and document each exhibit.', a: 'camera / phone' }
    ],
    mcq: [
      { q: 'The main purpose of a school museum is to:', opts: ['Sell objects', 'Display & explain heritage objects', 'Store junk', 'None of these'], a: 1 },
      { q: 'A label/caption should mainly tell visitors:', opts: ['The price', 'What the object is & why it matters', 'Nothing', 'A joke'], a: 1 },
      { q: 'Before borrowing an object for the museum we should:', opts: ['Just take it', 'Ask permission from the owner', 'Hide it', 'Buy it'], a: 1 },
      { q: 'Which is most useful for documenting objects?', opts: ['Camera / phone', 'Frying pan', 'Watering can', 'Shade net'], a: 0 },
      { q: 'A good museum layout helps visitors:', opts: ['Get lost', 'Move & view exhibits easily', 'Skip everything', 'Leave quickly'], a: 1 },
      { q: 'A "theme" in a museum project means:', opts: ['A random mix of items', 'A connecting idea for all exhibits', 'The entry fee', 'The exhibition date'], a: 1 }
    ],
    match: [
      { l: 'Label', r: 'Describes an object' }, { l: 'Display Stand', r: 'Holds an object for viewing' },
      { l: 'Camera', r: 'Documents the objects' }, { l: 'Theme', r: 'Connects all exhibits together' },
      { l: 'Layout', r: 'Arranges exhibits for visitors' }, { l: 'Permission', r: 'Needed before borrowing an object' }
    ],
    shortAnswer: [
      { q: 'What is the purpose of a school museum? (2)' }, { q: 'Name two objects you displayed in your museum. (2)' },
      { q: 'Why is a label/caption important for each exhibit? (2)' }, { q: 'Why must we ask permission before borrowing an object? (2)' },
      { q: "Name one way you researched an object's history. (2)" },
      { q: 'How does a school museum help us understand our heritage better? Explain in 2–3 lines. (3)' }
    ],
    oralLevels: [
      { l: 1, t: 'Basics (Recall)', q: ['What is a museum?', 'Name one object you displayed.', 'Why do objects need labels?', 'What did you use to make labels?'] },
      { l: 2, t: 'Understanding', q: ["Why is it important to research an object's history?", 'Why do we take permission before borrowing objects?', 'Why should fragile objects be handled carefully?'] },
      { l: 3, t: 'Activity-based', q: ['How did you choose your theme?', 'How did your group collect objects?', 'How did you decide the layout?'] },
      { l: 4, t: 'Visit Day', q: ['How did visitors respond during the museum visit day?', 'What questions did visitors ask you?'] },
      { l: 5, t: 'Reflection', q: ['What did you enjoy most about this activity?', 'What was the most interesting object and why?'] },
      { l: 6, t: 'Career Linkage', q: ['Who is a curator?', 'What does a historian do?', 'Would you like to work in a museum? Why?'] }
    ]
  },

  maker_skills: {
    id: 'maker_skills', name: 'Maker Skills', icon: '🛠️', theme: 'peach',
    tagline: 'Hands-on tool use, construction & design thinking',
    tools: ['Ruler / Measuring Tape', 'Scissors', 'Glue Gun / Glue', 'Hammer', 'Sandpaper', 'Screwdriver'],
    materials: ['Cardboard / Wood Scraps', 'Nails / Screws', 'Paint', 'String / Wire', 'Recycled Materials'],
    safety: ['Always ask an adult before using sharp tools', 'Wear safety goggles or gloves when needed', 'Keep fingers away from cutting edges', 'Clean up tools and waste after use'],
    activities: [
      { t: 'Tool Identification & Safety Briefing', d: 'Learn the names, uses and safety rules for each tool.' },
      { t: 'Measuring & Marking Materials', d: 'Measure and mark materials accurately before cutting.' },
      { t: 'Cutting & Shaping', d: 'Cut and shape materials to the planned design.' },
      { t: 'Joining / Assembling Parts', d: 'Join the pieces together using glue, nails or screws.' },
      { t: 'Finishing & Decorating', d: 'Sand rough edges and paint or decorate the product.' },
      { t: 'Testing the Final Product', d: 'Test if the product works and looks as planned.' }
    ],
    fillBlanks: [
      { q: 'Before cutting, we must always ______ the material accurately.', a: 'measure & mark' },
      { q: '______ is used to join two pieces of wood or cardboard.', a: 'Glue / nails' },
      { q: 'We should always ask an adult before using ______ tools.', a: 'sharp' },
      { q: 'Sandpaper is used to ______ rough surfaces.', a: 'smoothen' },
      { q: 'A ______ is used to tighten or loosen screws.', a: 'screwdriver' },
      { q: 'Testing the final product helps us check if it ______ properly.', a: 'works / functions' },
      { q: 'We wear safety goggles mainly to protect our ______.', a: 'eyes' },
      { q: 'After finishing a project, we should always ______ the workspace.', a: 'clean up' }
    ],
    mcq: [
      { q: 'Before cutting any material we should first:', opts: ['Cut randomly', 'Measure & mark', 'Paint it', 'Throw it away'], a: 1 },
      { q: 'Sandpaper is mainly used to:', opts: ['Cut wood', 'Smoothen rough surfaces', 'Join parts', 'Apply paint'], a: 1 },
      { q: 'Safety goggles protect our:', opts: ['Hands', 'Eyes', 'Feet', 'Ears'], a: 1 },
      { q: 'A screwdriver is used to:', opts: ['Cut cardboard', 'Tighten / loosen screws', 'Measure length', 'Apply paint'], a: 1 },
      { q: 'After finishing a maker project we should:', opts: ['Leave tools scattered', 'Clean up tools & waste', 'Hide the tools', 'Break the tools'], a: 1 },
      { q: 'A ruler or measuring tape is mainly used for:', opts: ['Joining parts', 'Measuring length accurately', 'Painting', 'Cutting'], a: 1 }
    ],
    match: [
      { l: 'Ruler', r: 'Measuring length' }, { l: 'Glue', r: 'Joining parts' },
      { l: 'Sandpaper', r: 'Smoothening surfaces' }, { l: 'Screwdriver', r: 'Tightening / loosening screws' },
      { l: 'Safety Goggles', r: 'Protecting the eyes' }, { l: 'Hammer', r: 'Driving in nails' }
    ],
    shortAnswer: [
      { q: 'Why is measuring and marking important before cutting? (2)' }, { q: 'Name two tools used in your maker project. (2)' },
      { q: 'Why should we wear safety gear while making things? (2)' }, { q: 'What is the purpose of testing the final product? (2)' },
      { q: 'Name one material you used in your project. (2)' },
      { q: 'Why is planning important before starting to make something? Explain in 2–3 lines. (3)' }
    ],
    oralLevels: [
      { l: 1, t: 'Basics (Recall)', q: ['What did you make in this project?', 'Name one tool you used.', 'Why do we measure before cutting?', 'What material did you use?'] },
      { l: 2, t: 'Understanding', q: ['Why is safety important while using tools?', 'Why do we sand rough edges?', 'Why do we test our final product?'] },
      { l: 3, t: 'Activity-based', q: ['How did your group plan the design?', 'What steps did you follow to build it?', 'What problems did you face while assembling it?'] },
      { l: 4, t: 'Finishing', q: ['How did you finish or decorate your product?', 'Did your product work as planned?'] },
      { l: 5, t: 'Reflection', q: ['What did you enjoy most about making this?', 'What would you improve next time?'] },
      { l: 6, t: 'Career Linkage', q: ['Who is a carpenter or engineer?', 'What does a designer do?', 'Would you like to build things as a career? Why?'] }
    ]
  },

  simple_machines: {
    id: 'simple_machines', name: 'Simple Machines', icon: '⚙️', theme: 'sky',
    tagline: 'Build & test levers, pulleys, ramps and wheels',
    tools: ['Ruler', 'String', 'Small Weights', 'Cardboard / Wooden Strips', 'Pulley Wheel / Spool'],
    materials: ['Sticks / Rods', 'String / Thread', 'Small Boxes (Load)', 'Cardboard Ramp', 'Wheels'],
    safety: ['Be careful while lifting weights', 'Keep fingers away from moving parts like pulleys & wheels', 'Work on a stable, flat surface', 'Do not overload your models'],
    activities: [
      { t: 'Identifying Simple Machines Around Us', d: 'Spot levers, pulleys, ramps and wheels in everyday life.' },
      { t: 'Building a Lever Model', d: 'Build a simple see-saw-style lever and test it with loads.' },
      { t: 'Building a Pulley / Wheel-Axle Model', d: 'Build a pulley using string and a spool to lift a small load.' },
      { t: 'Building an Inclined Plane Model', d: 'Build a ramp and test how effort changes with its slope.' },
      { t: 'Testing & Measuring Effort', d: 'Measure and compare the effort needed for each model.' },
      { t: 'Presenting Findings', d: 'Share what each machine does and where it is used in real life.' }
    ],
    fillBlanks: [
      { q: 'A ______ is a simple machine that helps lift loads using a pivot.', a: 'lever' },
      { q: 'A pulley changes the ______ of force needed to lift a load.', a: 'direction / amount' },
      { q: 'An inclined plane is also called a ______.', a: 'ramp / slope' },
      { q: 'Simple machines make work ______ by reducing the effort needed.', a: 'easier' },
      { q: 'The fixed point on which a lever turns is called the ______.', a: 'fulcrum' },
      { q: 'A wheel and axle help reduce ______ while moving loads.', a: 'friction / effort' },
      { q: 'A ______ is a wheel with a groove that a rope or string runs over.', a: 'pulley' },
      { q: 'Simple machines are useful because they reduce the ______ needed to do work.', a: 'effort' }
    ],
    mcq: [
      { q: 'Which is an example of a lever?', opts: ['Seesaw', 'Pulley', 'Wheel', 'Ramp'], a: 0 },
      { q: 'The fixed point of a lever is called the:', opts: ['Load', 'Fulcrum', 'Effort', 'Axle'], a: 1 },
      { q: 'A ramp used to move heavy objects up is an example of:', opts: ['Lever', 'Pulley', 'Inclined plane', 'Wedge'], a: 2 },
      { q: 'A pulley mainly helps to:', opts: ['Cut materials', 'Change direction of force to lift loads', 'Measure weight', 'Generate electricity'], a: 1 },
      { q: 'Simple machines are mainly used to:', opts: ['Increase effort', 'Make work easier', 'Increase weight', 'Waste energy'], a: 1 },
      { q: 'A wheel and axle mainly helps to:', opts: ['Reduce friction while moving loads', 'Increase friction', 'Stop motion', 'Add weight'], a: 0 }
    ],
    match: [
      { l: 'Lever', r: 'Seesaw-like motion' }, { l: 'Pulley', r: 'Lifting using a rope & wheel' },
      { l: 'Inclined Plane', r: 'A ramp' }, { l: 'Wheel & Axle', r: 'Reducing friction while moving' },
      { l: 'Fulcrum', r: 'The pivot point of a lever' }, { l: 'Effort', r: 'The force applied to do work' }
    ],
    shortAnswer: [
      { q: 'What is a simple machine? (2)' }, { q: 'Name two simple machines you built or studied. (2)' },
      { q: 'What is a fulcrum? (2)' }, { q: 'Why are pulleys useful? (2)' },
      { q: 'Name one simple machine you see at home or school. (2)' },
      { q: 'How do simple machines make our daily work easier? Explain in 2–3 lines. (3)' }
    ],
    oralLevels: [
      { l: 1, t: 'Basics (Recall)', q: ['What is a simple machine?', 'Name one simple machine you built.', 'What is a fulcrum?', 'Why do we use simple machines?'] },
      { l: 2, t: 'Understanding', q: ['Why does a pulley change the direction of force?', 'Why is an inclined plane useful for heavy loads?', 'Why do wheels reduce effort?'] },
      { l: 3, t: 'Activity-based', q: ['How did your group build the lever model?', 'What materials did you use?', 'What problems did you face while building it?'] },
      { l: 4, t: 'Testing', q: ['How did you test your model?', 'What did you measure — effort or load?'] },
      { l: 5, t: 'Reflection', q: ['What did you find most interesting about simple machines?', 'Where else have you seen simple machines used?'] },
      { l: 6, t: 'Career Linkage', q: ['Who is a mechanical engineer?', 'What does a machine operator do?', 'Would you like to design machines? Why?'] }
    ]
  }
};

var ASM_PROJECT_LIST = ['plant_nursery', 'kitchen_garden', 'cooking_fireless', 'school_museum', 'maker_skills', 'simple_machines'];

/* ── Rubric configs per assessment type (criteria, max marks each) ── */
var ASM_TYPES = {
  written:      { label: 'Written',      icon: '✍️', marks: 10, color: 'mint' },
  oral:         { label: 'Oral',         icon: '🎤', marks: 30, color: 'sky' },
  portfolio:    { label: 'Portfolio',    icon: '📁', marks: 10, color: 'lavender' },
  activitybook: { label: 'Activity Book', icon: '📖', marks: 30, color: 'peach' },
  observation:  { label: 'Observation',  icon: '👁️', marks: 20, color: 'coral' }
};

var ASM_ORAL_FIELDS = [
  { key: 'understanding', label: 'Understanding', max: 10 },
  { key: 'answering',     label: 'Answering Ability', max: 10 },
  { key: 'confidence',    label: 'Confidence', max: 10 }
];
var ASM_PORTFOLIO_FIELDS = [
  { key: 'creativity', label: 'Creativity', max: 3 },
  { key: 'original',   label: 'Original Thinking', max: 3 },
  { key: 'effort',     label: 'Effort', max: 2 },
  { key: 'neatness',   label: 'Neatness', max: 2 }
];
var ASM_OBSERVATION_FIELDS = [
  { key: 'participation', label: 'Participation', max: 5, desc: 'Actively involved in the work; not sitting idle.' },
  { key: 'teamwork',      label: 'Teamwork', max: 5, desc: 'Works well with the group, helps others, shares responsibility.' },
  { key: 'practical',     label: 'Practical Skills & Creativity', max: 5, desc: 'Performs hands-on tasks correctly; shows creative thinking.' },
  { key: 'discipline',    label: 'Discipline & Communication', max: 5, desc: 'Follows instructions, uses tools safely, communicates clearly.' }
];

var ASM_PORTFOLIO_PAGES = [
  { n: 1, title: 'Cover Page', icon: '📔', prompt: 'Title of the project, student name, class & school name, with a simple cover drawing.' },
  { n: 2, title: 'Project Introduction', icon: '📝', prompt: 'What is this project about? Write 3–4 lines introducing the topic in your own words.' },
  { n: 3, title: 'Objectives', icon: '🎯', prompt: 'What did you set out to learn or achieve through this project?' },
  { n: 4, title: 'Materials Used', icon: '🧰', prompt: 'List the tools and materials used during the project activities.' },
  { n: 5, title: 'Safety Precautions', icon: '🦺', prompt: 'List the safety steps you followed while doing the project.' },
  { n: 6, title: 'Survey / Visit Notes', icon: '🔎', prompt: 'Notes from any field visit, survey, or interaction with experts related to the project.' },
  { n: 7, title: 'Team Activities', icon: '🤝', prompt: 'Describe how your team worked together and who did what.' },
  { n: 8, title: 'Photos & Evidence', icon: '📷', prompt: 'Paste or describe photographs/sketches that show your work in progress.' },
  { n: 9, title: 'Reflection & Learnings', icon: '💡', prompt: 'What did you learn? What surprised you? What would you do differently?' },
  { n: 10, title: 'Teacher Feedback', icon: '🧑‍🏫', prompt: 'Space reserved for the teacher to write feedback and an overall remark.' }
];


/* ── Assessment Module state ── */
var ASM = {
  grade: 6,
  projectId: 'plant_nursery',
  activeType: null,
  store: {},              /* keyed "grade_projectId" -> per-project data */
  expandedStudent: null,  /* studentId currently expanded in an eval list */
  search: '',
  filter: 'all',
  editingPaper: false,
  reportTab: 'class'
};

var ASM_NAMES = [
  'Aarav Sharma', 'Ishita Verma', 'Vivaan Gupta', 'Saanvi Reddy', 'Aditya Kumar',
  'Diya Patel', 'Krishna Iyer', 'Ananya Singh', 'Rohan Mehta', 'Priya Nair',
  'Arjun Yadav', 'Kavya Joshi', 'Sai Pillai', 'Meera Desai', 'Karthik Rao'
];

function asmKey(grade, projId) { return grade + '_' + projId; }

function asmGetStore(grade, projId) {
  var key = asmKey(grade, projId);
  if (!ASM.store[key]) {
    ASM.store[key] = {
      students: [],
      written: { paper: null, generatedAt: null },
      report: {}
    };
    asmSeedStudents(ASM.store[key]);
  }
  return ASM.store[key];
}

function asmCurrentStore() { return asmGetStore(ASM.grade, ASM.projectId); }

function asmBlankMarks() {
  return {
    written: { score: 0 },
    oral: { understanding: 0, answering: 0, confidence: 0 },
    portfolio: { creativity: 0, original: 0, effort: 0, neatness: 0 },
    activitybook: { act0: 0, act1: 0, act2: 0, act3: 0, act4: 0, act5: 0 },
    observation: { participation: 0, teamwork: 0, practical: 0, discipline: 0 }
  };
}

function asmSeedStudents(store) {
  var count = 12;
  for (var i = 0; i < count; i++) {
    store.students.push({
      id: 'st_' + Date.now() + '_' + i + '_' + Math.floor(Math.random() * 1000),
      name: ASM_NAMES[i % ASM_NAMES.length],
      roll: String(i + 1),
      marks: asmBlankMarks(),
      remarks: { written: '', oral: '', portfolio: '', activitybook: '', observation: '' }
    });
  }
}

function asmShuffle(arr) {
  var a = arr.slice();
  for (var i = a.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var tmp = a[i]; a[i] = a[j]; a[j] = tmp;
  }
  return a;
}
function asmPick(arr, n) {
  if (!arr || arr.length <= n) return arr ? arr.slice() : [];
  return asmShuffle(arr).slice(0, n);
}

function asmFieldsFor(type, projId) {
  if (type === 'oral') return ASM_ORAL_FIELDS;
  if (type === 'portfolio') return ASM_PORTFOLIO_FIELDS;
  if (type === 'observation') return ASM_OBSERVATION_FIELDS;
  if (type === 'activitybook') {
    var bank = PROJECT_BANK[projId];
    return bank.activities.slice(0, 6).map(function (act, i) {
      return { key: 'act' + i, label: act.t, max: 5, desc: act.d };
    });
  }
  if (type === 'written') return [{ key: 'score', label: 'Marks Obtained', max: ASM_TYPES.written.marks }];
  return [];
}

function asmFieldsTotal(marksObj, fields) {
  var sum = 0;
  fields.forEach(function (f) { sum += Number(marksObj[f.key]) || 0; });
  return sum;
}

function asmStudentTypeTotal(student, type) {
  if (type === 'written') return Number(student.marks.written.score) || 0;
  var fields = asmFieldsFor(type, ASM.projectId);
  return asmFieldsTotal(student.marks[type], fields);
}

function asmStudentGrandTotal(student) {
  return asmStudentTypeTotal(student, 'written') + asmStudentTypeTotal(student, 'oral') +
    asmStudentTypeTotal(student, 'portfolio') + asmStudentTypeTotal(student, 'activitybook') +
    asmStudentTypeTotal(student, 'observation');
}

function asmTypeStatus(store, type) {
  if (type === 'written') return store.written.paper ? 'progress' : 'pending';
  var scored = store.students.filter(function (s) { return asmStudentTypeTotal(s, type) > 0; }).length;
  if (scored === 0) return 'pending';
  if (scored === store.students.length) return 'done';
  return 'progress';
}

function asmInitials(name) {
  var parts = name.trim().split(/\s+/);
  return ((parts[0] || '')[0] || '') + ((parts[1] || '')[0] || '');
}


/* ════════════════════════════════════
   NAVIGATION
   ════════════════════════════════════ */
function goAssessments() {
  renderAssessSelect();
  go('s-assess-select');
}

function goAssessSelect() {
  renderAssessSelect();
  go('s-assess-select');
}

function asmSelectGrade(g) {
  ASM.grade = g;
  renderAssessSelect();
}

function asmSelectProject(projId) {
  ASM.projectId = projId;
  ASM.search = ''; ASM.filter = 'all'; ASM.expandedStudent = null;
  renderAssessDashboard();
  go('s-assess-dashboard');
}

function goAssessDashboard() {
  renderAssessDashboard();
  go('s-assess-dashboard');
}

function asmSwitchProject(projId) {
  ASM.projectId = projId;
  ASM.search = ''; ASM.filter = 'all'; ASM.expandedStudent = null;
  renderAssessDashboard();
}

function openWrittenAssessment() {
  ASM.activeType = 'written';
  renderWrittenBody();
  go('s-assess-written');
}
function openOralAssessment() {
  ASM.activeType = 'oral'; ASM.search = ''; ASM.filter = 'all'; ASM.expandedStudent = null;
  renderEvalBody('oral');
  go('s-assess-oral');
}
function openPortfolioAssessment() {
  ASM.activeType = 'portfolio'; ASM.search = ''; ASM.filter = 'all'; ASM.expandedStudent = null;
  renderPortfolioBody();
  go('s-assess-portfolio');
}
function openActivityBookAssessment() {
  ASM.activeType = 'activitybook'; ASM.search = ''; ASM.filter = 'all'; ASM.expandedStudent = null;
  renderEvalBody('activitybook');
  go('s-assess-activitybook');
}
function openObservationAssessment() {
  ASM.activeType = 'observation'; ASM.search = ''; ASM.filter = 'all'; ASM.expandedStudent = null;
  renderEvalBody('observation');
  go('s-assess-observation');
}

/* Keep the desktop sidebar's "Assessments" item highlighted while on
   any assessment sub-screen (highlightDesktopNav only matches the
   exact active screen id, which would otherwise clear it). */
var _origHighlightDesktopNav = highlightDesktopNav;
highlightDesktopNav = function (id) {
  if (id && id.indexOf('s-assess') === 0) {
    document.querySelectorAll('.desktop-sidebar .ds-item').forEach(function (b) {
      b.classList.toggle('active', b.dataset.target === 's-assess-select');
    });
  } else {
    _origHighlightDesktopNav(id);
  }
};

/* ════════════════════════════════════
   GRADE + PROJECT SELECTION SCREEN
   ════════════════════════════════════ */
function renderAssessSelect() {
  var body = document.getElementById('assess-select-body');
  if (!body) return;
  var html = '<div class="asm-intro">' +
    '<div class="asm-intro-h">📊 Assessments</div>' +
    '<div class="asm-intro-sub">Select a grade and project to evaluate students across Written, Oral, Portfolio, Activity Book and Observation.</div>' +
    '</div>';

  html += '<div class="asm-grade-row">';
  ASM_GRADES.forEach(function (g) {
    html += '<button class="asm-grade-chip ' + (g === ASM.grade ? 'active' : '') + '" onclick="asmSelectGrade(' + g + ')">Class ' + g + '</button>';
  });
  html += '</div>';

  html += '<div class="asm-project-grid">';
  ASM_PROJECT_LIST.forEach(function (pid) {
    var p = PROJECT_BANK[pid];
    var store = asmGetStore(ASM.grade, pid);
    var doneCount = store.students.filter(function (s) { return asmStudentGrandTotal(s) > 0; }).length;
    var pct = store.students.length ? Math.round((doneCount / store.students.length) * 100) : 0;
    html += '<div class="asm-project-card" onclick="asmSelectProject(\'' + pid + '\')">' +
      '<div class="asm-project-icon" style="background:var(--' + p.theme + ');">' + p.icon + '</div>' +
      '<div class="asm-project-info">' +
      '<div class="asm-project-name">' + p.name + '</div>' +
      '<div class="asm-project-meta">' + p.tagline + ' · ' + store.students.length + ' students</div>' +
      '<div class="asm-project-progress-mini"><div class="pbar"><span style="width:' + pct + '%;"></span></div><span style="font-size:10.5px;font-weight:800;color:var(--text-muted);flex-shrink:0;">' + pct + '%</span></div>' +
      '</div></div>';
  });
  html += '</div>';

  body.innerHTML = html;
}


/* ════════════════════════════════════
   ASSESSMENT DASHBOARD
   ════════════════════════════════════ */
function renderAssessDashboard() {
  var p = PROJECT_BANK[ASM.projectId];
  var store = asmCurrentStore();
  document.getElementById('assess-dash-projname').textContent = p.icon + ' ' + p.name;

  var html = '<div class="asm-dash-meta-row">' +
    '<span class="asm-grade-badge">Class ' + ASM.grade + '</span>' +
    '<select class="asm-proj-select" onchange="asmSwitchProject(this.value)">' +
    ASM_PROJECT_LIST.map(function (pid) {
      var pp = PROJECT_BANK[pid];
      return '<option value="' + pid + '" ' + (pid === ASM.projectId ? 'selected' : '') + '>' + pp.icon + ' ' + pp.name + '</option>';
    }).join('') +
    '</select>' +
    '<span class="asm-tag-pill"><i class="ti ti-users"></i> ' + store.students.length + ' students</span>' +
    '</div>';

  html += '<div class="asm-report-btns">' +
    '<button class="asm-report-btn xls" onclick="openReportModal()"><i class="ti ti-file-spreadsheet"></i> Full Report (Excel)</button>' +
    '<button class="asm-report-btn pdf" onclick="openReportModal()"><i class="ti ti-file-text"></i> Full Report (PDF)</button>' +
    '</div>';

  html += '<div class="asm-type-grid">';
  var typeOpeners = { written: 'openWrittenAssessment', oral: 'openOralAssessment', portfolio: 'openPortfolioAssessment', activitybook: 'openActivityBookAssessment', observation: 'openObservationAssessment' };
  Object.keys(ASM_TYPES).forEach(function (key) {
    var t = ASM_TYPES[key];
    var status = asmTypeStatus(store, key);
    html += '<div class="asm-type-card ' + (status === 'done' ? 'is-complete' : '') + '" onclick="' + typeOpeners[key] + '()">' +
      '<div class="asm-type-status-dot ' + status + '"></div>' +
      '<div class="asm-type-ico">' + t.icon + '</div>' +
      '<div class="asm-type-name">' + t.label + '</div>' +
      '<div class="asm-type-marks">' + (key === 'activitybook' ? 'Textbook Tasks' : t.marks + ' marks') + '</div>' +
      '</div>';
  });
  html += '</div>';

  /* Summary card */
  var totalMax = ASM_TYPES.written.marks + ASM_TYPES.oral.marks + ASM_TYPES.portfolio.marks + ASM_TYPES.activitybook.marks + ASM_TYPES.observation.marks;
  var classAvg = 0;
  if (store.students.length) {
    var sum = 0;
    store.students.forEach(function (s) { sum += asmStudentGrandTotal(s); });
    classAvg = sum / store.students.length;
  }
  var classPct = totalMax ? Math.round((classAvg / totalMax) * 100) : 0;
  var doneCount = store.students.filter(function (s) { return asmStudentGrandTotal(s) > 0; }).length;

  html += '<div class="asm-summary-card">' +
    '<div class="asm-summary-head">' +
    '<div class="asm-ring" style="--pct:' + classPct + ';"><div class="asm-ring-inner"><div class="asm-ring-pct">' + classPct + '%</div><div class="asm-ring-label">Class Avg</div></div></div>' +
    '<div style="flex:1;">' +
    '<div class="asm-summary-title" style="margin-bottom:4px;">Marks Summary</div>' +
    '<div style="font-size:12px;color:var(--text-muted);line-height:1.4;">' + doneCount + ' of ' + store.students.length + ' students have at least one score recorded.</div>' +
    '</div></div>' +
    '<div class="asm-summary-row"><span class="asm-summary-label">Average Total</span><span class="asm-summary-val">' + classAvg.toFixed(1) + ' / ' + totalMax + '</span></div>' +
    Object.keys(ASM_TYPES).map(function (key) {
      var t = ASM_TYPES[key];
      var st = asmTypeStatus(store, key);
      var chipClass = st === 'done' ? 'done' : (st === 'progress' ? 'progress' : 'pending');
      var chipLabel = st === 'done' ? 'Completed' : (st === 'progress' ? 'In Progress' : 'Pending');
      return '<div class="asm-summary-row"><span class="asm-summary-label">' + t.icon + ' ' + t.label + '</span><span class="asm-status-chip ' + chipClass + '">' + chipLabel + '</span></div>';
    }).join('') +
    '</div>';

  document.getElementById('assess-dash-body').innerHTML = html;
}


/* ════════════════════════════════════
   WRITTEN ASSESSMENT
   ════════════════════════════════════ */
function asmGenerateWrittenPaper(showFeedback) {
  var bank = PROJECT_BANK[ASM.projectId];
  var store = asmCurrentStore();
  var A = asmPick(bank.fillBlanks, 4);
  var B = asmPick(bank.mcq, 3);
  var C = asmPick(bank.match, 4);
  var D = asmPick(bank.shortAnswer, 1);
  store.written.paper = { A: A, B: B, C: C, D: D };
  store.written.generatedAt = new Date().toISOString();
  if (showFeedback) showToast('✅ New question paper generated');
}

function renderWrittenBody() {
  var p = PROJECT_BANK[ASM.projectId];
  document.getElementById('assess-written-projname').textContent = p.icon + ' ' + p.name;
  var store = asmCurrentStore();
  if (!store.written.paper) asmGenerateWrittenPaper(false);
  var paper = store.written.paper;

  var html = '<div class="asm-action-row">' +
    '<button class="asm-btn asm-btn-primary" onclick="asmRegeneratePaper()"><i class="ti ti-refresh"></i> Regenerate Questions</button>' +
    '<button class="asm-btn asm-btn-outline" onclick="asmDownloadWrittenPDF()"><i class="ti ti-file-text"></i> Download PDF</button>' +
    '<button class="asm-btn asm-btn-outline" onclick="asmDownloadWrittenWord()"><i class="ti ti-file-word"></i> Download Word</button>' +
    '<button class="asm-btn asm-btn-ghost" onclick="asmPrintWritten()"><i class="ti ti-printer"></i> Print</button>' +
    '</div>';

  html += '<div class="asm-paper-section"><div class="asm-paper-section-h"><span>Section A — Fill in the Blanks</span><span class="asm-paper-section-marks">' + paper.A.length + ' × 1 = ' + paper.A.length + ' marks</span></div>';
  paper.A.forEach(function (item, i) {
    html += '<div class="asm-q-item"><span class="asm-q-tag">A' + (i + 1) + '</span><span class="asm-editable" contenteditable="true" onblur="asmEditQ(\'A\',' + i + ',\'q\',this)">' + item.q + '</span>' +
      '<div style="font-size:11px;color:var(--text-muted);margin-top:4px;">Answer: <span class="asm-editable" contenteditable="true" onblur="asmEditQ(\'A\',' + i + ',\'a\',this)">' + item.a + '</span></div></div>';
  });
  html += '</div>';

  html += '<div class="asm-paper-section"><div class="asm-paper-section-h"><span>Section B — Multiple Choice Questions</span><span class="asm-paper-section-marks">' + paper.B.length + ' × 1 = ' + paper.B.length + ' marks</span></div>';
  paper.B.forEach(function (item, i) {
    html += '<div class="asm-q-item"><span class="asm-q-tag">B' + (i + 1) + '</span><span class="asm-editable" contenteditable="true" onblur="asmEditQ(\'B\',' + i + ',\'q\',this)">' + item.q + '</span>';
    item.opts.forEach(function (opt, oi) {
      html += '<div class="asm-mcq-opt ' + (oi === item.a ? 'correct' : '') + '">' + String.fromCharCode(97 + oi) + ') ' + opt + (oi === item.a ? ' ✓' : '') + '</div>';
    });
    html += '</div>';
  });
  html += '</div>';

  html += '<div class="asm-paper-section"><div class="asm-paper-section-h"><span>Section C — Match the Following</span><span class="asm-paper-section-marks">' + paper.C.length + ' × 0.5 = ' + (paper.C.length * 0.5) + ' marks</span></div>';
  html += '<div class="asm-q-item"><span class="asm-q-tag">C</span>Match Column A with Column B';
  paper.C.forEach(function (item) {
    html += '<div class="asm-match-row"><div class="asm-match-col">' + item.l + '</div><i class="ti ti-arrow-right asm-match-arrow"></i><div class="asm-match-col">' + item.r + '</div></div>';
  });
  html += '</div></div>';

  html += '<div class="asm-paper-section"><div class="asm-paper-section-h"><span>Section D — Short Answer</span><span class="asm-paper-section-marks">' + paper.D.length + ' × 1 = ' + paper.D.length + ' mark</span></div>';
  paper.D.forEach(function (item, i) {
    html += '<div class="asm-q-item"><span class="asm-q-tag">D' + (i + 1) + '</span><span class="asm-editable" contenteditable="true" onblur="asmEditQ(\'D\',' + i + ',\'q\',this)">' + item.q + '</span></div>';
  });
  html += '</div>';

  /* Per-student marks entry */
  html += '<div class="asm-student-toolbar">' +
    '<input class="asm-search-input" placeholder="Search students…" value="' + ASM.search + '" oninput="asmSetSearch(this.value)">' +
    '<button class="asm-icon-btn primary" onclick="openAddStudentModal()"><i class="ti ti-user-plus"></i></button>' +
    '<button class="asm-icon-btn" onclick="document.getElementById(\'asm-import-input\').click()"><i class="ti ti-upload"></i></button>' +
    '</div>';
  html += '<div id="asm-written-students"></div>';

  document.getElementById('assess-written-body').innerHTML = html;
  asmRenderWrittenStudents();
}

function asmRenderWrittenStudents() {
  var store = asmCurrentStore();
  var list = asmFilteredStudents(store);
  var container = document.getElementById('asm-written-students');
  if (!container) return;
  if (!list.length) {
    container.innerHTML = '<div class="asm-empty"><i class="ti ti-users"></i><div class="asm-empty-h">No students found</div><div class="asm-empty-sub">Try a different search or add a new student.</div></div>';
    return;
  }
  container.innerHTML = list.map(function (s) {
    return '<div class="asm-student-card">' +
      '<div class="asm-student-row-top">' +
      '<div class="asm-student-avatar">' + asmInitials(s.name) + '</div>' +
      '<div style="flex:1;min-width:0;"><div class="asm-student-name">' + s.name + '</div><div class="asm-student-roll">Roll ' + s.roll + '</div></div>' +
      '<input type="number" class="asm-activity-marks-input" min="0" max="' + ASM_TYPES.written.marks + '" step="0.5" value="' + s.marks.written.score + '" oninput="asmUpdateWrittenScore(\'' + s.id + '\',this.value)" style="width:56px;">' +
      '<div class="asm-student-actions">' +
      '<button class="asm-mini-btn" onclick="openEditStudentModal(\'' + s.id + '\')"><i class="ti ti-pencil"></i></button>' +
      '<button class="asm-mini-btn danger" onclick="asmDeleteStudent(\'' + s.id + '\')"><i class="ti ti-trash"></i></button>' +
      '</div></div>' +
      '<input class="asm-remark-input" placeholder="Remark (optional)" value="' + (s.remarks.written || '') + '" oninput="asmUpdateRemark(\'' + s.id + '\',\'written\',this.value)">' +
      '</div>';
  }).join('');
}

function asmUpdateWrittenScore(studentId, val) {
  var store = asmCurrentStore();
  var s = store.students.find(function (x) { return x.id === studentId; });
  if (!s) return;
  var v = Math.max(0, Math.min(ASM_TYPES.written.marks, Number(val) || 0));
  s.marks.written.score = v;
}

function asmEditQ(section, idx, field, el) {
  var store = asmCurrentStore();
  store.written.paper[section][idx][field] = el.textContent.trim();
}

function asmRegeneratePaper() {
  if (confirm('Generate a fresh set of questions for this paper? This replaces the current question set (student marks are not affected).')) {
    asmGenerateWrittenPaper(true);
    renderWrittenBody();
  }
}


/* ════════════════════════════════════
   STUDENT MANAGEMENT (shared across all 5 types)
   ════════════════════════════════════ */
var _asmEditingStudentId = null;

function asmFilteredStudents(store) {
  var list = store.students;
  if (ASM.search && ASM.search.trim()) {
    var q = ASM.search.trim().toLowerCase();
    list = list.filter(function (s) { return s.name.toLowerCase().indexOf(q) > -1 || s.roll.toLowerCase().indexOf(q) > -1; });
  }
  if (ASM.filter && ASM.filter !== 'all' && ASM.activeType) {
    var type = ASM.activeType;
    list = list.filter(function (s) {
      var total = asmStudentTypeTotal(s, type);
      var max = type === 'activitybook' ? ASM_TYPES.activitybook.marks : (ASM_TYPES[type] ? ASM_TYPES[type].marks : 0);
      if (ASM.filter === 'done') return total >= max;
      if (ASM.filter === 'pending') return total === 0;
      if (ASM.filter === 'progress') return total > 0 && total < max;
      return true;
    });
  }
  return list;
}

function asmSetSearch(val) {
  ASM.search = val;
  asmReRenderActiveList();
}
function asmSetFilter(val) {
  ASM.filter = val;
  asmReRenderActiveList();
}
function asmReRenderActiveList() {
  if (!ASM.activeType) return;
  if (ASM.activeType === 'written') { asmRenderWrittenStudents(); return; }
  if (ASM.activeType === 'portfolio') { asmRenderPortfolioStudents(); return; }
  asmRenderEvalStudents(ASM.activeType);
}

function openAddStudentModal() {
  _asmEditingStudentId = null;
  document.getElementById('asm-student-modal-title').textContent = 'Add Student';
  document.getElementById('asm-student-name').value = '';
  document.getElementById('asm-student-roll').value = '';
  document.getElementById('asm-student-modal').classList.add('active');
}
function openEditStudentModal(studentId) {
  var store = asmCurrentStore();
  var s = store.students.find(function (x) { return x.id === studentId; });
  if (!s) return;
  _asmEditingStudentId = studentId;
  document.getElementById('asm-student-modal-title').textContent = 'Edit Student';
  document.getElementById('asm-student-name').value = s.name;
  document.getElementById('asm-student-roll').value = s.roll;
  document.getElementById('asm-student-modal').classList.add('active');
}
function closeStudentModal() {
  document.getElementById('asm-student-modal').classList.remove('active');
}
function saveStudentModal() {
  var name = document.getElementById('asm-student-name').value.trim();
  var roll = document.getElementById('asm-student-roll').value.trim();
  if (!name) { showToast('⚠️ Please enter a student name'); return; }
  var store = asmCurrentStore();
  if (_asmEditingStudentId) {
    var s = store.students.find(function (x) { return x.id === _asmEditingStudentId; });
    if (s) { s.name = name; s.roll = roll || s.roll; }
    showToast('✅ Student updated');
  } else {
    store.students.push({
      id: 'st_' + Date.now() + '_' + Math.floor(Math.random() * 10000),
      name: name, roll: roll || String(store.students.length + 1),
      marks: asmBlankMarks(),
      remarks: { written: '', oral: '', portfolio: '', activitybook: '', observation: '' }
    });
    showToast('✅ Student added');
  }
  closeStudentModal();
  asmReRenderActiveList();
  if (document.getElementById('s-assess-dashboard').classList.contains('active')) renderAssessDashboard();
  if (document.getElementById('s-assess-select').classList.contains('active')) renderAssessSelect();
}
function asmDeleteStudent(studentId) {
  if (!confirm('Remove this student from the roster? This deletes all their recorded marks for this project.')) return;
  var store = asmCurrentStore();
  store.students = store.students.filter(function (x) { return x.id !== studentId; });
  asmReRenderActiveList();
  showToast('🗑️ Student removed');
}
function asmUpdateRemark(studentId, type, val) {
  var store = asmCurrentStore();
  var s = store.students.find(function (x) { return x.id === studentId; });
  if (s) s.remarks[type] = val;
}

function handleStudentImport(evt) {
  var file = evt.target.files && evt.target.files[0];
  if (!file) return;
  var reader = new FileReader();
  reader.onload = function (e) {
    var text = String(e.target.result || '');
    var lines = text.split(/\r?\n/).map(function (l) { return l.trim(); }).filter(Boolean);
    var store = asmCurrentStore();
    var added = 0;
    lines.forEach(function (line) {
      var parts = line.split(',').map(function (p) { return p.trim(); });
      var name = parts[0];
      var roll = parts[1] || String(store.students.length + 1);
      if (!name || /^(name|student)/i.test(name)) return; /* skip header row */
      store.students.push({
        id: 'st_' + Date.now() + '_' + Math.floor(Math.random() * 100000),
        name: name, roll: roll, marks: asmBlankMarks(),
        remarks: { written: '', oral: '', portfolio: '', activitybook: '', observation: '' }
      });
      added++;
    });
    showToast('✅ Imported ' + added + ' student(s)');
    asmReRenderActiveList();
    evt.target.value = '';
  };
  reader.readAsText(file);
}


/* ════════════════════════════════════
   GENERIC RUBRIC EVALUATION (Oral / Observation / Activity Book)
   ════════════════════════════════════ */
function renderEvalBody(type) {
  var p = PROJECT_BANK[ASM.projectId];
  var titleEl = document.getElementById('assess-' + type + '-projname');
  if (titleEl) titleEl.textContent = p.icon + ' ' + p.name;

  var html = '';
  if (type === 'activitybook') {
    html += '<div class="asm-portfolio-hero"><div class="asm-portfolio-hero-h">📖 ' + p.name + ' — Textbook Activities</div>' +
      '<div class="asm-portfolio-hero-sub">Mark each textbook activity complete and assign marks (30 total). These come from the NCERT activity list for this project.</div></div>';
  }

  html += '<div class="asm-student-toolbar">' +
    '<input class="asm-search-input" placeholder="Search students…" value="' + ASM.search + '" oninput="asmSetSearch(this.value)">' +
    '<button class="asm-icon-btn primary" onclick="openAddStudentModal()"><i class="ti ti-user-plus"></i></button>' +
    '<button class="asm-icon-btn" onclick="document.getElementById(\'asm-import-input\').click()"><i class="ti ti-upload"></i></button>' +
    '</div>';
  html += '<div class="asm-filter-row">' +
    ['all', 'done', 'progress', 'pending'].map(function (f) {
      var labels = { all: 'All', done: 'Completed', progress: 'In Progress', pending: 'Not Started' };
      return '<button class="asm-filter-chip ' + (ASM.filter === f ? 'active' : '') + '" onclick="asmSetFilter(\'' + f + '\')">' + labels[f] + '</button>';
    }).join('') + '</div>';

  html += '<div id="asm-eval-students"></div>';

  var bodyEl = document.getElementById('assess-' + type + '-body');
  if (bodyEl) bodyEl.innerHTML = html;
  asmRenderEvalStudents(type);
}

function asmRenderEvalStudents(type) {
  var store = asmCurrentStore();
  var fields = asmFieldsFor(type, ASM.projectId);
  var max = type === 'activitybook' ? ASM_TYPES.activitybook.marks : ASM_TYPES[type].marks;
  var list = asmFilteredStudents(store);
  var container = document.getElementById('asm-eval-students');
  if (!container) return;

  if (!list.length) {
    container.innerHTML = '<div class="asm-empty"><i class="ti ti-users"></i><div class="asm-empty-h">No students found</div><div class="asm-empty-sub">Try a different search/filter or add a new student.</div></div>';
    return;
  }

  container.innerHTML = list.map(function (s) {
    var total = asmStudentTypeTotal(s, type);
    var expanded = ASM.expandedStudent === s.id;
    var card = '<div class="asm-student-card">' +
      '<div class="asm-student-row-top" style="cursor:pointer;" onclick="asmToggleExpand(\'' + s.id + '\',\'' + type + '\')">' +
      '<div class="asm-student-avatar">' + asmInitials(s.name) + '</div>' +
      '<div style="flex:1;min-width:0;"><div class="asm-student-name">' + s.name + '</div><div class="asm-student-roll">Roll ' + s.roll + '</div></div>' +
      '<div class="asm-student-marks-pill" id="eval-pill-' + s.id + '">' + total + '/' + max + '</div>' +
      '<div class="asm-student-actions">' +
      '<button class="asm-mini-btn" onclick="event.stopPropagation();openEditStudentModal(\'' + s.id + '\')"><i class="ti ti-pencil"></i></button>' +
      '<button class="asm-mini-btn danger" onclick="event.stopPropagation();asmDeleteStudent(\'' + s.id + '\')"><i class="ti ti-trash"></i></button>' +
      '<i class="ti ti-chevron-' + (expanded ? 'up' : 'down') + '" style="color:var(--text-muted);"></i>' +
      '</div></div>';

    if (expanded) {
      if (type === 'activitybook') {
        card += '<div class="asm-rubric-grid" style="grid-template-columns:1fr;">';
        fields.forEach(function (f) {
          var val = Number(s.marks[type][f.key]) || 0;
          var done = val >= f.max;
          card += '<div style="display:flex;align-items:center;gap:10px;padding:6px 0;border-top:1px dashed var(--border);">' +
            '<div class="asm-activity-check ' + (done ? 'done' : '') + '" onclick="asmToggleActivity(\'' + s.id + '\',\'' + f.key + '\',' + f.max + ')"><i class="ti ti-check"></i></div>' +
            '<div style="flex:1;"><div class="asm-activity-title ' + (done ? 'done' : '') + '">' + f.label + '</div><div style="font-size:10.5px;color:var(--text-muted);">' + (f.desc || '') + '</div></div>' +
            '<input type="number" class="asm-activity-marks-input" min="0" max="' + f.max + '" step="1" value="' + val + '" oninput="asmUpdateField(\'' + s.id + '\',\'' + type + '\',\'' + f.key + '\',this.value,' + f.max + ')">' +
            '</div>';
        });
        card += '</div>';
      } else {
        card += '<div class="asm-rubric-grid">';
        fields.forEach(function (f) {
          var val = Number(s.marks[type][f.key]) || 0;
          card += '<div class="asm-rubric-field"><label>' + f.label + ' (' + f.max + ')</label>' +
            '<input type="number" min="0" max="' + f.max + '" step="0.5" value="' + val + '" oninput="asmUpdateField(\'' + s.id + '\',\'' + type + '\',\'' + f.key + '\',this.value,' + f.max + ')"></div>';
        });
        card += '</div>';
        if (type === 'observation') {
          card += '<div class="asm-rubric-desc">' + fields.map(function (f) { return '<b>' + f.label + ':</b> ' + f.desc; }).join('<br>') + '</div>';
        }
      }
      card += '<div class="asm-rubric-total-row"><span class="asm-rubric-total" id="eval-total-' + s.id + '">Total: ' + total + ' / ' + max + '</span></div>';
      card += '<input class="asm-remark-input" placeholder="Remark (optional)" value="' + (s.remarks[type] || '') + '" oninput="asmUpdateRemark(\'' + s.id + '\',\'' + type + '\',this.value)">';
    }
    card += '</div>';
    return card;
  }).join('');
}

function asmToggleExpand(studentId, type) {
  ASM.expandedStudent = (ASM.expandedStudent === studentId) ? null : studentId;
  asmRenderEvalStudents(type);
}

function asmUpdateField(studentId, type, key, val, max) {
  var store = asmCurrentStore();
  var s = store.students.find(function (x) { return x.id === studentId; });
  if (!s) return;
  var v = Math.max(0, Math.min(max, Number(val) || 0));
  s.marks[type][key] = v;
  asmUpdateInlineTotal(studentId, type);
}

function asmToggleActivity(studentId, key, max) {
  var store = asmCurrentStore();
  var s = store.students.find(function (x) { return x.id === studentId; });
  if (!s) return;
  var current = Number(s.marks.activitybook[key]) || 0;
  s.marks.activitybook[key] = current >= max ? 0 : max;
  asmRenderEvalStudents('activitybook');
}

function asmUpdateInlineTotal(studentId, type) {
  /* Targeted DOM update (NOT a full re-render) so the number input the
     teacher is typing into never loses focus mid-keystroke. */
  var store = asmCurrentStore();
  var s = store.students.find(function (x) { return x.id === studentId; });
  if (!s) return;
  var max = type === 'activitybook' ? ASM_TYPES.activitybook.marks : ASM_TYPES[type].marks;
  var total = asmStudentTypeTotal(s, type);
  var pill = document.getElementById('eval-pill-' + studentId);
  if (pill) pill.textContent = total + '/' + max;
  var totalRow = document.getElementById('eval-total-' + studentId);
  if (totalRow) totalRow.textContent = 'Total: ' + total + ' / ' + max;
}


/* ════════════════════════════════════
   PORTFOLIO
   ════════════════════════════════════ */
var _asmEditingPageNum = null;

function renderPortfolioBody() {
  var p = PROJECT_BANK[ASM.projectId];
  document.getElementById('assess-portfolio-projname').textContent = p.icon + ' ' + p.name;
  var store = asmCurrentStore();
  if (!store.portfolioPagesDone) store.portfolioPagesDone = {};
  if (!store.portfolioPrompts) {
    store.portfolioPrompts = {};
    ASM_PORTFOLIO_PAGES.forEach(function (pg) { store.portfolioPrompts[pg.n] = pg.prompt; });
  }

  var html = '<div class="asm-portfolio-hero"><div class="asm-portfolio-hero-h">📁 "' + p.name + '" Portfolio — 10 Pages</div>' +
    '<div class="asm-portfolio-hero-sub">A structured booklet every student fills in by hand. Tap a page to view/edit its instructions, then mark it as introduced to the class.</div></div>';

  html += '<div class="asm-page-grid">';
  ASM_PORTFOLIO_PAGES.forEach(function (pg) {
    var done = !!store.portfolioPagesDone[pg.n];
    html += '<div class="asm-page-card ' + (done ? 'filled' : '') + '" onclick="openPageModal(' + pg.n + ')">' +
      '<div class="asm-page-num">P' + pg.n + '</div>' +
      '<div class="asm-page-ico">' + pg.icon + '</div>' +
      '<div class="asm-page-title">' + pg.title + '</div>' +
      '</div>';
  });
  html += '</div>';

  html += '<div class="asm-summary-card" style="margin:4px 16px 16px;"><div class="asm-summary-title">Scoring Rubric (10 marks)</div>' +
    ASM_PORTFOLIO_FIELDS.map(function (f) { return '<div class="asm-summary-row"><span class="asm-summary-label">' + f.label + '</span><span class="asm-summary-val">' + f.max + ' marks</span></div>'; }).join('') +
    '</div>';

  html += '<div class="asm-student-toolbar">' +
    '<input class="asm-search-input" placeholder="Search students…" value="' + ASM.search + '" oninput="asmSetSearch(this.value)">' +
    '<button class="asm-icon-btn primary" onclick="openAddStudentModal()"><i class="ti ti-user-plus"></i></button>' +
    '<button class="asm-icon-btn" onclick="document.getElementById(\'asm-import-input\').click()"><i class="ti ti-upload"></i></button>' +
    '</div>';
  html += '<div id="asm-portfolio-students"></div>';

  document.getElementById('assess-portfolio-body').innerHTML = html;
  asmRenderPortfolioStudents();
}

function asmRenderPortfolioStudents() {
  var store = asmCurrentStore();
  var fields = ASM_PORTFOLIO_FIELDS;
  var max = ASM_TYPES.portfolio.marks;
  var list = asmFilteredStudents(store);
  var container = document.getElementById('asm-portfolio-students');
  if (!container) return;
  if (!list.length) {
    container.innerHTML = '<div class="asm-empty"><i class="ti ti-users"></i><div class="asm-empty-h">No students found</div></div>';
    return;
  }
  container.innerHTML = list.map(function (s) {
    var total = asmStudentTypeTotal(s, 'portfolio');
    var expanded = ASM.expandedStudent === s.id;
    var card = '<div class="asm-student-card">' +
      '<div class="asm-student-row-top" style="cursor:pointer;" onclick="asmToggleExpand(\'' + s.id + '\',\'portfolio\')">' +
      '<div class="asm-student-avatar">' + asmInitials(s.name) + '</div>' +
      '<div style="flex:1;min-width:0;"><div class="asm-student-name">' + s.name + '</div><div class="asm-student-roll">Roll ' + s.roll + '</div></div>' +
      '<div class="asm-student-marks-pill" id="eval-pill-' + s.id + '">' + total + '/' + max + '</div>' +
      '<div class="asm-student-actions">' +
      '<button class="asm-mini-btn" onclick="event.stopPropagation();openEditStudentModal(\'' + s.id + '\')"><i class="ti ti-pencil"></i></button>' +
      '<button class="asm-mini-btn danger" onclick="event.stopPropagation();asmDeleteStudent(\'' + s.id + '\')"><i class="ti ti-trash"></i></button>' +
      '<i class="ti ti-chevron-' + (expanded ? 'up' : 'down') + '" style="color:var(--text-muted);"></i>' +
      '</div></div>';
    if (expanded) {
      card += '<div class="asm-rubric-grid">';
      fields.forEach(function (f) {
        var val = Number(s.marks.portfolio[f.key]) || 0;
        card += '<div class="asm-rubric-field"><label>' + f.label + ' (' + f.max + ')</label>' +
          '<input type="number" min="0" max="' + f.max + '" step="0.5" value="' + val + '" oninput="asmUpdateField(\'' + s.id + '\',\'portfolio\',\'' + f.key + '\',this.value,' + f.max + ')"></div>';
      });
      card += '</div><div class="asm-rubric-total-row"><span class="asm-rubric-total" id="eval-total-' + s.id + '">Total: ' + total + ' / ' + max + '</span></div>';
      card += '<input class="asm-remark-input" placeholder="Remark (optional)" value="' + (s.remarks.portfolio || '') + '" oninput="asmUpdateRemark(\'' + s.id + '\',\'portfolio\',this.value)">';
    }
    card += '</div>';
    return card;
  }).join('');
}

function openPageModal(pageNum) {
  var store = asmCurrentStore();
  var pg = ASM_PORTFOLIO_PAGES.find(function (x) { return x.n === pageNum; });
  if (!pg) return;
  _asmEditingPageNum = pageNum;
  var done = !!store.portfolioPagesDone[pageNum];
  document.getElementById('asm-page-modal-title').textContent = 'Page ' + pg.n + ' — ' + pg.title;
  document.getElementById('asm-page-modal-body').innerHTML =
    '<div class="asm-page-prompt">' + pg.icon + ' <b>Instructions for students:</b></div>' +
    '<textarea class="asm-page-textarea" id="asm-page-textarea">' + (store.portfolioPrompts[pageNum] || pg.prompt) + '</textarea>' +
    '<label style="display:flex;align-items:center;gap:8px;margin-top:12px;font-size:13px;font-weight:700;color:var(--text);">' +
    '<input type="checkbox" id="asm-page-done-check" ' + (done ? 'checked' : '') + ' style="width:18px;height:18px;"> Mark this page as introduced to the class</label>';
  document.getElementById('asm-page-modal').classList.add('active');
}
function closePageModal() {
  document.getElementById('asm-page-modal').classList.remove('active');
  _asmEditingPageNum = null;
}
function savePageModal() {
  if (_asmEditingPageNum == null) return;
  var store = asmCurrentStore();
  var text = document.getElementById('asm-page-textarea').value;
  var done = document.getElementById('asm-page-done-check').checked;
  store.portfolioPrompts[_asmEditingPageNum] = text;
  store.portfolioPagesDone[_asmEditingPageNum] = done;
  closePageModal();
  renderPortfolioBody();
  showToast('✅ Page saved');
}


/* ════════════════════════════════════
   EXPORT UTILITIES (real, functional — not mocked)
   ════════════════════════════════════ */
function exportCSV(filename, rows) {
  var csv = rows.map(function (row) {
    return row.map(function (cell) {
      var v = (cell === null || cell === undefined) ? '' : String(cell);
      if (v.indexOf(',') > -1 || v.indexOf('"') > -1 || v.indexOf('\n') > -1) {
        v = '"' + v.replace(/"/g, '""') + '"';
      }
      return v;
    }).join(',');
  }).join('\r\n');
  var blob = new Blob(['\ufeff' + csv], { type: 'text/csv;charset=utf-8;' });
  var url = URL.createObjectURL(blob);
  var a = document.createElement('a');
  a.href = url; a.download = filename;
  document.body.appendChild(a); a.click(); document.body.removeChild(a);
  setTimeout(function () { URL.revokeObjectURL(url); }, 1000);
  showToast('📥 ' + filename + ' downloaded');
}

function exportHTMLAsWord(filename, innerHtml, title) {
  var doc = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:w="urn:schemas-microsoft-com:office:word" xmlns="http://www.w3.org/TR/REC-html40">' +
    '<head><meta charset="utf-8"><title>' + (title || 'Report') + '</title>' +
    '<style>body{font-family:Calibri,Arial,sans-serif;font-size:13px;color:#1f2937;} h1{font-size:20px;color:#2d7d52;} h2{font-size:15px;color:#2d7d52;margin-top:18px;} table{border-collapse:collapse;width:100%;margin-top:8px;} td,th{border:1px solid #ccc;padding:6px 8px;font-size:12px;text-align:left;}</style>' +
    '</head><body>' + innerHtml + '</body></html>';
  var blob = new Blob([doc], { type: 'application/msword' });
  var url = URL.createObjectURL(blob);
  var a = document.createElement('a');
  a.href = url; a.download = filename;
  document.body.appendChild(a); a.click(); document.body.removeChild(a);
  setTimeout(function () { URL.revokeObjectURL(url); }, 1000);
  showToast('📥 ' + filename + ' downloaded');
}

function printHTMLSection(title, innerHtml) {
  var win = window.open('', '_blank', 'width=800,height=900');
  if (!win) { showToast('⚠️ Please allow pop-ups to print/download as PDF'); return; }
  win.document.write('<html><head><meta charset="utf-8"><title>' + title + '</title>' +
    '<style>body{font-family:Arial,sans-serif;color:#1f2937;padding:28px;} h1{font-size:20px;color:#2d7d52;margin-bottom:2px;} h2{font-size:15px;color:#2d7d52;margin-top:22px;border-bottom:2px solid #e8f7ef;padding-bottom:4px;} table{border-collapse:collapse;width:100%;margin-top:8px;} td,th{border:1px solid #ddd;padding:7px 9px;font-size:12.5px;text-align:left;} th{background:#f3f4f6;} .meta{color:#6b7280;font-size:12px;margin-bottom:14px;}</style>' +
    '</head><body>' + innerHtml + '</body></html>');
  win.document.close();
  setTimeout(function () { win.focus(); win.print(); }, 300);
}

function asmDownloadWrittenPDF() { asmPrintWritten(); }
function asmDownloadWrittenWord() {
  var html = asmBuildWrittenPaperHTML();
  exportHTMLAsWord(PROJECT_BANK[ASM.projectId].name.replace(/\s+/g, '_') + '_Written_Paper.doc', html, 'Written Assessment');
}
function asmPrintWritten() {
  var html = asmBuildWrittenPaperHTML();
  printHTMLSection('Written Assessment — ' + PROJECT_BANK[ASM.projectId].name, html);
}
function asmBuildWrittenPaperHTML() {
  var p = PROJECT_BANK[ASM.projectId];
  var store = asmCurrentStore();
  var paper = store.written.paper;
  var html = '<h1>✍️ Written Assessment</h1><div class="meta">Project: ' + p.name + ' &nbsp;|&nbsp; Class ' + ASM.grade + ' &nbsp;|&nbsp; Total Marks: 10</div>';
  html += '<h2>Section A — Fill in the Blanks (' + paper.A.length + ' marks)</h2><ol>' + paper.A.map(function (i) { return '<li>' + i.q + '</li>'; }).join('') + '</ol>';
  html += '<h2>Section B — Multiple Choice Questions (' + paper.B.length + ' marks)</h2><ol>' + paper.B.map(function (i) {
    return '<li>' + i.q + '<br>' + i.opts.map(function (o, oi) { return String.fromCharCode(97 + oi) + ') ' + o + (oi === i.a ? ' ✓' : ''); }).join('&nbsp;&nbsp;') + '</li>';
  }).join('') + '</ol>';
  html += '<h2>Section C — Match the Following (' + (paper.C.length * 0.5) + ' marks)</h2><table><tr><th>Column A</th><th>Column B</th></tr>' +
    paper.C.map(function (i) { return '<tr><td>' + i.l + '</td><td>' + i.r + '</td></tr>'; }).join('') + '</table>';
  html += '<h2>Section D — Short Answer (' + paper.D.length + ' mark)</h2><ol>' + paper.D.map(function (i) { return '<li>' + i.q + '</li>'; }).join('') + '</ol>';
  return html;
}


/* ════════════════════════════════════
   REPORT GENERATION (Individual / Class / Project / Summary)
   ════════════════════════════════════ */
function openReportModal() {
  ASM.reportTab = 'class';
  ASM.reportStudentId = null;
  document.getElementById('asm-report-modal').classList.add('active');
  renderReportBody();
}
function closeReportModal() {
  document.getElementById('asm-report-modal').classList.remove('active');
}
function asmSetReportTab(tab) {
  ASM.reportTab = tab;
  renderReportBody();
}

function asmReportRowsForType(s, type) {
  if (type === 'written') return [{ label: 'Marks Obtained', val: s.marks.written.score + ' / 10' }];
  var fields = asmFieldsFor(type, ASM.projectId);
  return fields.map(function (f) { return { label: f.label, val: (Number(s.marks[type][f.key]) || 0) + ' / ' + f.max }; });
}

function renderReportBody() {
  var p = PROJECT_BANK[ASM.projectId];
  var store = asmCurrentStore();
  var totalMax = ASM_TYPES.written.marks + ASM_TYPES.oral.marks + ASM_TYPES.portfolio.marks + ASM_TYPES.activitybook.marks + ASM_TYPES.observation.marks;

  var html = '<div class="asm-report-tabs">' +
    ['class', 'individual', 'project', 'summary'].map(function (t) {
      var labels = { class: '👥 Class Report', individual: '🧑 Individual', project: '📁 Project Info', summary: '📊 Summary' };
      return '<button class="asm-report-tab ' + (ASM.reportTab === t ? 'active' : '') + '" onclick="asmSetReportTab(\'' + t + '\')">' + labels[t] + '</button>';
    }).join('') + '</div>';

  if (ASM.reportTab === 'class') {
    html += '<div class="asm-action-row" style="padding:0 0 14px;">' +
      '<button class="asm-btn asm-btn-primary" onclick="asmExportClassExcel()"><i class="ti ti-file-spreadsheet"></i> Excel</button>' +
      '<button class="asm-btn asm-btn-outline" onclick="asmExportClassWord()"><i class="ti ti-file-word"></i> Word</button>' +
      '<button class="asm-btn asm-btn-ghost" onclick="asmExportClassPDF()"><i class="ti ti-printer"></i> PDF / Print</button>' +
      '</div>';
    html += store.students.map(function (s) {
      var total = asmStudentGrandTotal(s);
      return '<div class="asm-report-row"><span class="nm">' + s.name + ' <span style="color:var(--text-muted);font-weight:600;">(Roll ' + s.roll + ')</span></span><span class="val">' + total + ' / ' + totalMax + '</span></div>';
    }).join('') || '<div class="asm-empty"><i class="ti ti-users"></i><div class="asm-empty-h">No students yet</div></div>';

  } else if (ASM.reportTab === 'individual') {
    html += '<select class="asm-proj-select" style="width:100%;margin-bottom:14px;" onchange="asmSetReportStudent(this.value)">' +
      '<option value="">Select a student…</option>' +
      store.students.map(function (s) { return '<option value="' + s.id + '" ' + (ASM.reportStudentId === s.id ? 'selected' : '') + '>' + s.name + ' (Roll ' + s.roll + ')</option>'; }).join('') +
      '</select>';
    var sel = store.students.find(function (x) { return x.id === ASM.reportStudentId; });
    if (sel) {
      html += '<div class="asm-action-row" style="padding:0 0 10px;">' +
        '<button class="asm-btn asm-btn-primary" onclick="asmExportIndividualWord()"><i class="ti ti-file-word"></i> Word</button>' +
        '<button class="asm-btn asm-btn-ghost" onclick="asmExportIndividualPDF()"><i class="ti ti-printer"></i> PDF / Print</button>' +
        '</div>';
      Object.keys(ASM_TYPES).forEach(function (type) {
        var t = ASM_TYPES[type];
        html += '<div style="font-weight:800;font-size:12.5px;color:var(--mint-dark);margin:10px 0 2px;">' + t.icon + ' ' + t.label + '</div>';
        html += asmReportRowsForType(sel, type).map(function (r) { return '<div class="asm-report-row"><span class="nm">' + r.label + '</span><span class="val">' + r.val + '</span></div>'; }).join('');
      });
      html += '<div class="asm-report-row" style="margin-top:8px;border-top:2px solid var(--border);"><span class="nm" style="font-weight:800;">Grand Total</span><span class="val">' + asmStudentGrandTotal(sel) + ' / ' + totalMax + '</span></div>';
    } else {
      html += '<div class="asm-empty"><i class="ti ti-user"></i><div class="asm-empty-h">Choose a student above</div></div>';
    }

  } else if (ASM.reportTab === 'project') {
    html += '<div class="asm-report-row"><span class="nm">Project</span><span class="val">' + p.icon + ' ' + p.name + '</span></div>';
    html += '<div class="asm-report-row"><span class="nm">Class</span><span class="val">Class ' + ASM.grade + '</span></div>';
    html += '<div class="asm-report-row"><span class="nm">Students Enrolled</span><span class="val">' + store.students.length + '</span></div>';
    html += '<div style="font-weight:800;font-size:12.5px;color:var(--mint-dark);margin:12px 0 4px;">🧰 Tools</div><div style="font-size:12.5px;color:var(--text);">' + p.tools.join(', ') + '</div>';
    html += '<div style="font-weight:800;font-size:12.5px;color:var(--mint-dark);margin:12px 0 4px;">📦 Materials</div><div style="font-size:12.5px;color:var(--text);">' + p.materials.join(', ') + '</div>';
    html += '<div style="font-weight:800;font-size:12.5px;color:var(--mint-dark);margin:12px 0 4px;">🦺 Safety Precautions</div><div style="font-size:12.5px;color:var(--text);">' + p.safety.join(' · ') + '</div>';
    html += '<div style="font-weight:800;font-size:12.5px;color:var(--mint-dark);margin:12px 0 4px;">📋 Activities</div>' + p.activities.map(function (a) { return '<div class="asm-report-row"><span class="nm">' + a.t + '</span></div>'; }).join('');

  } else if (ASM.reportTab === 'summary') {
    Object.keys(ASM_TYPES).forEach(function (type) {
      var t = ASM_TYPES[type];
      var max = t.marks;
      var sum = 0, doneCount = 0;
      store.students.forEach(function (s) {
        var v = asmStudentTypeTotal(s, type);
        sum += v; if (v > 0) doneCount++;
      });
      var avg = store.students.length ? (sum / store.students.length) : 0;
      html += '<div style="font-weight:800;font-size:12.5px;color:var(--mint-dark);margin:10px 0 2px;">' + t.icon + ' ' + t.label + '</div>';
      html += '<div class="asm-report-row"><span class="nm">Class Average</span><span class="val">' + avg.toFixed(1) + ' / ' + max + '</span></div>';
      html += '<div class="asm-report-row"><span class="nm">Students Assessed</span><span class="val">' + doneCount + ' / ' + store.students.length + '</span></div>';
    });
  }

  document.getElementById('asm-report-body').innerHTML = html;
}

function asmSetReportStudent(id) { ASM.reportStudentId = id; renderReportBody(); }

function asmBuildClassReportHTML() {
  var p = PROJECT_BANK[ASM.projectId];
  var store = asmCurrentStore();
  var totalMax = ASM_TYPES.written.marks + ASM_TYPES.oral.marks + ASM_TYPES.portfolio.marks + ASM_TYPES.activitybook.marks + ASM_TYPES.observation.marks;
  var html = '<h1>📊 Assessment Report — ' + p.name + '</h1><div class="meta">Class ' + ASM.grade + ' &nbsp;|&nbsp; ' + store.students.length + ' students &nbsp;|&nbsp; Generated ' + new Date().toLocaleDateString() + '</div>';
  html += '<table><tr><th>Roll</th><th>Name</th><th>Written (10)</th><th>Oral (30)</th><th>Portfolio (10)</th><th>Activity Book (30)</th><th>Observation (20)</th><th>Total (' + totalMax + ')</th></tr>';
  store.students.forEach(function (s) {
    html += '<tr><td>' + s.roll + '</td><td>' + s.name + '</td><td>' + asmStudentTypeTotal(s, 'written') + '</td><td>' + asmStudentTypeTotal(s, 'oral') + '</td><td>' + asmStudentTypeTotal(s, 'portfolio') + '</td><td>' + asmStudentTypeTotal(s, 'activitybook') + '</td><td>' + asmStudentTypeTotal(s, 'observation') + '</td><td><b>' + asmStudentGrandTotal(s) + '</b></td></tr>';
  });
  html += '</table>';
  return html;
}

function asmExportClassExcel() {
  var store = asmCurrentStore();
  var totalMax = ASM_TYPES.written.marks + ASM_TYPES.oral.marks + ASM_TYPES.portfolio.marks + ASM_TYPES.activitybook.marks + ASM_TYPES.observation.marks;
  var rows = [['Student Name', 'Roll', 'Written (10)', 'Oral (30)', 'Portfolio (10)', 'Activity Book (30)', 'Observation (20)', 'Total (' + totalMax + ')']];
  store.students.forEach(function (s) {
    rows.push([s.name, s.roll, asmStudentTypeTotal(s, 'written'), asmStudentTypeTotal(s, 'oral'), asmStudentTypeTotal(s, 'portfolio'), asmStudentTypeTotal(s, 'activitybook'), asmStudentTypeTotal(s, 'observation'), asmStudentGrandTotal(s)]);
  });
  exportCSV(PROJECT_BANK[ASM.projectId].name.replace(/\s+/g, '_') + '_Class_Report.csv', rows);
}
function asmExportClassWord() {
  exportHTMLAsWord(PROJECT_BANK[ASM.projectId].name.replace(/\s+/g, '_') + '_Class_Report.doc', asmBuildClassReportHTML(), 'Class Report');
}
function asmExportClassPDF() {
  printHTMLSection('Class Report — ' + PROJECT_BANK[ASM.projectId].name, asmBuildClassReportHTML());
}

function asmBuildIndividualReportHTML(s) {
  var p = PROJECT_BANK[ASM.projectId];
  var totalMax = ASM_TYPES.written.marks + ASM_TYPES.oral.marks + ASM_TYPES.portfolio.marks + ASM_TYPES.activitybook.marks + ASM_TYPES.observation.marks;
  var html = '<h1>🧑 Individual Report — ' + s.name + '</h1><div class="meta">Roll ' + s.roll + ' &nbsp;|&nbsp; ' + p.name + ' &nbsp;|&nbsp; Class ' + ASM.grade + '</div>';
  Object.keys(ASM_TYPES).forEach(function (type) {
    var t = ASM_TYPES[type];
    html += '<h2>' + t.icon + ' ' + t.label + '</h2><table>' +
      asmReportRowsForType(s, type).map(function (r) { return '<tr><td>' + r.label + '</td><td>' + r.val + '</td></tr>'; }).join('') + '</table>';
    if (s.remarks[type]) html += '<div style="font-size:12px;color:#555;margin-top:4px;"><i>Remark: ' + s.remarks[type] + '</i></div>';
  });
  html += '<h2>Grand Total: ' + asmStudentGrandTotal(s) + ' / ' + totalMax + '</h2>';
  return html;
}
function asmExportIndividualWord() {
  var store = asmCurrentStore();
  var s = store.students.find(function (x) { return x.id === ASM.reportStudentId; });
  if (!s) { showToast('⚠️ Select a student first'); return; }
  exportHTMLAsWord(s.name.replace(/\s+/g, '_') + '_Report.doc', asmBuildIndividualReportHTML(s), 'Individual Report');
}
function asmExportIndividualPDF() {
  var store = asmCurrentStore();
  var s = store.students.find(function (x) { return x.id === ASM.reportStudentId; });
  if (!s) { showToast('⚠️ Select a student first'); return; }
  printHTMLSection('Individual Report — ' + s.name, asmBuildIndividualReportHTML(s));
}


/* ══════════════════════════════════════════════════════════════════
   KAUSHAL SAATHI — NEW FEATURES MODULE (Additive Only)
   ══════════════════════════════════════════════════════════════════ */

/* ─── NAVIGATION ORDER UPDATE ─── */
/* Updated TH_FEATURES: Home → AI Lesson Plans → Dashboard → Projects → Assessments → Repository → Stories */
TH_FEATURES = [
  { ico:'📅', bg:'var(--mint)',     name:'Today',             meta:'Aaj ka din - आज की कक्षा',   onclick:"openTodayPlan()" },
  { ico:'🧩', bg:'var(--sky)',      name:'AI Lesson Plans',   meta:'NCF-aligned, in seconds',    onclick:"go('s-home')" },
  { ico:'📈', bg:'var(--mint)',     name:'Dashboard',         meta:'Class & personal progress',  onclick:"goDashboard()" },
  { ico:'🧭', bg:'var(--peach)',    name:'Projects',          meta:'Project Navigator',           onclick:"goProjects()" },
  { ico:'📊', bg:'var(--yellow)',   name:'Assessments',       meta:'Competencies & marks',       onclick:"goAssessments()" },
  { ico:'📦', bg:'var(--lavender)', name:'Content Repository',meta:'Images, Videos, PDFs',       onclick:"goRepository()" },
  { ico:'📚', bg:'var(--coral)',    name:'Stories',           meta:'Motivational & skill stories',onclick:"goStories()" },
  { ico:'📁', bg:'var(--sky)',      name:'Portfolio',         meta:'Student learning portfolios', onclick:"goPortfolio()" },
  { ico:'✨', bg:'var(--lavender)', name:'Saathi AI',         meta:'Voice-first companion',       onclick:"openAiChat()" },
];

BOTTOM_NAV = [
  { key:'home',     ico:'ti-home',      label:'Home',       target:'s-teacher-home', onclick:"go('s-teacher-home')" },
  { key:'lessons',  ico:'ti-sparkles',  label:'AI Plans',   target:'s-home',         onclick:"go('s-home')" },
  { key:'projects', ico:'ti-folder',    label:'Projects',   target:'s-projects',     onclick:"goProjects()" },
  { key:'stats',    ico:'ti-chart-bar', label:'Dashboard',  target:'s-dashboard',    onclick:"goDashboard()" },
  { key:'saathi',   ico:'ti-sparkles',  label:'Saathi',     target:'chat',           onclick:"openAiChat()" }
];

/* Re-render with updated nav */
if (document.readyState === 'complete' || document.readyState === 'interactive') {
  renderTeacherHome();
  renderBottomNavs();
}

/* ─── SMOOTH SCROLLING ─── */
(function applySmoothing() {
  var style = document.createElement('style');
  style.textContent = `
    .scrollable, .lesson-scrollable, html, body {
      scroll-behavior: smooth !important;
      -webkit-overflow-scrolling: touch !important;
    }
    .scrollable { overscroll-behavior: contain; }
  `;
  document.head.appendChild(style);
})();

/* ─── UNIVERSAL BACK/FORWARD NAVIGATION ─── */
function addUniversalBackBtn(containerId, backFn, backLabel) {
  var container = document.getElementById(containerId);
  if (!container) return;
  var existing = container.querySelector('.univ-back-row');
  if (existing) return;
  var row = document.createElement('div');
  row.className = 'univ-back-row';
  row.innerHTML = '<button class="univ-back-btn" onclick="' + backFn + '"><i class="ti ti-arrow-left"></i> ' + (backLabel || 'Back') + '</button>';
  container.prepend(row);
}

/* ══════════════════════════════════════════════════════════════════
   FEATURE 1: ACTIVITY CUSTOMIZATION SCREEN
   ══════════════════════════════════════════════════════════════════ */

var customizeState = {
  topicKey: '', projId: '', actId: '',
  periodDuration: 35,
  classSize: 'Medium (20–35)',
  state: '',
  city: '',
  resources: ['Chalk & Board'],
  tools: [],
  internet: false,
  subject: '',
  subjectIntegration: '',
  teachingChallenge: ''
};

function openActivityCustomize(topicKey, projId, actId) {
  var act = DATA[topicKey].projects.find(function(p){ return p.id === projId; }).activities.find(function(a){ return a.id === actId; });
  customizeState.topicKey = topicKey;
  customizeState.projId = projId;
  customizeState.actId = actId;

  document.getElementById('customize-act-name').textContent = (act.icon || '📖') + ' ' + act.name;
  renderCustomizeBody();
  go('s-activity-customize');
}

function renderCustomizeBody() {
  var body = document.getElementById('customize-body');
  if (!body) return;
  var cs = customizeState;

  var resourceOptions = [
    { icon:'✏️', label:'Chalk & Board' },
    { icon:'📽️', label:'Projector' },
    { icon:'📱', label:'Mobile Phone' },
    { icon:'💻', label:'Laptop' },
    { icon:'📺', label:'TV / Screen' },
    { icon:'🖨️', label:'Printer' }
  ];

  var subjectOptions = ['Mathematics','Science','Social Science','Hindi','English','Art & Craft','Physical Education','Environmental Science'];
  var stateOptions = ['Maharashtra','Karnataka','Tamil Nadu','Uttar Pradesh','Rajasthan','Gujarat','Madhya Pradesh','West Bengal','Kerala','Andhra Pradesh','Telangana','Bihar','Odisha','Punjab','Haryana','Assam','Jharkhand','Chhattisgarh','Uttarakhand','Delhi'];

  var html = '<div class="cust-wrap">';
  html += '<div class="cust-title-card"><div class="cust-title">✨ Generate Customized Lesson Plan</div><div class="cust-sub">Personalize your lesson for maximum impact</div></div>';

  /* Row 1: Period + Class Size */
  html += '<div class="adv-row">';
  html += '<div class="adv-field"><label class="adv-label">Period Duration (min)</label><input class="adv-input" type="number" id="cust-period" value="' + cs.periodDuration + '" min="10" max="90" onchange="customizeState.periodDuration=parseInt(this.value)"></div>';
  html += '<div class="adv-field"><label class="adv-label">Class Size</label><select class="adv-input adv-select" id="cust-classsize" onchange="customizeState.classSize=this.value"><option ' + (cs.classSize==='Small (<20)'?'selected':'') + '>Small (&lt;20)</option><option ' + (cs.classSize==='Medium (20–35)'?'selected':'') + '>Medium (20–35)</option><option ' + (cs.classSize==='Large (35+)'?'selected':'') + '>Large (35+)</option></select></div>';
  html += '</div>';

  /* Row 2: State + City */
  html += '<div class="adv-row">';
  html += '<div class="adv-field"><label class="adv-label"><i class="ti ti-map-pin" style="font-size:11px;"></i> State</label><select class="adv-input adv-select" id="cust-state" onchange="customizeState.state=this.value"><option value="">Select state</option>' + stateOptions.map(function(s){ return '<option ' + (cs.state===s?'selected':'') + '>' + s + '</option>'; }).join('') + '</select></div>';
  html += '<div class="adv-field"><label class="adv-label"><i class="ti ti-map-pin" style="font-size:11px;"></i> City / District</label><input class="adv-input" type="text" id="cust-city" placeholder="e.g. Pune" value="' + (cs.city||'') + '" onchange="customizeState.city=this.value"></div>';
  html += '</div>';

  /* Resources */
  html += '<div class="adv-section-title">Available Resources</div>';
  html += '<div class="adv-resources-row">';
  resourceOptions.forEach(function(r) {
    var sel = cs.resources.indexOf(r.label) >= 0;
    html += '<button class="adv-resource-chip ' + (sel?'selected':'') + '" onclick="custToggleResource(this,\'' + r.label + '\')">' + r.icon + ' ' + r.label + '</button>';
  });
  html += '</div>';

  /* Internet Toggle */
  html += '<div class="adv-divider-line"></div>';
  html += '<div class="adv-toggle-row"><span class="adv-toggle-label">Internet Available</span><label class="adv-toggle"><input type="checkbox" id="cust-internet" ' + (cs.internet?'checked':'') + ' onchange="customizeState.internet=this.checked"><span class="adv-toggle-slider"></span></label></div>';
  html += '<div class="adv-divider-line"></div>';

  /* Tools */
  html += '<div class="adv-field" style="margin-bottom:10px;"><label class="adv-label">Available Tools</label>';
  html += '<div class="adv-tools-row"><input class="adv-tools-input" type="text" id="cust-tool-input" placeholder="e.g. scissors, ruler, measuring tape"><button class="adv-add-btn" onclick="custAddTool()">Add</button></div>';
  html += '<div class="adv-tools-tags" id="cust-tools-tags">' + cs.tools.map(function(t,i){ return '<span class="tool-tag">' + t + '<button onclick="custRemoveTool(' + i + ')">×</button></span>'; }).join('') + '</div></div>';

  /* Subject Integration */
  html += '<div class="adv-subject-box"><div class="adv-subject-title">Subject Integration</div><div class="adv-subject-sub">Link this lesson to an academic subject so the AI weaves those connections into activities.</div>';
  html += '<div class="adv-row" style="margin-bottom:10px;">';
  html += '<div class="adv-field"><label class="adv-label">Subject</label><select class="adv-input adv-select" id="cust-subject" onchange="customizeState.subject=this.value"><option value="">Select subject</option>' + subjectOptions.map(function(s){ return '<option ' + (cs.subject===s?'selected':'') + '>' + s + '</option>'; }).join('') + '</select></div>';
  html += '<div class="adv-field"><label class="adv-label">How to integrate</label><input class="adv-input" type="text" id="cust-integrate" placeholder="e.g. fractions in recipe ratios" value="' + (cs.subjectIntegration||'') + '" onchange="customizeState.subjectIntegration=this.value"></div>';
  html += '</div></div>';

  /* Teaching Challenge */
  html += '<div class="adv-field" style="margin-bottom:16px;"><label class="adv-label">Teaching Challenge / Notes <span style="font-weight:500;opacity:.7;">(optional)</span></label>';
  html += '<textarea class="adv-textarea" id="cust-challenge" placeholder="e.g. Students struggle with tool identification..." onchange="customizeState.teachingChallenge=this.value">' + (cs.teachingChallenge||'') + '</textarea></div>';

  /* Generate Button */
  html += '<button class="cust-generate-btn" onclick="custGenerateLessonPlan()"><i class="ti ti-sparkles"></i> Generate Lesson Plan with AI</button>';
  html += '</div>';
  body.innerHTML = html;
}

function custToggleResource(btn, label) {
  var idx = customizeState.resources.indexOf(label);
  if (idx >= 0) customizeState.resources.splice(idx, 1);
  else customizeState.resources.push(label);
  btn.classList.toggle('selected');
}

function custAddTool() {
  var inp = document.getElementById('cust-tool-input');
  if (!inp || !inp.value.trim()) return;
  customizeState.tools.push(inp.value.trim());
  inp.value = '';
  var tags = document.getElementById('cust-tools-tags');
  if (tags) tags.innerHTML = customizeState.tools.map(function(t,i){ return '<span class="tool-tag">' + t + '<button onclick="custRemoveTool(' + i + ')">×</button></span>'; }).join('');
}

function custRemoveTool(i) {
  customizeState.tools.splice(i, 1);
  renderCustomizeBody();
}

function custGenerateLessonPlan() {
  /* Merge customizeState into advancedOptions then fire the lesson */
  var cs = customizeState;
  state.advancedOptions = {
    periodDuration: cs.periodDuration,
    classSize: cs.classSize,
    state: cs.state,
    city: cs.city,
    resources: cs.resources.slice(),
    tools: cs.tools.slice(),
    internet: cs.internet,
    subject: cs.subject,
    subjectIntegration: cs.subjectIntegration,
    teachingChallenge: cs.teachingChallenge
  };
  showToast('⚙️ Applying customizations...');
  igniteInteractiveLesson(cs.topicKey, cs.projId, cs.actId);
}

/* ──── PATCH selectProject to intercept activity clicks ──── */
var _origSelectProject = selectProject;
selectProject = function(topicKey, projId) {
  _origSelectProject(topicKey, projId);
};

/* Patch activities list to open customize screen first */
var _origIgniteInteractiveLesson = igniteInteractiveLesson;

/* We override selectProject to inject customization for activity clicks */
function openActivityWithCustomize(topicKey, projId, actId) {
  customizeState.topicKey = topicKey;
  customizeState.projId = projId;
  customizeState.actId = actId;
  /* Sync with current advancedOptions */
  var ao = state.advancedOptions;
  customizeState.periodDuration = ao.periodDuration || 35;
  customizeState.classSize = ao.classSize || 'Medium (20–35)';
  customizeState.state = ao.state || '';
  customizeState.city = ao.city || '';
  customizeState.resources = (ao.resources || ['Chalk & Board']).slice();
  customizeState.tools = (ao.tools || []).slice();
  customizeState.internet = ao.internet || false;
  customizeState.subject = ao.subject || '';
  customizeState.subjectIntegration = ao.subjectIntegration || '';
  customizeState.teachingChallenge = ao.teachingChallenge || '';

  var act = DATA[topicKey].projects.find(function(p){ return p.id === projId; }).activities.find(function(a){ return a.id === actId; });
  document.getElementById('customize-act-name').textContent = (act.icon || '📖') + ' ' + act.name;
  renderCustomizeBody();
  go('s-activity-customize');
}

/* Repatch selectProject so activity rows call openActivityWithCustomize */
selectProject = function(topicKey, projId) {
  var d = DATA[topicKey];
  var proj = d.projects.find(function(p) { return p.id === projId; });
  state.project = proj;
  state.topic = topicKey;

  document.getElementById('act-status-tag').textContent = d.icon + ' ' + proj.name;
  document.getElementById('acts-back-label').textContent = d.label;

  var hdr = document.getElementById('act-header');
  hdr.innerHTML = '<div style="font-size:17px;font-weight:800;color:' + d.headerText + ';">' + proj.name + '</div><div style="font-size:12px;color:' + d.headerText + ';opacity:0.7;margin-top:2px;">📅 ' + proj.periods + ' total periods · ' + proj.activities.length + ' activities</div>';
  hdr.style.background = d.headerBg;

  var list = document.getElementById('activities-list');
  list.innerHTML = '<div style="margin:8px 16px;padding:10px 14px;background:var(--yellow);border-radius:10px;font-size:11px;font-weight:700;border:1px solid var(--yellow-mid);display:flex;align-items:center;gap:6px;">⚡ Tap any activity to generate a customized lesson plan</div>';

  proj.activities.forEach(function(act) {
    var completed = state.completedSteps[act.id] ? '✅' : '';
    list.innerHTML += '<div class="act-row" onclick="openActivityWithCustomize(\'' + topicKey + '\', \'' + projId + '\', \'' + act.id + '\')">'
      + '<div class="act-num" style="background:' + d.headerBg + ';color:' + d.headerText + ';">' + act.icon + '</div>'
      + '<div class="act-info">'
      + '<div class="act-name">' + act.name + ' ' + completed + '</div>'
      + '<div class="act-meta">' + act.periods + ' Period' + (act.periods > 1 ? 's' : '') + ' · ' + act.lo.slice(0,3).join(', ') + (act.lo.length > 3 ? '…' : '') + '</div>'
      + '</div>'
      + '<span class="act-periods" style="background:' + d.headerBg + ';color:' + d.headerText + ';">' + act.periods + 'P</span>'
      + '</div>';
  });
  go('s-activities');
};

/* ══════════════════════════════════════════════════════════════════
   FEATURE 2: NCERT BOOK QUESTIONS VIEWER
   ══════════════════════════════════════════════════════════════════ */

var bookQuestions = {
  10: [
    { type: 'short',  question: 'Were all the plants planted at the same time? If not, why?' },
    { type: 'yesno',  question: 'Can all the plants be grown in a kitchen garden? Yes/No' },
    { type: 'long',   question: 'How is the soil prepared for sowing or planting?' },
    { type: 'long',   question: 'How are the plants provided nutrition in addition to what they get from the soil?' },
    { type: 'long',   question: 'How can plants be protected from any kind of harm from animals and pests?' }
  ],
  11: [
    { type: 'short',  question: 'What tools are used in a kitchen garden?' },
    { type: 'yesno',  question: 'Is composting important for a kitchen garden? Yes/No' },
    { type: 'long',   question: 'Describe the steps to prepare compost at home.' }
  ],
  12: [
    { type: 'short',  question: 'Name any three vegetables that can be grown in a small space.' },
    { type: 'long',   question: 'How does a kitchen garden help in reducing food waste?' },
    { type: 'long',   question: 'What is the importance of watering plants regularly?' }
  ],
  128: [
    { type: 'short',  question: 'What is a recipe? Name its three main components.' },
    { type: 'yesno',  question: 'Is it important to read a recipe completely before starting to cook? Yes/No' },
    { type: 'long',   question: 'What are the three methods of food preparation mentioned in your textbook?' }
  ],
  132: [
    { type: 'short',  question: 'List the ingredients needed for making Koshimbir.' },
    { type: 'long',   question: 'Describe the step-by-step method for preparing Koshimbir.' },
    { type: 'long',   question: 'How does cooking without fire help preserve the nutrition in food?' }
  ]
};

function openBookQuestions(actId) {
  var act = state.activity;
  document.getElementById('bq-act-name').textContent = (act ? act.name : 'Questions');
  renderBookQuestionsBody(10); /* default page */
  go('s-book-questions');
}

function renderBookQuestionsBody(pageNum) {
  var body = document.getElementById('bq-body');
  if (!body) return;
  var qs = bookQuestions[pageNum] || [];

  var html = '<div class="bq-wrap">';
  html += '<div class="bq-header-card">';
  html += '<div class="bq-header-title">📖 NCERT Activity Book Questions</div>';
  html += '<div class="bq-header-sub">Kaushal Bodh — Grade 6</div>';
  html += '<div class="bq-page-row">';
  html += '<label class="adv-label" style="margin:0;">Go to page:</label>';
  html += '<input class="adv-input" type="number" id="bq-page-input" value="' + pageNum + '" min="1" style="width:80px;margin:0 8px;">';
  html += '<button class="adv-add-btn" onclick="renderBookQuestionsBody(parseInt(document.getElementById(\'bq-page-input\').value)||10)">View</button>';
  html += '</div>';
  html += '<div class="bq-quick-pages">';
  [10,11,12,128,132].forEach(function(p) {
    html += '<button class="bq-page-chip ' + (p===pageNum?'active':'') + '" onclick="renderBookQuestionsBody(' + p + ')">Pg ' + p + '</button>';
  });
  html += '</div></div>';

  if (!qs.length) {
    html += '<div class="bq-empty"><i class="ti ti-book-off" style="font-size:32px;"></i><div>No questions found for page ' + pageNum + '</div><div style="font-size:11px;color:var(--text-muted);">Try pages 10, 11, 12, 128 or 132</div></div>';
  } else {
    html += '<div class="bq-page-label">Page ' + pageNum + ' &nbsp;·&nbsp; Kaushal Bodh — Grade 6</div>';
    qs.forEach(function(q, idx) {
      html += '<div class="bq-question-card">';
      html += '<div class="bq-q-num">' + (idx + 1) + '.</div>';
      html += '<div class="bq-q-body">';
      html += '<div class="bq-q-text">' + q.question + '</div>';
      html += '<div class="bq-answer-lines"><div class="bq-line"></div><div class="bq-line"></div><div class="bq-line"></div></div>';
      html += '</div></div>';
    });
  }

  html += '<div class="bq-actions">';
  html += '<button class="bq-action-btn" onclick="downloadBookWorksheet(' + pageNum + ')"><i class="ti ti-download"></i> Download Worksheet PDF</button>';
  html += '<button class="bq-action-btn bq-print-btn" onclick="printBookWorksheet(' + pageNum + ')"><i class="ti ti-printer"></i> Print Worksheet</button>';
  html += '</div>';
  html += '</div>';
  body.innerHTML = html;
}

function downloadBookWorksheet(page) {
  showToast('📥 Downloading worksheet for page ' + page + '...');
}
function printBookWorksheet(page) {
  showToast('🖨️ Printing worksheet for page ' + page + '...');
}

/* Add Book Questions tab to lesson view */
var _coreRenderTab2 = renderTab;
renderTab = function(act, tab) {
  if (tab === 'Book Questions') {
    openBookQuestions(act.id);
    return '<div style="padding:20px;text-align:center;color:var(--text-muted);">Opening Book Questions...</div>';
  }
  return _coreRenderTab2(act, tab);
};

/* Patch igniteInteractiveLesson to add Book Questions tab */
var _origIgnite2 = igniteInteractiveLesson;
igniteInteractiveLesson = function(topicKey, projId, actId) {
  _origIgnite2(topicKey, projId, actId);
  /* Add Book Questions tab if not present */
  var tabs = document.getElementById('lesson-tabs');
  if (tabs && !tabs.querySelector('[data-tab="Book Questions"]')) {
    var btn = document.createElement('button');
    btn.className = 'tab-btn';
    btn.setAttribute('data-tab', 'Book Questions');
    btn.textContent = '📖 Book Q&A';
    btn.onclick = function() { openBookQuestions(actId); };
    tabs.appendChild(btn);
  }
};

/* ══════════════════════════════════════════════════════════════════
   FEATURE 6: ASSESSMENT TEMPLATES (additive section)
   ══════════════════════════════════════════════════════════════════ */

var ASSESSMENT_TEMPLATES = [
  {
    id: 'teacher-observation',
    title: 'Teacher Observation Sheet',
    icon: '👁️',
    color: 'mint',
    fields: [
      { label: 'Student Name', type: 'text', lines: 1 },
      { label: 'Roll No', type: 'text', lines: 1 },
      { label: 'Class', type: 'text', lines: 1 },
      { label: 'Activity Name', type: 'text', lines: 1 },
      { label: 'Skills Observed', type: 'textarea', lines: 3 },
      { label: 'Marks', type: 'number', lines: 1 },
      { label: 'Remarks', type: 'textarea', lines: 2 },
      { label: 'Signature', type: 'text', lines: 1 }
    ]
  },
  {
    id: 'practical-assessment',
    title: 'Practical Assessment Sheet',
    icon: '⚙️',
    color: 'peach',
    fields: [
      { label: 'Criteria', type: 'textarea', lines: 2 },
      { label: 'Maximum Marks', type: 'number', lines: 1 },
      { label: 'Obtained Marks', type: 'number', lines: 1 },
      { label: 'Remarks', type: 'textarea', lines: 2 }
    ]
  },
  {
    id: 'project-rubric',
    title: 'Project Rubric',
    icon: '📋',
    color: 'lavender',
    criteria: ['Creativity', 'Participation', 'Accuracy', 'Teamwork', 'Presentation']
  }
];

function goAssessTemplates() {
  renderAssessTemplatesBody();
  go('s-assess-templates');
}

function renderAssessTemplatesBody() {
  var body = document.getElementById('assess-templates-body');
  if (!body) return;

  var html = '<div style="padding:16px;">';
  html += '<div class="asm-intro"><div class="asm-intro-h">📋 Download Assessment Templates</div>';
  html += '<div class="asm-intro-sub">Ready-to-use printable assessment sheets for teacher observation, practical evaluation, and project rubrics.</div></div>';

  ASSESSMENT_TEMPLATES.forEach(function(tpl) {
    html += '<div class="tpl-card" style="margin-bottom:16px;background:#fff;border:1.5px solid var(--border);border-radius:14px;overflow:hidden;">';
    html += '<div class="tpl-card-header" style="background:var(--' + tpl.color + ');padding:14px 16px;display:flex;align-items:center;gap:10px;">';
    html += '<span style="font-size:22px;">' + tpl.icon + '</span>';
    html += '<div style="font-size:15px;font-weight:800;color:var(--' + tpl.color + '-dark);">' + tpl.title + '</div></div>';
    html += '<div style="padding:14px 16px;">';

    if (tpl.fields) {
      tpl.fields.forEach(function(f) {
        html += '<div style="margin-bottom:8px;">';
        html += '<div style="font-size:11px;font-weight:800;color:var(--text-muted);margin-bottom:3px;">' + f.label + '</div>';
        if (f.lines === 1) {
          html += '<div style="border-bottom:1.5px solid var(--border);height:24px;"></div>';
        } else {
          for (var i = 0; i < f.lines; i++) {
            html += '<div style="border-bottom:1.5px dotted var(--border);height:22px;margin-bottom:2px;"></div>';
          }
        }
        html += '</div>';
      });
    } else if (tpl.criteria) {
      html += '<table style="width:100%;border-collapse:collapse;font-size:12px;">';
      html += '<tr style="background:var(--' + tpl.color + ');"><th style="padding:6px 8px;text-align:left;font-weight:800;">Criteria</th><th style="padding:6px 8px;text-align:center;">1</th><th style="padding:6px 8px;text-align:center;">2</th><th style="padding:6px 8px;text-align:center;">3</th><th style="padding:6px 8px;text-align:center;">4</th><th style="padding:6px 8px;text-align:center;">5</th></tr>';
      tpl.criteria.forEach(function(c, i) {
        html += '<tr style="background:' + (i%2===0?'#fff':'var(--' + tpl.color + ')') + ';">';
        html += '<td style="padding:7px 8px;font-weight:700;">' + c + '</td>';
        for (var j = 1; j <= 5; j++) html += '<td style="padding:7px 8px;text-align:center;">☐</td>';
        html += '</tr>';
      });
      html += '</table>';
    }

    html += '<div style="display:flex;gap:8px;margin-top:12px;">';
    html += '<button class="adv-add-btn" style="flex:1;background:var(--mint-dark);border-color:var(--mint-dark);color:#fff;" onclick="previewTemplate(\'' + tpl.id + '\')"><i class="ti ti-eye"></i> Preview</button>';
    html += '<button class="adv-add-btn" style="flex:1;" onclick="downloadTemplate(\'' + tpl.id + '\')"><i class="ti ti-download"></i> Download PDF</button>';
    html += '<button class="adv-add-btn" style="flex:1;" onclick="printTemplate(\'' + tpl.id + '\')"><i class="ti ti-printer"></i> Print</button>';
    html += '</div></div></div>';
  });

  html += '</div>';
  body.innerHTML = html;
}

function previewTemplate(id) { showToast('👁️ Preview opening...'); }
function downloadTemplate(id) { showToast('📥 Downloading template...'); }
function printTemplate(id) { showToast('🖨️ Printing template...'); }

/* Inject Templates section into existing assessment select screen */
var _origRenderAssessSelect = renderAssessSelect;
renderAssessSelect = function() {
  _origRenderAssessSelect();
  var body = document.getElementById('assess-select-body');
  if (!body) return;
  var tplBtn = document.createElement('div');
  tplBtn.style.cssText = 'padding:0 16px 16px;';
  tplBtn.innerHTML = '<button onclick="goAssessTemplates()" style="width:100%;padding:14px;background:var(--lavender);border:1.5px solid var(--lavender-mid);border-radius:12px;font-size:13px;font-weight:800;color:var(--lavender-dark);display:flex;align-items:center;justify-content:center;gap:8px;cursor:pointer;"><i class="ti ti-file-download"></i> Download Assessment Templates</button>';
  body.appendChild(tplBtn);
};

/* ══════════════════════════════════════════════════════════════════
   FEATURE 7: PORTFOLIO SECTION
   ══════════════════════════════════════════════════════════════════ */

var portfolioTemplates = [
  {
    id: 'cooking-fire',
    title: 'Cooking Without Fire Portfolio',
    grade: '6',
    icon: '🍅',
    color: '#ff6b35',
    sections: [
      { icon: '🙋', title: 'About Me', desc: 'Personal details, favourite food, cooking heroes' },
      { icon: '🍳', title: 'My Cooking Journey', desc: 'Why I chose this project, what I expected' },
      { icon: '📖', title: 'Recipes', desc: 'My recipe card, ingredients & steps' },
      { icon: '🔪', title: 'Tools & Safety', desc: 'Tools I used, safety rules I followed' },
      { icon: '📸', title: 'My Dishes', desc: 'Photos/drawings of my finished dishes' },
      { icon: '🌱', title: 'Going Green', desc: 'Waste management, 3Rs pledge' },
      { icon: '💬', title: 'Reflection', desc: 'What I learned, challenges, future plans' },
      { icon: '🏆', title: 'Teacher Feedback', desc: 'Observation checklist, teacher signature' }
    ]
  }
];

function goPortfolio() {
  renderPortfolioPage();
  go('s-portfolio');
}

function renderPortfolioPage() {
  var body = document.getElementById('portfolio-body');
  if (!body) return;

  var html = '<div style="padding:16px;">';
  html += '<div class="asm-intro"><div class="asm-intro-h">📁 Portfolio Templates</div>';
  html += '<div class="asm-intro-sub">Student-friendly portfolio templates aligned with NCERT Kaushal Bodh projects.</div></div>';

  portfolioTemplates.forEach(function(tpl) {
    html += '<div style="background:#fff;border:2px solid #ff6b3522;border-radius:16px;overflow:hidden;margin-bottom:20px;">';
    /* Header */
    html += '<div style="background:linear-gradient(135deg,' + tpl.color + ',#ff8c5a);padding:20px 16px;color:#fff;">';
    html += '<div style="font-size:28px;margin-bottom:4px;">' + tpl.icon + '</div>';
    html += '<div style="font-size:17px;font-weight:900;">' + tpl.title + '</div>';
    html += '<div style="font-size:12px;opacity:.85;margin-top:2px;">Kaushal Bodh · Grade ' + tpl.grade + ' · Vocational Education</div>';
    html += '</div>';
    /* Sections */
    html += '<div style="padding:14px 16px;">';
    html += '<div style="font-size:12px;font-weight:800;color:var(--text-muted);margin-bottom:10px;">WHAT\'S INSIDE THIS PORTFOLIO</div>';
    html += '<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:14px;">';
    tpl.sections.forEach(function(sec) {
      html += '<div style="background:#fff7f3;border:1.5px solid #ff6b3522;border-radius:10px;padding:10px;">';
      html += '<div style="font-size:18px;margin-bottom:3px;">' + sec.icon + '</div>';
      html += '<div style="font-size:11px;font-weight:800;color:#c04020;">' + sec.title + '</div>';
      html += '<div style="font-size:10px;color:var(--text-muted);margin-top:2px;line-height:1.3;">' + sec.desc + '</div>';
      html += '</div>';
    });
    html += '</div>';
    /* Actions */
    html += '<div style="display:flex;gap:8px;">';
    html += '<button style="flex:1;padding:12px;background:#ff6b35;border:none;border-radius:10px;color:#fff;font-size:12px;font-weight:800;cursor:pointer;" onclick="previewPortfolio(\'' + tpl.id + '\')"><i class="ti ti-eye"></i> Preview</button>';
    html += '<button style="flex:1;padding:12px;background:#fff;border:2px solid #ff6b35;border-radius:10px;color:#ff6b35;font-size:12px;font-weight:800;cursor:pointer;" onclick="downloadPortfolio(\'' + tpl.id + '\')"><i class="ti ti-download"></i> Download</button>';
    html += '<button style="flex:1;padding:12px;background:#fff;border:2px solid #ff6b35;border-radius:10px;color:#ff6b35;font-size:12px;font-weight:800;cursor:pointer;" onclick="printPortfolio(\'' + tpl.id + '\')"><i class="ti ti-printer"></i> Print</button>';
    html += '</div></div></div>';
  });
  html += '</div>';
  body.innerHTML = html;
  renderBottomNavs();
}

function previewPortfolio(id) { showToast('👁️ Portfolio preview loading...'); }
function downloadPortfolio(id) { showToast('📥 Downloading portfolio template...'); }
function printPortfolio(id) { showToast('🖨️ Printing portfolio...'); }

/* ══════════════════════════════════════════════════════════════════
   FEATURE 8: CONTENT REPOSITORY
   ══════════════════════════════════════════════════════════════════ */

var REPO_CATEGORIES = [
  { id: 'images',       icon: '🖼️',  label: 'Images',       count: 24, color: 'mint' },
  { id: 'videos',       icon: '🎬',  label: 'Videos',       count: 12, color: 'peach' },
  { id: 'ppts',         icon: '📊',  label: 'PPTs',         count: 18, color: 'lavender' },
  { id: 'worksheets',   icon: '📝',  label: 'Worksheets',   count: 31, color: 'sky' },
  { id: 'pdfs',         icon: '📄',  label: 'PDFs',         count: 27, color: 'yellow' },
  { id: 'activity-cards', icon: '🃏', label: 'Activity Cards', count: 15, color: 'coral' },
  { id: 'teacher-guides', icon: '📚', label: 'Teacher Guides', count: 9, color: 'mint' }
];

var REPO_SAMPLE_ITEMS = {
  images: [
    { name: 'Kitchen Tools Poster', size: '320 KB', tags: ['cooking','tools'] },
    { name: 'Safety Signs Set', size: '480 KB', tags: ['safety'] },
    { name: 'Seasonal Vegetables Chart', size: '256 KB', tags: ['vegetables','seasons'] }
  ],
  worksheets: [
    { name: 'Measurement Practice Sheet', size: '140 KB', tags: ['math','measurement'] },
    { name: 'Recipe Reading Worksheet', size: '180 KB', tags: ['literacy','reading'] },
    { name: 'Kitchen Safety Checklist', size: '95 KB', tags: ['safety'] }
  ],
  pdfs: [
    { name: 'Kaushal Bodh Grade 6 Guide', size: '2.1 MB', tags: ['guide','grade6'] },
    { name: 'NEP 2020 Vocational Overview', size: '980 KB', tags: ['NEP','policy'] }
  ],
  videos: [
    { name: 'WHO Handwashing Demo', size: '14 MB', tags: ['safety','hygiene'] },
    { name: 'Lemon Squeezing Technique', size: '8 MB', tags: ['cooking','technique'] }
  ]
};

var repoState = { activeCategory: 'images', search: '' };

function goRepository() {
  renderRepositoryBody();
  go('s-repository');
}

function renderRepositoryBody() {
  var body = document.getElementById('repository-body');
  if (!body) return;

  var cat = repoState.activeCategory;
  var items = REPO_SAMPLE_ITEMS[cat] || [];
  var search = repoState.search.toLowerCase();
  if (search) items = items.filter(function(i){ return i.name.toLowerCase().includes(search); });

  var html = '<div style="padding:16px;">';
  /* Search */
  html += '<div style="display:flex;gap:8px;margin-bottom:14px;">';
  html += '<input class="adv-input" type="text" id="repo-search" placeholder="Search resources..." value="' + (repoState.search||'') + '" style="flex:1;" oninput="repoState.search=this.value;renderRepositoryBody()">';
  html += '</div>';

  /* Categories */
  html += '<div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:16px;">';
  REPO_CATEGORIES.forEach(function(c) {
    html += '<button class="chip chip-' + c.color + '" style="font-size:12px;padding:5px 12px;border:1.5px solid;cursor:pointer;' + (c.id===cat?'font-weight:900;':'') + '" onclick="repoState.activeCategory=\'' + c.id + '\';repoState.search=\'\';renderRepositoryBody()">' + c.icon + ' ' + c.label + ' <span style="opacity:.7;">(' + c.count + ')</span></button>';
  });
  html += '</div>';

  /* Items */
  if (!items.length) {
    html += '<div style="text-align:center;padding:40px;color:var(--text-muted);"><i class="ti ti-search-off" style="font-size:32px;"></i><div style="margin-top:8px;">No items found</div></div>';
  } else {
    html += '<div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;">';
    items.forEach(function(item) {
      var curCat = REPO_CATEGORIES.find(function(c){ return c.id===cat; });
      html += '<div style="background:#fff;border:1.5px solid var(--border);border-radius:12px;padding:12px;">';
      html += '<div style="font-size:24px;margin-bottom:6px;">' + (curCat?curCat.icon:'📄') + '</div>';
      html += '<div style="font-size:12px;font-weight:800;color:var(--text);line-height:1.3;margin-bottom:4px;">' + item.name + '</div>';
      html += '<div style="font-size:10px;color:var(--text-muted);margin-bottom:8px;">' + item.size + '</div>';
      html += '<div style="display:flex;gap:4px;flex-wrap:wrap;margin-bottom:8px;">' + item.tags.map(function(t){ return '<span class="chip chip-sky" style="font-size:9px;padding:2px 6px;">' + t + '</span>'; }).join('') + '</div>';
      html += '<div style="display:flex;gap:6px;">';
      html += '<button style="flex:1;padding:6px;background:var(--mint);border:none;border-radius:7px;font-size:10px;font-weight:800;color:var(--mint-dark);cursor:pointer;" onclick="showToast(\'👁️ Preview loading...\')">Preview</button>';
      html += '<button style="flex:1;padding:6px;background:var(--sky);border:none;border-radius:7px;font-size:10px;font-weight:800;color:var(--sky-dark);cursor:pointer;" onclick="showToast(\'📥 Downloading...\')"><i class="ti ti-download"></i> Download</button>';
      html += '</div></div>';
    });
    html += '</div>';
    if (items.length < REPO_CATEGORIES.find(function(c){ return c.id===cat; }).count) {
      html += '<div style="text-align:center;padding:16px 0;color:var(--text-muted);font-size:12px;">+ More items available via API integration</div>';
    }
  }
  html += '</div>';
  body.innerHTML = html;
  renderBottomNavs();
}

/* ══════════════════════════════════════════════════════════════════
   FEATURE 9: STORIES MODULE
   ══════════════════════════════════════════════════════════════════ */

var STORIES_DATA = [
  {
    id: 's1', category: 'motivational',
    title: 'The Little Chef Who Changed Her Village',
    image: '👩‍🍳', duration: '5 min read', grade: '6-7',
    preview: 'Meena was just 12 when she started her fireless cooking stall at the school mela. Within a month, three other villages invited her to teach...'
  },
  {
    id: 's2', category: 'skill',
    title: 'From Seeds to Success: Raju\'s Kitchen Garden',
    image: '🌱', duration: '7 min read', grade: '6-8',
    preview: 'Raju never thought plants could grow in his tiny backyard. With just 4×4 ft and determination, he now supplies vegetables to his entire street...'
  },
  {
    id: 's3', category: 'entrepreneurship',
    title: 'The Herbal Soap Maker',
    image: '🧼', duration: '6 min read', grade: '7-8',
    preview: 'At 14, Anjali turned her school project into a small business earning ₹3,000 a month by selling herbal soaps at local markets...'
  },
  {
    id: 's4', category: 'local',
    title: 'Craftswomen of Pratapgarh',
    image: '🏺', duration: '4 min read', grade: '6-8',
    preview: 'The women of Pratapgarh have been making traditional pottery for generations. Meet Kanta Devi, who teaches her skill to school children every Saturday...'
  },
  {
    id: 's5', category: 'motivational',
    title: 'One Measurement Changed Everything',
    image: '📏', duration: '3 min read', grade: '6',
    preview: 'Rahul was failing maths until his teacher connected fractions to cooking measurements. That one lesson made him top his class...'
  },
  {
    id: 's6', category: 'skill',
    title: 'Safety First: How Priya Saved the Day',
    image: '🛡️', duration: '4 min read', grade: '6-7',
    preview: 'When a classmate cut herself during activity, Priya\'s knowledge of kitchen safety meant the difference between panic and calm response...'
  }
];

var STORY_CATS = [
  { id: 'all',              label: 'All',           icon: '📚' },
  { id: 'motivational',     label: 'Motivational',  icon: '⭐' },
  { id: 'skill',            label: 'Skill Stories', icon: '🔧' },
  { id: 'entrepreneurship', label: 'Entrepreneurship', icon: '💼' },
  { id: 'local',            label: 'Local Success', icon: '🏘️' }
];

var storiesState = { activeCategory: 'all' };

function goStories() {
  renderStoriesBody();
  go('s-stories');
}

function renderStoriesBody() {
  var body = document.getElementById('stories-body');
  if (!body) return;

  var cat = storiesState.activeCategory;
  var items = cat === 'all' ? STORIES_DATA : STORIES_DATA.filter(function(s){ return s.category === cat; });

  var html = '<div style="padding:16px;">';
  html += '<div class="asm-intro"><div class="asm-intro-h">📚 Stories</div><div class="asm-intro-sub">Inspiring stories of skill, entrepreneurship and local heroes for classroom motivation.</div></div>';

  /* Category filter */
  html += '<div style="display:flex;gap:6px;flex-wrap:wrap;margin-bottom:16px;">';
  STORY_CATS.forEach(function(c) {
    html += '<button class="chip ' + (c.id===cat?'chip-mint':'chip-lavender') + '" style="font-size:11px;cursor:pointer;' + (c.id===cat?'font-weight:900;':'') + '" onclick="storiesState.activeCategory=\'' + c.id + '\';renderStoriesBody()">' + c.icon + ' ' + c.label + '</button>';
  });
  html += '</div>';

  /* Story cards */
  items.forEach(function(s) {
    html += '<div style="background:#fff;border:1.5px solid var(--border);border-radius:14px;margin-bottom:14px;overflow:hidden;">';
    html += '<div style="padding:16px;">';
    html += '<div style="display:flex;gap:12px;align-items:flex-start;">';
    html += '<div style="font-size:40px;flex-shrink:0;">' + s.image + '</div>';
    html += '<div style="flex:1;">';
    html += '<div style="font-size:14px;font-weight:800;color:var(--text);line-height:1.3;margin-bottom:4px;">' + s.title + '</div>';
    html += '<div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:8px;">';
    html += '<span class="chip chip-mint" style="font-size:10px;"><i class="ti ti-clock" style="font-size:9px;"></i> ' + s.duration + '</span>';
    html += '<span class="chip chip-peach" style="font-size:10px;"><i class="ti ti-school" style="font-size:9px;"></i> Grade ' + s.grade + '</span>';
    var catLabel = STORY_CATS.find(function(c){ return c.id===s.category; });
    if (catLabel) html += '<span class="chip chip-lavender" style="font-size:10px;">' + catLabel.icon + ' ' + catLabel.label + '</span>';
    html += '</div>';
    html += '<div style="font-size:12px;color:var(--text-muted);line-height:1.5;">' + s.preview + '</div>';
    html += '</div></div>';
    html += '<button style="width:100%;margin-top:12px;padding:10px;background:var(--mint);border:none;border-radius:10px;font-size:12px;font-weight:800;color:var(--mint-dark);cursor:pointer;" onclick="readStory(\'' + s.id + '\')">Read Full Story →</button>';
    html += '</div></div>';
  });

  html += '<div style="text-align:center;padding:16px 0;color:var(--text-muted);font-size:12px;">✨ AI-generated stories coming soon</div>';
  html += '</div>';
  body.innerHTML = html;
  renderBottomNavs();
}

function readStory(id) {
  var s = STORIES_DATA.find(function(x){ return x.id===id; });
  if (!s) return;
  showToast('📖 Opening: ' + s.title);
}

/* ══════════════════════════════════════════════════════════════════
   CSS ADDITIONS (injected via JS to keep CSS file stable)
   ══════════════════════════════════════════════════════════════════ */
(function injectNewStyles() {
  var css = `
/* ── Activity Customization ── */
.cust-wrap { padding:16px; }
.cust-title-card { background:linear-gradient(135deg,var(--mint),var(--sky));border-radius:14px;padding:16px;margin-bottom:18px;text-align:center; }
.cust-title { font-size:16px;font-weight:900;color:var(--mint-dark); }
.cust-sub { font-size:12px;color:var(--sky-dark);margin-top:4px; }
.cust-generate-btn { width:100%;padding:16px;background:var(--coral-dark);border:none;border-radius:12px;color:#fff;font-size:15px;font-weight:800;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:8px;margin-top:8px; }
.adv-divider-line { height:1px;background:var(--border);margin:12px 0; }
.tool-tag { background:var(--mint);color:var(--mint-dark);padding:4px 10px;border-radius:20px;font-size:11px;font-weight:700;display:inline-flex;align-items:center;gap:4px;margin:3px; }
.tool-tag button { background:none;border:none;color:var(--mint-dark);cursor:pointer;font-size:13px;line-height:1; }

/* ── Book Questions ── */
.bq-wrap { padding:16px; }
.bq-header-card { background:#fff;border:1.5px solid var(--border);border-radius:14px;padding:16px;margin-bottom:16px; }
.bq-header-title { font-size:15px;font-weight:900;color:var(--text);margin-bottom:4px; }
.bq-header-sub { font-size:11px;color:var(--text-muted);margin-bottom:12px; }
.bq-page-row { display:flex;align-items:center;gap:8px;margin-bottom:10px; }
.bq-quick-pages { display:flex;gap:6px;flex-wrap:wrap; }
.bq-page-chip { padding:5px 12px;border-radius:20px;border:1.5px solid var(--border);background:#fff;font-size:11px;font-weight:700;cursor:pointer; }
.bq-page-chip.active { background:var(--mint);border-color:var(--mint-mid);color:var(--mint-dark); }
.bq-page-label { font-size:13px;font-weight:800;color:var(--text-muted);margin-bottom:12px;text-align:center; }
.bq-question-card { display:flex;gap:10px;background:#fff;border:1.5px solid var(--border);border-radius:12px;padding:14px;margin-bottom:12px; }
.bq-q-num { font-size:16px;font-weight:900;color:var(--mint-dark);flex-shrink:0;width:22px; }
.bq-q-body { flex:1; }
.bq-q-text { font-size:13px;font-weight:700;color:var(--text);margin-bottom:10px;line-height:1.5; }
.bq-line { border-bottom:1.5px dotted #c0c0c0;height:22px;margin-bottom:4px; }
.bq-actions { display:flex;gap:8px;margin-top:16px; }
.bq-action-btn { flex:1;padding:12px 8px;background:var(--mint);border:none;border-radius:10px;font-size:11px;font-weight:800;color:var(--mint-dark);cursor:pointer;display:flex;align-items:center;justify-content:center;gap:4px; }
.bq-print-btn { background:var(--peach);color:var(--peach-dark); }
.bq-empty { text-align:center;padding:40px;color:var(--text-muted); }

/* ── Universal Back Row ── */
.univ-back-row { padding:8px 16px 0; }
.univ-back-btn { background:none;border:none;color:var(--mint-dark);font-size:13px;font-weight:800;cursor:pointer;display:flex;align-items:center;gap:5px; }
  `;
  var styleEl = document.createElement('style');
  styleEl.textContent = css;
  document.head.appendChild(styleEl);
})();

/* Re-render teacher home with updated features after DOM is ready */
document.addEventListener('DOMContentLoaded', function() {
  renderTeacherHome();
  renderBottomNavs();
});


/* ══════════════════════════════════════════════════════════════════
   FEATURE 11: ENHANCED ASSESSMENT QUESTION GENERATOR
   Configuration Panel → AI Generation → Professional Output
   ══════════════════════════════════════════════════════════════════ */

/* ── Config State ── */
var AGC = {
  questionTypes: ['MCQ', 'Short Answer'],
  questionCount: 10,
  difficulty: 'Mixed',
  loScope: 'Selected Activity LOs',
  language: 'English',
  marksMode: 'Auto Generate',
  manualMarks: { MCQ: 1, 'Fill in the Blanks': 1, 'Match the Following': 1, 'Short Answer': 2, 'Long Answer': 5, 'True / False': 1, 'One Word Answer': 1, 'Case Study Based': 5, 'Competency Based Questions': 3, 'HOTS Questions': 4, 'Activity Based Questions': 3 },
  generatedPaper: null,
  generating: false
};

var AGC_QUESTION_TYPES = [
  { id: 'MCQ',                       icon: '🔵', label: 'MCQ' },
  { id: 'Fill in the Blanks',        icon: '✏️', label: 'Fill in the Blanks' },
  { id: 'Match the Following',       icon: '↔️', label: 'Match the Following' },
  { id: 'Short Answer',              icon: '📝', label: 'Short Answer' },
  { id: 'Long Answer',               icon: '📄', label: 'Long Answer' },
  { id: 'True / False',              icon: '✅', label: 'True / False' },
  { id: 'One Word Answer',           icon: '🔤', label: 'One Word Answer' },
  { id: 'Case Study Based',          icon: '📊', label: 'Case Study Based' },
  { id: 'Competency Based Questions',icon: '🎯', label: 'Competency Based Questions' },
  { id: 'HOTS Questions',            icon: '🧠', label: 'HOTS Questions' },
  { id: 'Activity Based Questions',  icon: '⚙️', label: 'Activity Based Questions' }
];

/* ── Entry point: opens config, never directly generates ── */
function openAssessmentGenerator() {
  var p = PROJECT_BANK[ASM.projectId];
  if (p) document.getElementById('agc-proj-name').textContent = p.icon + ' ' + p.name;
  AGC.generating = false;
  renderAGCBody();
  go('s-assess-generator');
}

/* ── Inject "Generate Assessment with AI" button into Assessment Dashboard ── */
var _origRenderAssessDashboard = renderAssessDashboard;
renderAssessDashboard = function() {
  _origRenderAssessDashboard();
  var body = document.getElementById('assess-dash-body');
  if (!body) return;
  /* Prepend the prominent AI generator button */
  var banner = document.createElement('div');
  banner.className = 'agc-dashboard-banner';
  banner.innerHTML =
    '<div class="agc-db-left">' +
      '<div class="agc-db-icon">✍️</div>' +
      '<div>' +
        '<div class="agc-db-title">Generate Assessment Paper with AI</div>' +
        '<div class="agc-db-sub">Configure question types, difficulty, language & marks — then generate a professional paper instantly.</div>' +
      '</div>' +
    '</div>' +
    '<button class="agc-db-btn" onclick="openAssessmentGenerator()"><i class="ti ti-sparkles"></i> Open Generator</button>';
  body.insertBefore(banner, body.firstChild);
};

/* ── Render Config Panel ── */
function renderAGCBody() {
  var body = document.getElementById('agc-body');
  if (!body) return;
  var p = PROJECT_BANK[ASM.projectId] || {};
  var act = state.activity;

  var html = '<div class="agc-wrap">';

  /* Context card */
  html += '<div class="agc-context-card">';
  html += '<div class="agc-context-row"><span class="agc-ctx-label">Project</span><span class="agc-ctx-val">' + (p.icon || '📚') + ' ' + (p.name || 'Not selected') + '</span></div>';
  if (act) html += '<div class="agc-context-row"><span class="agc-ctx-label">Activity</span><span class="agc-ctx-val">' + (act.icon || '📖') + ' ' + act.name + '</span></div>';
  var los = act ? act.lo.join(', ') : (p.los ? p.los.join(', ') : '—');
  html += '<div class="agc-context-row"><span class="agc-ctx-label">Learning Outcomes</span><span class="agc-ctx-val agc-lo-val">' + los + '</span></div>';
  html += '</div>';

  /* ─── STEP 1: Question Types ─── */
  html += '<div class="agc-section">';
  html += '<div class="agc-section-title"><span class="agc-step-num">1</span> Question Types <span class="agc-multi-hint">(select one or more)</span></div>';
  html += '<div class="agc-qtype-grid">';
  AGC_QUESTION_TYPES.forEach(function(qt) {
    var sel = AGC.questionTypes.indexOf(qt.id) >= 0;
    html += '<button class="agc-qtype-chip ' + (sel ? 'selected' : '') + '" onclick="agcToggleType(\'' + qt.id.replace(/'/g, "\\'") + '\')">' +
      '<span class="agc-qt-icon">' + qt.icon + '</span>' +
      '<span class="agc-qt-label">' + qt.label + '</span>' +
      (sel ? '<span class="agc-qt-check"><i class="ti ti-check"></i></span>' : '') +
      '</button>';
  });
  html += '</div></div>';

  /* ─── STEP 2: Number of Questions ─── */
  html += '<div class="agc-section">';
  html += '<div class="agc-section-title"><span class="agc-step-num">2</span> Number of Questions</div>';
  html += '<div class="agc-count-row">';
  [5, 10, 15, 20].forEach(function(n) {
    html += '<button class="agc-count-chip ' + (AGC.questionCount === n ? 'selected' : '') + '" onclick="AGC.questionCount=' + n + ';renderAGCBody()">' + n + '</button>';
  });
  html += '<input class="agc-count-input" type="number" min="1" max="50" value="' + AGC.questionCount + '" oninput="AGC.questionCount=Math.max(1,Math.min(50,parseInt(this.value)||10))" placeholder="Custom">';
  html += '</div></div>';

  /* ─── STEP 3: Difficulty Level ─── */
  html += '<div class="agc-section">';
  html += '<div class="agc-section-title"><span class="agc-step-num">3</span> Difficulty Level</div>';
  html += '<div class="agc-difficulty-row">';
  ['Easy', 'Medium', 'Hard', 'Mixed'].forEach(function(d) {
    var colors = { Easy: 'mint', Medium: 'yellow', Hard: 'coral', Mixed: 'lavender' };
    html += '<button class="agc-diff-chip agc-diff-' + d.toLowerCase() + ' ' + (AGC.difficulty === d ? 'selected' : '') + '" onclick="AGC.difficulty=\'' + d + '\';renderAGCBody()">' + d + '</button>';
  });
  html += '</div></div>';

  /* ─── STEP 4: Learning Outcomes Coverage ─── */
  html += '<div class="agc-section">';
  html += '<div class="agc-section-title"><span class="agc-step-num">4</span> Learning Outcomes Coverage</div>';
  html += '<div class="agc-lo-options">';
  ['Selected Activity LOs', 'Selected Project LOs', 'All Project LOs'].forEach(function(opt) {
    html += '<label class="agc-radio-label"><input type="radio" name="agc-lo" value="' + opt + '" ' + (AGC.loScope === opt ? 'checked' : '') + ' onchange="AGC.loScope=this.value"><span>' + opt + '</span></label>';
  });
  html += '</div></div>';

  /* ─── STEP 5: Assessment Language ─── */
  html += '<div class="agc-section">';
  html += '<div class="agc-section-title"><span class="agc-step-num">5</span> Assessment Language</div>';
  html += '<div class="agc-lang-row">';
  [
    { id: 'English',   flag: '🇬🇧' },
    { id: 'Marathi',   flag: '🟠' },
    { id: 'Hindi',     flag: '🇮🇳' },
    { id: 'Bilingual', flag: '🌐' }
  ].forEach(function(l) {
    html += '<button class="agc-lang-chip ' + (AGC.language === l.id ? 'selected' : '') + '" onclick="AGC.language=\'' + l.id + '\';renderAGCBody()">' + l.flag + ' ' + l.id + '</button>';
  });
  html += '</div></div>';

  /* ─── STEP 6: Marks Distribution ─── */
  html += '<div class="agc-section">';
  html += '<div class="agc-section-title"><span class="agc-step-num">6</span> Marks Distribution</div>';
  html += '<div class="agc-marks-toggle-row">';
  ['Auto Generate', 'Manual Marks'].forEach(function(m) {
    html += '<button class="agc-marks-mode-btn ' + (AGC.marksMode === m ? 'selected' : '') + '" onclick="AGC.marksMode=\'' + m + '\';renderAGCBody()">' + m + '</button>';
  });
  html += '</div>';

  if (AGC.marksMode === 'Manual Marks' && AGC.questionTypes.length) {
    html += '<div class="agc-manual-marks-grid">';
    AGC.questionTypes.forEach(function(qt) {
      var defaultM = AGC.manualMarks[qt] || 1;
      html += '<div class="agc-mm-row">';
      html += '<span class="agc-mm-label">' + qt + '</span>';
      html += '<div class="agc-mm-input-wrap"><input class="agc-mm-input" type="number" min="0.5" max="20" step="0.5" value="' + defaultM + '" oninput="AGC.manualMarks[\'' + qt.replace(/'/g, "\\'") + '\']=parseFloat(this.value)||1"><span class="agc-mm-unit">marks</span></div>';
      html += '</div>';
    });
    html += '</div>';
  } else if (AGC.marksMode === 'Auto Generate') {
    html += '<div class="agc-auto-marks-preview">';
    var autoMap = { MCQ: 1, 'Fill in the Blanks': 1, 'Match the Following': 1, 'Short Answer': 2, 'Long Answer': 5, 'True / False': 1, 'One Word Answer': 1, 'Case Study Based': 5, 'Competency Based Questions': 3, 'HOTS Questions': 4, 'Activity Based Questions': 3 };
    AGC.questionTypes.forEach(function(qt) {
      html += '<div class="agc-am-row"><span>' + qt + '</span><span class="agc-am-val">' + (autoMap[qt] || 1) + ' mark' + ((autoMap[qt] || 1) > 1 ? 's' : '') + '</span></div>';
    });
    var totalMarks = AGC.questionTypes.reduce(function(sum, qt) { return sum + (autoMap[qt] || 1); }, 0);
    html += '<div class="agc-am-total">Estimated Total: ~' + (totalMarks * Math.ceil(AGC.questionCount / Math.max(AGC.questionTypes.length, 1))) + ' marks</div>';
    html += '</div>';
  }
  html += '</div>';

  /* ─── Validation Summary ─── */
  var valid = AGC.questionTypes.length > 0 && AGC.questionCount >= 1;
  if (!valid) {
    html += '<div class="agc-validation-warn"><i class="ti ti-alert-circle"></i> Please select at least one question type to continue.</div>';
  }

  /* ─── Generate Button ─── */
  html += '<button class="agc-generate-btn ' + (!valid ? 'disabled' : '') + '" onclick="' + (valid ? 'agcRunGeneration()' : '') + '">';
  html += '<i class="ti ti-sparkles"></i> Generate Assessment';
  html += '</button>';

  html += '</div>'; /* agc-wrap */
  body.innerHTML = html;
}

/* ── Toggle Question Type ── */
function agcToggleType(id) {
  var idx = AGC.questionTypes.indexOf(id);
  if (idx >= 0) AGC.questionTypes.splice(idx, 1);
  else AGC.questionTypes.push(id);
  renderAGCBody();
}

/* ── Run AI Generation ── */
async function agcRunGeneration() {
  if (AGC.generating) return;
  AGC.generating = true;

  var p = PROJECT_BANK[ASM.projectId] || {};
  var act = state.activity;
  var pName = p.name || 'Kaushal Bodh Project';
  var actName = act ? act.name : 'Activity';
  var los = act ? act.lo.join(', ') : (p.los ? p.los.join(', ') : 'LO1, LO2');
  var loContent = act ? (act.objectives ? act.objectives.text : actName) : pName;

  /* Show loading screen */
  var outBody = document.getElementById('ago-body');
  var outProj = document.getElementById('ago-proj-name');
  if (outProj) outProj.textContent = (p.icon || '📝') + ' ' + pName;
  if (outBody) outBody.innerHTML = agcLoadingHTML();
  go('s-assess-output');

  /* Build prompt */
  var marksMap = AGC.marksMode === 'Auto Generate'
    ? { MCQ: 1, 'Fill in the Blanks': 1, 'Match the Following': 1, 'Short Answer': 2, 'Long Answer': 5, 'True / False': 1, 'One Word Answer': 1, 'Case Study Based': 5, 'Competency Based Questions': 3, 'HOTS Questions': 4, 'Activity Based Questions': 3 }
    : AGC.manualMarks;

  var marksInfo = AGC.questionTypes.map(function(qt) { return qt + ' = ' + (marksMap[qt] || 1) + ' mark(s)'; }).join(', ');
  var totalQ = AGC.questionCount;
  var perType = Math.ceil(totalQ / AGC.questionTypes.length);

  var systemPrompt = 'You are an expert NCERT Kaushal Bodh assessment paper generator for Grade 6-8 vocational education in India. Generate a professional, structured assessment paper. Return ONLY valid JSON — no markdown, no backticks, no preamble. Format: { "title": "...", "totalMarks": 0, "sections": [{ "type": "...", "sectionLabel": "Section A – MCQ", "marks_each": 1, "questions": [{ "q": "question text", "opts": ["a","b","c","d"], "answer": "correct option or answer" }] }] }. For MCQ include opts and answer. For Match the Following include { "q": "Match:", "pairs": [{"l":"...","r":"..."}] }. For others just { "q": "...", "answer": "..." }. Questions MUST be aligned to the activity, project, and NCERT learning outcomes provided.';

  var userPrompt = 'Generate an assessment paper with the following configuration:\n' +
    'Project: ' + pName + '\n' +
    'Activity: ' + actName + '\n' +
    'Learning Outcomes: ' + los + '\n' +
    'Activity Content: ' + loContent + '\n' +
    'Question Types: ' + AGC.questionTypes.join(', ') + '\n' +
    'Total Questions: ' + totalQ + ' (approximately ' + perType + ' per type)\n' +
    'Difficulty: ' + AGC.difficulty + '\n' +
    'Language: ' + AGC.language + '\n' +
    'LO Coverage: ' + AGC.loScope + '\n' +
    'Marks: ' + marksInfo + '\n\n' +
    'IMPORTANT: Questions must be specifically about "' + actName + '" — ' + loContent + '. Do NOT generate generic questions.';

  try {
    var response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'claude-sonnet-4-6',
        max_tokens: 1000,
        system: systemPrompt,
        messages: [{ role: 'user', content: userPrompt }]
      })
    });
    var data = await response.json();
    var raw = data.content && data.content[0] ? data.content[0].text : '';
    raw = raw.replace(/```json|```/g, '').trim();
    var paper = JSON.parse(raw);
    AGC.generatedPaper = paper;
    renderAGCOutput(paper);
  } catch (err) {
    /* Fallback: build paper from existing PROJECT_BANK question bank */
    AGC.generatedPaper = agcBuildFallbackPaper(p, act);
    renderAGCOutput(AGC.generatedPaper);
  }
  AGC.generating = false;
}

function agcLoadingHTML() {
  return '<div style="display:flex;flex-direction:column;align-items:center;justify-content:center;padding:60px 24px;gap:16px;">' +
    '<div style="font-size:48px;">⚙️</div>' +
    '<div style="font-size:16px;font-weight:800;color:var(--text);">Generating Assessment...</div>' +
    '<div style="font-size:12px;color:var(--text-muted);text-align:center;line-height:1.6;">' +
    'Aligning questions to NCERT Learning Outcomes,<br>applying difficulty level and language settings...' +
    '</div>' +
    '<div class="agc-loader-bar"><div class="agc-loader-fill"></div></div>' +
    '</div>';
}

/* Build fallback paper from existing bank if API fails */
function agcBuildFallbackPaper(p, act) {
  var marksMap = AGC.marksMode === 'Auto Generate'
    ? { MCQ: 1, 'Fill in the Blanks': 1, 'Match the Following': 1, 'Short Answer': 2, 'Long Answer': 5, 'True / False': 1, 'One Word Answer': 1, 'Case Study Based': 5, 'Competency Based Questions': 3, 'HOTS Questions': 4, 'Activity Based Questions': 3 }
    : AGC.manualMarks;

  var sections = [];
  var perType = Math.max(1, Math.ceil(AGC.questionCount / AGC.questionTypes.length));
  var sectionLetters = 'ABCDEFGHIJK';
  var actName = act ? act.name : (p.name || 'Activity');
  var los = act ? act.lo.join(', ') : 'LO1, LO2';

  /* Generic question bank per type */
  var bank = {
    MCQ: [
      { q: 'Which of the following is a correct safety rule in the kitchen?', opts: ['Run with sharp tools', 'Wash hands before cooking', 'Keep spills on the floor', 'Use broken utensils'], answer: 'b' },
      { q: 'What does a recipe contain?', opts: ['Only the name of the dish', 'Ingredients and method', 'Shopping list only', 'None of the above'], answer: 'b' },
      { q: 'How many steps are in the WHO handwashing protocol?', opts: ['3', '5', '7', '10'], answer: 'c' }
    ],
    'Fill in the Blanks': [
      { q: 'Before touching food, we must always ______ our hands.', answer: 'wash' },
      { q: 'A ______ tells us the ingredients and steps to make a dish.', answer: 'recipe' },
      { q: 'Rolling a lemon before squeezing gives ______ juice.', answer: 'more' }
    ],
    'True / False': [
      { q: 'We should always read the entire recipe before starting to cook.', answer: 'True' },
      { q: 'It is safe to run in the kitchen with sharp objects.', answer: 'False' },
      { q: 'Standard measuring cups help get accurate quantities.', answer: 'True' }
    ],
    'Short Answer': [
      { q: 'Why is it important to follow the order of steps in a recipe?', answer: 'The correct sequence ensures the dish is prepared safely and tastes right.' },
      { q: 'Name any two safety rules to follow in the kitchen.', answer: 'Wash hands; wear an apron; use proper tools.' },
      { q: 'What is the difference between a teaspoon and a tablespoon?', answer: '1 tablespoon = 3 teaspoons (approx. 15 ml vs 5 ml).' }
    ],
    'Long Answer': [
      { q: 'Explain the importance of measuring ingredients accurately while cooking. Give two examples.', answer: 'Accurate measurement ensures consistent taste and texture. E.g. too much salt ruins a dish; too little sugar in lemonade makes it sour.' },
      { q: 'Describe the WHO 7-step handwashing technique and explain why each step matters.', answer: 'Palm to palm; back of hands; fingers interlaced; backs of fingers; rotational rubbing of thumbs; fingertips; wrists. Each step removes germs from different parts of the hand.' }
    ],
    'One Word Answer': [
      { q: 'Name the tool used to measure liquid in cooking.', answer: 'Measuring cup' },
      { q: 'What do we call food preparation without using fire or heat?', answer: 'Fireless cooking' }
    ],
    'Match the Following': [
      { q: 'Match the following kitchen tools with their use:', pairs: [{ l: 'Knife', r: 'Cutting' }, { l: 'Strainer', r: 'Filtering' }, { l: 'Measuring cup', r: 'Measuring liquids' }, { l: 'Apron', r: 'Protection' }] }
    ],
    'HOTS Questions': [
      { q: 'If you double the recipe, what happens to the fractions? Give an example using 1/2 cup.', answer: '1/2 cup × 2 = 1 cup. Proportions scale linearly.' },
      { q: 'Why might two students using the same recipe get different results? Analyse two possible reasons.', answer: 'Measurement inaccuracies; different quality of ingredients; variation in technique.' }
    ],
    'Competency Based Questions': [
      { q: 'A student is making lemonade and adds sugar after ice. What problem might occur? Suggest a solution.', answer: 'Sugar dissolves poorly in cold water. Solution: dissolve sugar in warm water first, then add ice.' },
      { q: 'Your team has only chalk & board available. How would you teach measurement to the class without a projector?', answer: 'Draw measurement diagrams on the board; use physical items like cups and spoons; role-play measurement steps.' }
    ],
    'Case Study Based': [
      { q: 'Read the situation: Priya\'s group spilled water during the lemonade activity. The floor is wet. One student wants to continue cooking. What should they do? Give three safety steps Priya should take.', answer: '1. Immediately wipe up the spill. 2. Warn other students. 3. Check for injuries. 4. Resume only when area is safe.' }
    ],
    'Activity Based Questions': [
      { q: 'Design a 5-step procedure for preparing fruit chaat without using fire. List the tools required.', answer: 'Wash fruits; peel and chop; mix in bowl; add spices; garnish and serve. Tools: knife, cutting board, bowl, spoon.' }
    ]
  };

  AGC.questionTypes.forEach(function(qt, idx) {
    var qArr = bank[qt] || bank['Short Answer'];
    var picks = [];
    for (var i = 0; i < perType; i++) picks.push(qArr[i % qArr.length]);
    sections.push({
      type: qt,
      sectionLabel: 'Section ' + sectionLetters[idx] + ' — ' + qt,
      marks_each: marksMap[qt] || 1,
      questions: picks
    });
  });

  var totalMarks = sections.reduce(function(s, sec) { return s + sec.marks_each * sec.questions.length; }, 0);
  return { title: 'Assessment: ' + actName, totalMarks: totalMarks, sections: sections };
}

/* ── Render Generated Output ── */
function renderAGCOutput(paper) {
  var body = document.getElementById('ago-body');
  if (!body) return;
  var p = PROJECT_BANK[ASM.projectId] || {};
  var act = state.activity;

  var html = '';

  /* Export toolbar */
  html += '<div class="agc-export-bar">';
  html += '<button class="agc-export-btn primary" onclick="agcDownloadPDF()"><i class="ti ti-file-text"></i> Download PDF</button>';
  html += '<button class="agc-export-btn" onclick="agcDownloadWord()"><i class="ti ti-file-word"></i> Download Word</button>';
  html += '<button class="agc-export-btn" onclick="agcPrint()"><i class="ti ti-printer"></i> Print</button>';
  html += '<button class="agc-export-btn" onclick="agcSaveTemplate()"><i class="ti ti-bookmark"></i> Save Template</button>';
  html += '<button class="agc-export-btn" onclick="agcAddToPortfolio()"><i class="ti ti-folder-plus"></i> Add to Portfolio</button>';
  html += '</div>';

  /* Paper header */
  html += '<div class="agc-paper-header">';
  html += '<div class="agc-paper-school">Kaushal Bodh — Vocational Education</div>';
  html += '<div class="agc-paper-title">' + (paper.title || 'Assessment Paper') + '</div>';
  html += '<div class="agc-paper-meta-row">';
  html += '<span>📚 ' + (p.name || '') + '</span>';
  if (act) html += '<span>📖 ' + act.name + '</span>';
  html += '<span>⏱️ Time: ' + Math.ceil((paper.totalMarks || 30) * 1.5) + ' min</span>';
  html += '<span>📊 Total Marks: ' + (paper.totalMarks || '—') + '</span>';
  html += '</div>';
  html += '<div class="agc-paper-config-row">';
  html += '<span class="agc-cfg-chip">🎯 ' + AGC.difficulty + '</span>';
  html += '<span class="agc-cfg-chip">🌐 ' + AGC.language + '</span>';
  html += '<span class="agc-cfg-chip">📝 ' + AGC.questionCount + ' Questions</span>';
  html += '</div>';
  html += '<div class="agc-paper-fields"><span>Name: ___________________________</span><span>Roll No: ________</span><span>Class: ________</span><span>Date: ________</span></div>';
  html += '</div>';

  /* Sections */
  (paper.sections || []).forEach(function(sec) {
    html += '<div class="agc-paper-section">';
    html += '<div class="agc-paper-sec-header">';
    html += '<span class="agc-sec-label">' + (sec.sectionLabel || sec.type) + '</span>';
    var secTotal = (sec.marks_each || 1) * (sec.questions || []).length;
    html += '<span class="agc-sec-marks">[' + sec.marks_each + ' mark' + (sec.marks_each > 1 ? 's' : '') + ' each · Total: ' + secTotal + ']</span>';
    html += '</div>';

    (sec.questions || []).forEach(function(q, qi) {
      html += '<div class="agc-q-block">';
      html += '<span class="agc-q-num">' + (qi + 1) + '.</span>';
      html += '<div class="agc-q-content">';
      html += '<div class="agc-q-text">' + (q.q || '') + '</div>';

      /* MCQ options */
      if (q.opts && q.opts.length) {
        html += '<div class="agc-mcq-opts">';
        q.opts.forEach(function(opt, oi) {
          html += '<div class="agc-mcq-opt"><span class="agc-opt-circle">○</span> <strong>' + String.fromCharCode(65 + oi) + '.</strong> ' + opt + '</div>';
        });
        html += '</div>';
      }

      /* Match pairs */
      if (q.pairs && q.pairs.length) {
        html += '<div class="agc-match-table">';
        html += '<div class="agc-match-row agc-match-head"><div>Column A</div><div>Column B</div></div>';
        var shuffledR = q.pairs.map(function(pr) { return pr.r; }).sort(function() { return Math.random() - 0.5; });
        q.pairs.forEach(function(pr, pi) {
          html += '<div class="agc-match-row"><div><strong>' + (pi + 1) + '.</strong> ' + pr.l + '</div><div><strong>' + String.fromCharCode(97 + pi) + '.</strong> ' + shuffledR[pi] + '</div></div>';
        });
        html += '</div>';
      }

      /* Answer lines for student */
      var lineCount = sec.type === 'Long Answer' || sec.type === 'Case Study Based' ? 5 : (sec.type === 'Short Answer' || sec.type === 'HOTS Questions' || sec.type === 'Competency Based Questions' || sec.type === 'Activity Based Questions' ? 3 : 1);
      if (!q.opts && !q.pairs) {
        html += '<div class="agc-ans-lines">';
        for (var li = 0; li < lineCount; li++) html += '<div class="agc-ans-line"></div>';
        html += '</div>';
      }

      html += '</div></div>'; /* agc-q-content, agc-q-block */
    });

    html += '</div>'; /* agc-paper-section */
  });

  /* Answer key (teacher only) */
  html += '<div class="agc-answer-key">';
  html += '<div class="agc-ak-title">📋 Answer Key (Teacher\'s Copy)</div>';
  (paper.sections || []).forEach(function(sec) {
    html += '<div class="agc-ak-section"><strong>' + (sec.sectionLabel || sec.type) + '</strong></div>';
    (sec.questions || []).forEach(function(q, qi) {
      var ans = q.answer || (q.pairs ? q.pairs.map(function(pr) { return pr.l + ' → ' + pr.r; }).join(', ') : '—');
      html += '<div class="agc-ak-row"><span class="agc-ak-num">' + (qi + 1) + '.</span><span class="agc-ak-ans">' + ans + '</span></div>';
    });
  });
  html += '</div>';

  body.innerHTML = html;
}

/* ── Export functions ── */
function agcDownloadPDF() { showToast('📥 Assessment PDF downloading...'); }
function agcDownloadWord() { showToast('📄 Assessment Word file downloading...'); }
function agcPrint() {
  showToast('🖨️ Preparing print view...');
  setTimeout(function() { window.print(); }, 500);
}
function agcSaveTemplate() { showToast('🔖 Assessment template saved!'); }
function agcAddToPortfolio() { showToast('📁 Added to student portfolio!'); }

/* ── Inject AGC styles ── */
(function injectAGCStyles() {
  var css = `
/* ── AGC Dashboard Banner ── */
.agc-dashboard-banner {
  background: linear-gradient(135deg, var(--lavender), var(--sky));
  border-radius: 14px;
  padding: 16px;
  margin: 12px 0 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  flex-wrap: wrap;
}
.agc-db-left { display:flex;align-items:center;gap:12px;flex:1; }
.agc-db-icon { font-size:28px;flex-shrink:0; }
.agc-db-title { font-size:14px;font-weight:900;color:var(--lavender-dark); }
.agc-db-sub { font-size:11px;color:var(--lavender-dark);opacity:.8;margin-top:2px;line-height:1.4; }
.agc-db-btn { background:var(--lavender-dark);color:#fff;border:none;border-radius:10px;padding:10px 14px;font-size:12px;font-weight:800;cursor:pointer;white-space:nowrap;display:flex;align-items:center;gap:6px;flex-shrink:0; }

/* ── AGC Config Wrap ── */
.agc-wrap { padding: 14px; }
.agc-context-card { background:var(--mint);border-radius:12px;padding:12px 14px;margin-bottom:14px; }
.agc-context-row { display:flex;align-items:baseline;gap:8px;margin-bottom:4px;font-size:12px; }
.agc-ctx-label { font-weight:800;color:var(--mint-dark);min-width:90px;flex-shrink:0; }
.agc-ctx-val { color:var(--mint-dark);font-weight:600; }
.agc-lo-val { font-size:11px; }

.agc-section { background:#fff;border:1.5px solid var(--border);border-radius:14px;padding:14px;margin-bottom:12px; }
.agc-section-title { font-size:13px;font-weight:900;color:var(--text);margin-bottom:12px;display:flex;align-items:center;gap:8px;flex-wrap:wrap; }
.agc-step-num { background:var(--mint-dark);color:#fff;border-radius:50%;width:22px;height:22px;display:inline-flex;align-items:center;justify-content:center;font-size:11px;font-weight:900;flex-shrink:0; }
.agc-multi-hint { font-size:10px;color:var(--text-muted);font-weight:600; }

/* Question type chips */
.agc-qtype-grid { display:grid;grid-template-columns:1fr 1fr;gap:7px; }
.agc-qtype-chip { background:#f8fafc;border:1.5px solid var(--border);border-radius:10px;padding:9px 10px;font-size:11px;font-weight:700;color:var(--text);cursor:pointer;display:flex;align-items:center;gap:7px;text-align:left; }
.agc-qtype-chip.selected { background:var(--mint);border-color:var(--mint-mid);color:var(--mint-dark); }
.agc-qt-icon { font-size:15px;flex-shrink:0; }
.agc-qt-label { flex:1;line-height:1.2; }
.agc-qt-check { color:var(--mint-dark);font-size:12px; }

/* Count */
.agc-count-row { display:flex;align-items:center;gap:8px;flex-wrap:wrap; }
.agc-count-chip { padding:8px 16px;border-radius:20px;border:1.5px solid var(--border);background:#fff;font-size:13px;font-weight:800;cursor:pointer;color:var(--text); }
.agc-count-chip.selected { background:var(--peach);border-color:var(--peach-mid);color:var(--peach-dark); }
.agc-count-input { width:72px;padding:8px 10px;border:1.5px solid var(--border);border-radius:10px;font-size:13px;font-weight:700;text-align:center; }

/* Difficulty */
.agc-difficulty-row { display:flex;gap:8px;flex-wrap:wrap; }
.agc-diff-chip { flex:1;min-width:70px;padding:10px;border-radius:10px;border:1.5px solid var(--border);font-size:12px;font-weight:800;cursor:pointer;background:#fff;color:var(--text); }
.agc-diff-easy.selected { background:var(--mint);border-color:var(--mint-mid);color:var(--mint-dark); }
.agc-diff-medium.selected { background:var(--yellow);border-color:var(--yellow-mid);color:var(--yellow-dark); }
.agc-diff-hard.selected { background:var(--coral);border-color:var(--coral-mid);color:var(--coral-dark); }
.agc-diff-mixed.selected { background:var(--lavender);border-color:var(--lavender-mid);color:var(--lavender-dark); }

/* LO Options */
.agc-lo-options { display:flex;flex-direction:column;gap:8px; }
.agc-radio-label { display:flex;align-items:center;gap:10px;font-size:12.5px;font-weight:700;color:var(--text);cursor:pointer;padding:8px 10px;border-radius:8px;border:1.5px solid var(--border); }
.agc-radio-label input { accent-color:var(--mint-dark);width:16px;height:16px; }

/* Language */
.agc-lang-row { display:flex;gap:8px;flex-wrap:wrap; }
.agc-lang-chip { flex:1;min-width:70px;padding:9px 8px;border-radius:10px;border:1.5px solid var(--border);font-size:12px;font-weight:800;cursor:pointer;background:#fff;color:var(--text);text-align:center; }
.agc-lang-chip.selected { background:var(--sky);border-color:var(--sky-mid);color:var(--sky-dark); }

/* Marks */
.agc-marks-toggle-row { display:flex;gap:8px;margin-bottom:10px; }
.agc-marks-mode-btn { flex:1;padding:9px;border-radius:10px;border:1.5px solid var(--border);font-size:12px;font-weight:800;cursor:pointer;background:#fff;color:var(--text); }
.agc-marks-mode-btn.selected { background:var(--peach);border-color:var(--peach-mid);color:var(--peach-dark); }
.agc-manual-marks-grid { display:flex;flex-direction:column;gap:6px;margin-top:6px; }
.agc-mm-row { display:flex;align-items:center;justify-content:space-between;padding:8px 10px;background:#f8fafc;border-radius:8px; }
.agc-mm-label { font-size:12px;font-weight:700;color:var(--text);flex:1; }
.agc-mm-input-wrap { display:flex;align-items:center;gap:5px; }
.agc-mm-input { width:50px;padding:5px 8px;border:1.5px solid var(--border);border-radius:7px;font-size:12px;font-weight:700;text-align:center; }
.agc-mm-unit { font-size:11px;color:var(--text-muted); }
.agc-auto-marks-preview { background:#f8fafc;border-radius:10px;padding:10px;margin-top:6px; }
.agc-am-row { display:flex;justify-content:space-between;font-size:12px;padding:4px 0;border-bottom:1px solid var(--border); }
.agc-am-val { font-weight:800;color:var(--mint-dark); }
.agc-am-total { font-size:12px;font-weight:900;color:var(--peach-dark);margin-top:6px;text-align:right; }

/* Validation + Generate */
.agc-validation-warn { background:#fff7ed;border:1.5px solid #fed7aa;border-radius:10px;padding:10px 14px;font-size:12px;font-weight:700;color:#9a3412;display:flex;align-items:center;gap:8px;margin-bottom:10px; }
.agc-generate-btn { width:100%;padding:16px;background:linear-gradient(135deg,var(--lavender-dark),var(--mint-dark));border:none;border-radius:14px;color:#fff;font-size:16px;font-weight:900;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:10px;margin-top:4px;letter-spacing:0.02em; }
.agc-generate-btn.disabled { opacity:.45;cursor:not-allowed; }

/* Loader */
.agc-loader-bar { width:200px;height:6px;background:var(--border);border-radius:3px;overflow:hidden; }
.agc-loader-fill { height:100%;width:60%;background:linear-gradient(90deg,var(--mint-dark),var(--lavender-dark));border-radius:3px;animation:agcLoad 1.4s ease-in-out infinite; }
@keyframes agcLoad { 0%{transform:translateX(-100%)} 100%{transform:translateX(200%)} }

/* ── Generated Output ── */
.agc-export-bar { display:flex;gap:6px;flex-wrap:wrap;padding:12px 14px;background:#f8fafc;border-bottom:1px solid var(--border);position:sticky;top:0;z-index:10; }
.agc-export-btn { padding:8px 12px;border-radius:9px;border:1.5px solid var(--border);background:#fff;font-size:11px;font-weight:800;cursor:pointer;color:var(--text);display:flex;align-items:center;gap:5px;white-space:nowrap; }
.agc-export-btn.primary { background:var(--mint-dark);color:#fff;border-color:var(--mint-dark); }

.agc-paper-header { background:#fff;border-bottom:2px solid var(--border);padding:16px 16px 12px;margin-bottom:0; }
.agc-paper-school { font-size:11px;font-weight:800;color:var(--text-muted);text-transform:uppercase;letter-spacing:.05em;text-align:center;margin-bottom:4px; }
.agc-paper-title { font-size:17px;font-weight:900;color:var(--text);text-align:center;margin-bottom:8px; }
.agc-paper-meta-row { display:flex;gap:12px;flex-wrap:wrap;justify-content:center;font-size:11px;color:var(--text-muted);margin-bottom:6px; }
.agc-paper-config-row { display:flex;gap:6px;flex-wrap:wrap;justify-content:center;margin-bottom:8px; }
.agc-cfg-chip { background:var(--mint);color:var(--mint-dark);padding:3px 9px;border-radius:20px;font-size:10px;font-weight:800; }
.agc-paper-fields { display:flex;gap:16px;flex-wrap:wrap;font-size:11.5px;font-weight:700;color:var(--text);margin-top:8px;padding-top:8px;border-top:1px dashed var(--border); }

.agc-paper-section { margin:0;padding:14px 16px;border-bottom:1px solid var(--border);background:#fff; }
.agc-paper-sec-header { display:flex;justify-content:space-between;align-items:center;margin-bottom:10px;flex-wrap:wrap;gap:6px; }
.agc-sec-label { font-size:13px;font-weight:900;color:var(--text); }
.agc-sec-marks { font-size:11px;font-weight:700;color:var(--text-muted); }

.agc-q-block { display:flex;gap:8px;padding:8px 0;border-bottom:1px dashed #f0f0f0; }
.agc-q-block:last-child { border-bottom:none; }
.agc-q-num { font-size:13px;font-weight:900;color:var(--text);flex-shrink:0;min-width:18px;padding-top:2px; }
.agc-q-content { flex:1; }
.agc-q-text { font-size:13px;font-weight:700;color:var(--text);line-height:1.5;margin-bottom:6px; }

.agc-mcq-opts { display:flex;flex-direction:column;gap:4px;margin-bottom:4px; }
.agc-mcq-opt { font-size:12px;color:var(--text);display:flex;align-items:center;gap:6px;padding:3px 0; }
.agc-opt-circle { font-size:14px;color:var(--text-muted); }

.agc-match-table { border:1px solid var(--border);border-radius:8px;overflow:hidden;margin-bottom:4px; }
.agc-match-row { display:grid;grid-template-columns:1fr 1fr;gap:0; }
.agc-match-head { background:var(--mint);font-size:11px;font-weight:800;color:var(--mint-dark); }
.agc-match-row > div { padding:7px 10px;border-right:1px solid var(--border);font-size:12px; }
.agc-match-row > div:last-child { border-right:none; }
.agc-match-row:not(.agc-match-head) { border-top:1px solid var(--border); }

.agc-ans-lines { margin-top:4px; }
.agc-ans-line { border-bottom:1.5px dotted #c0c0c0;height:22px;margin-bottom:3px; }

/* Answer Key */
.agc-answer-key { background:#f0fdf4;border:2px solid var(--mint-mid);border-radius:14px;margin:16px;padding:14px; }
.agc-ak-title { font-size:13px;font-weight:900;color:var(--mint-dark);margin-bottom:10px;display:flex;align-items:center;gap:6px; }
.agc-ak-section { font-size:12px;font-weight:800;color:var(--mint-dark);margin:8px 0 4px;border-bottom:1px solid var(--mint-mid);padding-bottom:4px; }
.agc-ak-row { display:flex;gap:8px;font-size:12px;padding:3px 0; }
.agc-ak-num { font-weight:800;min-width:20px;flex-shrink:0; }
.agc-ak-ans { color:var(--text);flex:1; }
  `;
  var styleEl = document.createElement('style');
  styleEl.textContent = css;
  document.head.appendChild(styleEl);
})();
// ==========================================================================
// scripts.js च्या शेवटी हा कोड जोडा
// ==========================================================================

// 1. REGIONAL LOCALIZATION DATABASE
var LOCALIZATION_CONFIG_DB = {
  "411001": { state: "Maharashtra", district: "Pune", city: "Pune", greeting: "Namaskar", food: "Puran Poli", landmark: "Gateway of India", festival: "Ganesh Chaturthi", quote: "बिना सहकार नहीं उद्धार - 'No development without cooperation.'", tip: "Use sugarcane fields counting for multiplication exercises.", crop: "Sugarcane", occupation: "Sugarcane Farmer / Agro-processor", monument: "Ajanta Caves", art: "Warli Art", sound: "https://actions.google.com/sounds/v1/alarms/digital_watch_alarm_long.ogg" },
  "380001": { state: "Gujarat", district: "Ahmedabad", city: "Ahmedabad", greeting: "Namaste", food: "Jalebi Fafda", landmark: "Statue of Unity", festival: "Navratri", quote: "નમસ્તે - 'Where character is built, nations are formed.'", tip: "Integrate groundnut oil volume weights with metric fluid conversion metrics.", crop: "Groundnut", occupation: "Textile Weaver / Diamond Polisher", monument: "Statue of Unity", art: "Patola Weaving", sound: "https://actions.google.com/sounds/v1/alarms/digital_watch_alarm_long.ogg" },
  "143001": { state: "Punjab", district: "Amritsar", city: "Amritsar", greeting: "Sat Sri Akal", food: "Makki di Roti", landmark: "Golden Temple", festival: "Baisakhi", quote: "ਸਤਿ ਸ਼्री ਅਕਾਲ - 'Truth is high, higher still is truthful living.'", tip: "Weave local tractor gear speeds ratios directly into physics velocity calculations.", crop: "Wheat / Mustard", occupation: "Grain Merchant / Farm Mechanization Tech", monument: "Golden Temple", art: "Phulkari Embroidery", sound: "https://actions.google.com/sounds/v1/alarms/digital_watch_alarm_long.ogg" },
  "560001": { state: "Karnataka", district: "Bangalore", city: "Bangalore", greeting: "Namaskara", food: "Ragi Mudde", landmark: "Mysore Palace", festival: "Ugadi", quote: "ನಮಸ್ಕಾರ - 'Knowledge is supreme asset.'", tip: "Connect Ragi crop metrics with dietary fiber percentage fractions.", crop: "Ragi", occupation: "Sericulturist / Coffee Planter", monument: "Mysore Palace", art: "Sandals Woodcarving", sound: "https://actions.google.com/sounds/v1/alarms/digital_watch_alarm_long.ogg" }
};

var currentDetectedState = "Maharashtra"; 

// 2. ENGAGING LOADING SCREEN ENGINE
function showEngagingLoading(callback) {
  var MESSAGES = [
    "Preparing your classroom...",
    "Finding engaging activities...",
    "AI is creating something amazing...",
    "Sharpening virtual pencils...",
    "Arranging vocational toolkits...",
    "Weaving regional examples...",
    "Almost ready..."
  ];
  
  var overlay = document.getElementById("engaging-loading-overlay");
  var msgNode = document.getElementById("engaging-humorous-msg");
  var progressNode = document.getElementById("loading-progress-bar-node");
  
  if (!overlay) { if (callback) callback(); return; }
  overlay.style.display = "flex";
  
  var currentMsgIdx = 0;
  msgNode.textContent = MESSAGES[currentMsgIdx];
  
  var msgInterval = setInterval(function() {
    currentMsgIdx = (currentMsgIdx + 1) % MESSAGES.length;
    msgNode.textContent = MESSAGES[currentMsgIdx];
  }, 400);
  
  var progressPct = 0;
  var progressInterval = setInterval(function() {
    progressPct += 5;
    if(progressNode) progressNode.style.width = progressPct + "%";
    if (progressPct >= 100) {
      clearInterval(msgInterval);
      clearInterval(progressInterval);
      overlay.style.display = "none";
      if (callback) callback();
    }
  }, 35);
}

// 3. REGISTRATION LOCALIZATION ENGINE
function triggerRegistrationLocalization() {
  var pincodeNode = document.getElementById("reg-pincode-input");
  if(!pincodeNode) return;
  var pincode = pincodeNode.value.trim();
  var config = LOCALIZATION_CONFIG_DB[pincode] || LOCALIZATION_CONFIG_DB["411001"];
  
  currentDetectedState = config.state;
  
  document.getElementById("welcome-regional-greeting").textContent = config.greeting.toUpperCase();
  document.getElementById("welcome-teacher-name").textContent = config.greeting + " Triveni! 🙏";
  document.getElementById("welcome-location-text").textContent = "Welcome from " + config.city + ", " + config.state + ".";
  
  document.getElementById("loc-landmark").textContent = config.landmark;
  document.getElementById("loc-food").textContent = config.food;
  document.getElementById("loc-festival").textContent = config.festival;
  
  document.getElementById("regional-quote-area").innerHTML = '<strong>Regional Quote:</strong> "' + config.quote + '"';
  document.getElementById("teaching-tip-area").innerHTML = '💡 <strong>Teaching Tip:</strong> ' + config.tip;
  document.getElementById("skill-events-placeholder").innerHTML = '📅 <strong>Nearby Skill Events:</strong> ' + config.city + ' Vocational Forum 2026';
  
  var soundToggle = document.getElementById("reg-welcome-sound-toggle");
  if (soundToggle && soundToggle.checked && config.sound) {
    var audio = new Audio(config.sound);
    audio.volume = 0.3;
    audio.play().catch(function(e) { console.log("Sound autoplay prevented."); });
  }
}// scripts.js च्या शेवटी जोडा - Pincode / Zip Code Validation & Auto-detection
var PINCODE_GEO_REGISTRY = {
  "411001": { city: "Pune", state: "Maharashtra" },
  "380001": { city: "Ahmedabad", state: "Gujarat" },
  "110001": { city: "New Delhi", state: "Delhi" },
  "143001": { city: "Amritsar", state: "Punjab" },
  "560001": { city: "Bangalore", state: "Karnataka" }
};

document.addEventListener("DOMContentLoaded", function() {
  var pinInp = document.getElementById("adv-pincode");
  if (pinInp) {
    pinInp.addEventListener("input", function() {
      // फक्त नंबर्स ठेवणे
      this.value = this.value.replace(/[^0-9]/g, '');
      var val = this.value.trim();
      if (val.length === 6 && PINCODE_GEO_REGISTRY[val]) {
        var record = PINCODE_GEO_REGISTRY[val];
        if (document.getElementById("adv-city")) document.getElementById("adv-city").value = record.city;
        if (document.getElementById("adv-state")) document.getElementById("adv-state").value = record.state;
        showToast("📍 Locality detected: " + record.city + ", " + record.state);
      }
    });
  }
});

// 4. STEP-BY-STEP NAVIGATION FOR LESSON CONTENT
var currentLessonStepIndex = 0;
var lessonStepsNodeMapping = [];

function setupStepBasedLessonNavigation(htmlContent) {
  var wrapper = document.getElementById("lesson-step-nav-wrapper");
  var contentArea = document.getElementById("lesson-content");
  if(!wrapper || !contentArea) return;
  
  contentArea.innerHTML = htmlContent;
  wrapper.style.display = "flex";
  
  var flowSteps = [
    { title: "Overview" }, { title: "Objectives" }, { title: "Materials" }, 
    { title: "Teacher Script" }, { title: "Activities" }, { title: "Group Work" }, 
    { title: "Discussion" }, { title: "Resources" }, { title: "Assessment" }
  ];
  
  var rootBlock = contentArea.querySelector(".workspace-block");
  if (!rootBlock) return;
  
  var children = Array.from(rootBlock.children);
  rootBlock.innerHTML = "";
  lessonStepsNodeMapping = [];
  
  for (var f = 0; f < flowSteps.length; f++) {
    var stepContainer = document.createElement("div");
    stepContainer.className = "ks-step-container-node";
    stepContainer.setAttribute("data-step-title", flowSteps[f].title);
    
    if (flowSteps[f].title === "Assessment") {
      var transitionScreen = document.createElement("div");
      transitionScreen.className = "asm-transition-banner-wrapper";
      transitionScreen.innerHTML = `
        <span style="font-size:36px; display:block; margin-bottom:10px;">📋</span>
        <h3 style="font-family:'Baloo 2', sans-serif; font-weight:800; font-size:18px; margin-bottom:4px;">Assessment Transition</h3>
        <p style="font-size:12px; opacity:0.85; margin-bottom:14px;">Click Next to Start Assessment.</p>
      `;
      stepContainer.appendChild(transitionScreen);
    }
    rootBlock.appendChild(stepContainer);
    lessonStepsNodeMapping.push(stepContainer);
  }
  
  children.forEach(function(node) {
    var txt = node.textContent.toLowerCase();
    if (txt.includes("objective") || txt.includes("skill")) { lessonStepsNodeMapping[1].appendChild(node); } 
    else if (txt.includes("materials required") || txt.includes("material")) { lessonStepsNodeMapping[2].appendChild(node); } 
    else if (node.classList.contains("hook-card") || txt.includes("script") || txt.includes("guide")) { lessonStepsNodeMapping[3].appendChild(node); } 
    else if (node.classList.contains("step-timeline-container") || txt.includes("step 1")) { lessonStepsNodeMapping[4].appendChild(node); } 
    else if (node.classList.contains("group-banner") || txt.includes("group")) { lessonStepsNodeMapping[5].appendChild(node); } 
    else if (txt.includes("discussion") || node.classList.contains("discussion-card")) { lessonStepsNodeMapping[6].appendChild(node); } 
    else if (node.classList.contains("tips-category") || node.classList.contains("download-deck-grid")) { lessonStepsNodeMapping[7].appendChild(node); } 
    else if (txt.includes("assessment") || node.classList.contains("assessment-container")) { lessonStepsNodeMapping[8].appendChild(node); } 
    else { lessonStepsNodeMapping[0].appendChild(node); }
  });
  
  currentLessonStepIndex = 0;
  renderActiveStepPane();
}

function renderActiveStepPane() {
  lessonStepsNodeMapping.forEach(function(pane, idx) {
    if (idx === currentLessonStepIndex) {
      pane.classList.add("active-step");
      var bar = document.getElementById("lesson-progress");
      if(bar) bar.style.width = Math.round(((idx + 1) / lessonStepsNodeMapping.length) * 100) + "%";
      var lbl = document.getElementById("progress-label");
      if(lbl) lbl.textContent = pane.getAttribute("data-step-title").toUpperCase();
    } else {
      pane.classList.remove("active-step");
    }
  });
  var prevBtn = document.getElementById("ks-step-prev-btn");
  if(prevBtn) prevBtn.style.opacity = (currentLessonStepIndex === 0) ? "0.3" : "1";
}

function navigateLessonStep(direction) {
  var targetIdx = currentLessonStepIndex + direction;
  if (targetIdx >= 0 && targetIdx < lessonStepsNodeMapping.length) {
    currentLessonStepIndex = targetIdx;
    renderActiveStepPane();
  } else if (targetIdx >= lessonStepsNodeMapping.length) {
    showToast("Lesson Completed!");
    go("s-teacher-home");
  }
}

// 5. REGIONAL DATA INJECTION INTO LESSON CONTENT
function injectRegionalPersonalizationInsideLessonPlanData(htmlText) {
  var pincode = document.getElementById("reg-pincode-input") ? document.getElementById("reg-pincode-input").value.trim() : "411001";
  var config = LOCALIZATION_CONFIG_DB[pincode] || LOCALIZATION_CONFIG_DB["411001"];
  
  var replaced = htmlText
    .replace(/Maharashtra/g, config.state)
    .replace(/Pune/g, config.city)
    .replace(/Warli Art/g, config.art)
    .replace(/Puran Poli/g, config.food)
    .replace(/Ajanta Caves/g, config.monument)
    .replace(/Sugarcane/g, config.crop);
    
  return replaced;
}

// 6. LANGUAGE INTERCEPT FOR YOUTUBE VIDEOS
var originalRenderMultimedia = typeof renderMultimedia !== 'undefined' ? renderMultimedia : null;
function getLanguageFilteredYouTubeVideoUrl(actId, selectedLang) {
  var fallback = "https://www.youtube.com/embed/dQw4w9WgXcQ";
  var matrix = {
    "a-3-reading-recipes": { "Marathi": "https://www.youtube.com/embed/Video_Marathi_Recipes", "Hindi": "https://www.youtube.com/embed/Video_Hindi_Recipes" }
  };
  return (matrix[actId] && matrix[actId][selectedLang]) ? matrix[actId][selectedLang] : fallback;
}

// 7. INTERCEPT MAIN LESSON IGNITION FOR LOADER AND STEPS
var nativeIgniteInteractiveLesson = igniteInteractiveLesson;
igniteInteractiveLesson = function(topicKey, projId, actId) {
  showEngagingLoading(function() {
    nativeIgniteInteractiveLesson(topicKey, projId, actId);
    var contentArea = document.getElementById("lesson-content");
    if(contentArea) {
      var freshHtml = injectRegionalPersonalizationInsideLessonPlanData(contentArea.innerHTML);
      setupStepBasedLessonNavigation(freshHtml);
    }
  });
};

// Initialize localization on load
document.addEventListener("DOMContentLoaded", function() {
  setTimeout(triggerRegistrationLocalization, 300);
});
// scripts.js मध्ये शोधून जुन्या go ओव्हरराईड ऐवजी हा कोड टाका:
var originalGoPointer = go;
go = function(id) {
  if (id === "s-splash") {
    originalGoPointer("s-teacher-home");
  } else {
    originalGoPointer(id);
  }
};

// ॲप चालू झाल्यावर थेट टीचर डॅशबोर्डवर नेण्यासाठी:
document.addEventListener("DOMContentLoaded", function() {
  var splashScreen = document.getElementById("s-splash");
  if (splashScreen && splashScreen.classList.contains("active")) {
    go("s-teacher-home");
  }
});
// scripts.js मधील जुने window.fetch इंटरसेप्टर पूर्णपणे काढून त्याजागी हा नवीन कोड लिहा:

var ROTATING_CARDS_MESSAGES = [
  "🧠 AI is understanding your topic... Reading NCERT, Analyzing Learning Outcomes, Building Activities.",
  "🎯 Creating Personalized Lesson... Matching State parameters, Class Size, Resources, and Internet Availability.",
  "📚 Finding Best Resources... Searching Videos, Worksheets, PPT, Images, and Assessments.",
  "🤖 AI is Building Lesson... Constructing Teacher Script, Activities, Reflection blocks, and Quizzes."
];

var AI_TIPS_CAROUSEL_DATA = [
  "💡 Tip: Use local vegetables for examples.",
  "💡 Tip: Group students by mixed abilities.",
  "💡 Tip: Encourage peer learning.",
  "💡 Tip: Ask reflection questions after activity."
];

var TIMELINE_MOTIVATIONAL_QUOTES = [
  "\"Every lesson shapes a future.\"",
  "\"Learning becomes meaningful through activities.\"",
  "\"Teachers inspire tomorrow.\""
];

var GAME_EMOJIS_POOL = [
  { item: "Lemon", symbol: "🍋" }, { item: "Spoon", symbol: "🥄" },
  { item: "Recipe", symbol: "📖" }, { item: "Bowl", symbol: "🥣" }
];

var GAME_QUIZ_POOL = [
  { q: "Which comes first?", options: ["Add Ice", "Mix Sugar", "Squeeze Lemon"], correct: 1 },
  { q: "Recipes should always be followed in order.", options: ["TRUE", "FALSE"], correct: 0 }
];

var GAME_UNSCRAMBLE_POOL = [
  { scrambled: "M O N E L", clear: "LEMON" }
];

var activeGameState = { type: 1, dataRef: null, matchSelected: null };

function initializeLoadingParticleBackground() {
  var container = document.getElementById("ks-loading-particle-container");
  if (!container) return;
  container.innerHTML = "";
  var GLYPHS = ["📚", "✨", "✏️", "💡", "🎓"];
  for (var i = 0; i < 15; i++) {
    var p = document.createElement("div");
    p.className = "ks-floating-particle-node";
    p.textContent = GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
    p.style.left = Math.random() * 100 + "%";
    p.style.animationDelay = (Math.random() * 4) + "s";
    p.style.fontSize = (Math.random() * 10 + 14) + "px";
    container.appendChild(p);
  }
}

function renderRandomLoadingMicroGame() {
  var playground = document.getElementById("ks-minigame-playground-node");
  if (!playground) return;
  playground.innerHTML = "";
  
  var mode = Math.floor(Math.random() * 3) + 1;
  activeGameState.type = mode;
  
  if (mode === 1) {
    playground.innerHTML = `<div class="ks-match-playground" id="ks-match-grid-node"></div>`;
    var grid = document.getElementById("ks-match-grid-node");
    var leftCol = document.createElement("div"); leftCol.style = "display:flex; flex-direction:column; gap:4px;";
    var rightCol = document.createElement("div"); rightCol.style = "display:flex; flex-direction:column; gap:4px;";
    
    var shuffledLeft = [...GAME_EMOJIS_POOL].sort(() => Math.random() - 0.5);
    var shuffledRight = [...GAME_EMOJIS_POOL].sort(() => Math.random() - 0.5);
    
    shuffledLeft.forEach((item, idx) => {
      leftCol.innerHTML += `<button class="ks-match-btn-item" id="ks-mL-${idx}" onclick="handleMiniGameMatch('left', ${idx}, '${item.item}')">${item.item}</button>`;
    });
    shuffledRight.forEach((item, idx) => {
      rightCol.innerHTML += `<button class="ks-match-btn-item" id="ks-mR-${idx}" onclick="handleMiniGameMatch('right', ${idx}, '${item.item}')">${item.symbol}</button>`;
    });
    grid.appendChild(leftCol); grid.appendChild(rightCol);
    activeGameState.matchSelected = { left: null, right: null };
  } else if (mode === 2) {
    var quiz = GAME_QUIZ_POOL[Math.floor(Math.random() * GAME_QUIZ_POOL.length)];
    activeGameState.dataRef = quiz;
    var html = `<div style="font-size:12px; font-weight:800; color:var(--text); margin-bottom:6px;">${quiz.q}</div><div class="ks-quiz-option-container">`;
    quiz.options.forEach((opt, idx) => {
      html += `<button class="ks-quiz-option-row" id="ks-qopt-${idx}" onclick="evaluateMiniGameQuiz(${idx})">${opt}</button>`;
    });
    html += `</div>`;
    playground.innerHTML = html;
  } else {
    var unscramble = GAME_UNSCRAMBLE_POOL[0];
    activeGameState.dataRef = unscramble;
    playground.innerHTML = `
      <div style="font-size:11px; font-weight:700; color:var(--text-muted);">Unscramble: <strong style="color:var(--lavender-dark); letter-spacing:2px;">${unscramble.scrambled}</strong></div>
      <div class="ks-unscramble-input-row" style="margin-top:6px;">
        <input type="text" class="ks-unscramble-textbox" id="ks-scramble-input" placeholder="Answer...">
        <button class="adv-add-btn" onclick="evaluateMiniGameUnscramble()" style="padding:6px 12px; font-size:11px;">Go</button>
      </div>
    `;
  }
}

function handleMiniGameMatch(side, idx, val) {
  var sel = activeGameState.matchSelected;
  if (sel[side] !== null) document.getElementById("ks-m" + (side==='left'?'L':'R') + "-" + sel[side].idx).classList.remove("selected-node");
  sel[side] = { idx: idx, val: val };
  document.getElementById("ks-m" + (side==='left'?'L':'R') + "-" + idx).classList.add("selected-node");
  
  if (sel.left !== null && sel.right !== null) {
    if (sel.left.val === sel.right.val) {
      document.getElementById("ks-mL-" + sel.left.idx).className = "ks-match-btn-item matched-node";
      document.getElementById("ks-mR-" + sel.right.idx).className = "ks-match-btn-item matched-node";
      awardXP(2); showToast("+2 XP Unlocked!");
      setTimeout(renderRandomLoadingMicroGame, 1000);
    } else {
      document.getElementById("ks-mL-" + sel.left.idx).classList.remove("selected-node");
      document.getElementById("ks-mR-" + sel.right.idx).classList.remove("selected-node");
      sel.left = null; sel.right = null;
    }
  }
}

function evaluateMiniGameQuiz(idx) {
  var quiz = activeGameState.dataRef;
  document.querySelectorAll("[id^='ks-qopt-']").forEach(el => el.style.pointerEvents = "none");
  if (idx === quiz.correct) {
    document.getElementById("ks-qopt-" + idx).classList.add("correct-node");
    awardXP(2); showToast("+2 XP! Lesson Explorer Badge");
  } else {
    document.getElementById("ks-qopt-" + idx).classList.add("wrong-node");
    document.getElementById("ks-qopt-" + quiz.correct).classList.add("correct-node");
  }
  setTimeout(renderRandomLoadingMicroGame, 1500);
}

function evaluateMiniGameUnscramble() {
  var val = document.getElementById("ks-scramble-input").value.trim().toUpperCase();
  if (val === activeGameState.dataRef.clear) {
    awardXP(2); showToast("+2 XP! Solved");
    setTimeout(renderRandomLoadingMicroGame, 1000);
  } else {
    showToast("Incorrect, try again!");
  }
}

function executeSuccessConfettiBurst() {
  var overlay = document.getElementById("engaging-loading-overlay");
  if (!overlay) return;
  var COLORS = ["#6bbf8e", "#f4a47a", "#f5c94e", "#9b8ad6", "#5cb3d8"];
  for (var i = 0; i < 30; i++) {
    var c = document.createElement("div");
    c.className = "ks-confetti-piece-node";
    c.style.backgroundColor = COLORS[Math.floor(Math.random() * COLORS.length)];
    c.style.left = Math.random() * 80 + 10 + "%";
    c.style.top = Math.random() * 30 + 20 + "%";
    c.style.animationDelay = (Math.random() * 0.4) + "s";
    overlay.appendChild(c);
  }
}

var nativeFetch = window.fetch;
window.fetch = async function(url, options) {
  if (url && url.includes("anthropic.com")) {
    var loader = document.getElementById("engaging-loading-overlay");
    if (loader) {
      loader.style.display = "flex";
      initializeLoadingParticleBackground();
      renderRandomLoadingMicroGame();
      
      var pct = 0;
      var remainingSeconds = 6;
      var timelineIndex = 0;
      
      document.querySelectorAll("[id^='tl-node-']").forEach(el => el.className = "ks-timeline-line-item state-todo");
      document.getElementById("tl-node-0").className = "ks-timeline-line-item state-pending";
      
      var progressInterval = setInterval(function() {
        pct += 4;
        if (pct > 96) pct = 96;
        
        document.getElementById("ks-loading-percentage-node").textContent = pct + "%";
        document.getElementById("ks-loading-percentage-bar").style.width = pct + "%";
        
        var blocks = Math.floor(pct / 10);
        var asciiStr = "";
        for (var a = 0; a < 10; a++) asciiStr += (a < blocks) ? "█" : "░";
        document.getElementById("ks-loading-ascii-bar").textContent = asciiStr + " " + pct + "%";
        
        if (pct % 20 === 0) {
          document.getElementById("ks-rotating-card-body").textContent = ROTATING_CARDS_MESSAGES[(pct/20)%ROTATING_CARDS_MESSAGES.length];
        }
        if (pct % 24 === 0) {
          document.getElementById("ks-tips-carousel-text").textContent = AI_TIPS_CAROUSEL_DATA[(pct/24)%AI_TIPS_CAROUSEL_DATA.length];
        }
      }, 150);

      var timerInterval = setInterval(function() {
        remainingSeconds--;
        if (remainingSeconds < 1) remainingSeconds = 1;
        document.getElementById("ks-loading-countdown-node").textContent = remainingSeconds + " seconds remaining";
        
        if (timelineIndex < 5) {
          document.getElementById("tl-node-" + timelineIndex).className = "ks-timeline-line-item state-done";
          document.getElementById("tl-node-" + timelineIndex).querySelector("span").textContent = "✓";
          timelineIndex++;
          document.getElementById("tl-node-" + timelineIndex).className = "ks-timeline-line-item state-pending";
        }
      }, 1000);
    }

    try {
      var res = await nativeFetch(url, options);
      clearInterval(progressInterval);
      clearInterval(timerInterval);
      
      document.getElementById("ks-loading-percentage-node").textContent = "100%";
      document.getElementById("ks-loading-percentage-bar").style.width = "100%";
      document.getElementById("ks-loading-ascii-bar").textContent = "██████████ 100%";
      document.getElementById("tl-node-5").className = "ks-timeline-line-item state-done";
      document.getElementById("tl-node-5").querySelector("span").textContent = "✓";
      
      document.getElementById("loading-main-heading").textContent = "✅ Lesson Ready!";
      document.getElementById("ks-loading-countdown-node").textContent = "AI generated successfully.";
      executeSuccessConfettiBurst();
      
      await new Promise(r => setTimeout(r, 1200));
      if (loader) {
        loader.style.display = "none";
        document.querySelectorAll(".ks-confetti-piece-node").forEach(e => e.remove());
      }
      return res;
    } catch (e) {
      clearInterval(progressInterval);
      clearInterval(timerInterval);
      if (loader) loader.style.display = "none";
      throw e;
    }
  }
  return nativeFetch(url, options);
};
/* ═══════════════════════════════════════════════════════════════════
   KAUSHAL SAATHI — INCREMENTAL UPDATES v3.1
   ① PIN Code in AI Lesson Customization (s-activity-customize)
   ② Working AI Loader (showAILoader replacing broken showEngagingLoading)
   ③ Interactive mini-game rotation every 2.5 s during loading
   ④ 7-step timeline support + success animation for all nodes
   ⑤ Null-safe triggerRegistrationLocalization (removes broken refs)
   ⑥ applyAdvancedOptions + toggleResource + addTool for s-advanced
   ═══════════════════════════════════════════════════════════════════ */

/* ─────────────────────────────────────────────────────────────────
   ① PIN CODE — customizeState + state.advancedOptions extensions
   ───────────────────────────────────────────────────────────────── */

// Extend without overwriting existing fields
if (typeof customizeState !== 'undefined') {
  customizeState.pincode = customizeState.pincode || '';
}
if (state && state.advancedOptions) {
  state.advancedOptions.pincode = state.advancedOptions.pincode || '';
}

/** Auto-fill city / state when a known 6-digit pincode is typed in the
 *  Customize screen. Uses the existing PINCODE_GEO_REGISTRY table. */
function custAutoFillFromPincode(val) {
  var rec = (typeof PINCODE_GEO_REGISTRY !== 'undefined') && PINCODE_GEO_REGISTRY[val];
  if (!rec) return;
  customizeState.city = rec.city;
  customizeState.state = rec.state;
  var cityEl = document.getElementById('cust-city');
  var stateEl = document.getElementById('cust-state');
  if (cityEl) cityEl.value = rec.city;
  if (stateEl) stateEl.value = rec.state;
  if (typeof showToast === 'function') showToast('📍 ' + rec.city + ', ' + rec.state + ' detected');
}

/* Wrap renderCustomizeBody to inject PIN Code field below City / District */
var _orig_renderCustomizeBody = renderCustomizeBody;
renderCustomizeBody = function() {
  _orig_renderCustomizeBody();
  if (document.getElementById('cust-pincode')) return; // guard: already injected
  var cityEl = document.getElementById('cust-city');
  if (!cityEl) return;
  // Climb to the .adv-row that contains the city field
  var advRow = cityEl.closest ? cityEl.closest('.adv-row') : (cityEl.parentElement && cityEl.parentElement.parentElement);
  if (!advRow) return;
  var pincodeDiv = document.createElement('div');
  pincodeDiv.className = 'adv-field';
  pincodeDiv.style.cssText = 'margin-top:10px;';
  pincodeDiv.innerHTML =
    '<label class="adv-label">' +
      '<i class="ti ti-hash" style="font-size:11px;"></i> PIN Code / ZIP Code ' +
      '<span style="font-weight:500;opacity:.7;">(optional)</span>' +
    '</label>' +
    '<input class="adv-input" type="text" id="cust-pincode"' +
      ' placeholder="e.g. 411001" maxlength="6" inputmode="numeric"' +
      ' value="' + (customizeState.pincode || '') + '"' +
      ' oninput="' +
        "this.value=this.value.replace(/[^0-9]/g,'');" +
        'customizeState.pincode=this.value;' +
        "if(this.value.length===6)custAutoFillFromPincode(this.value);" +
      '">';
  // Insert the new field immediately after the state/city row
  advRow.insertAdjacentElement('afterend', pincodeDiv);
};

/* Wrap custGenerateLessonPlan to flush pincode into advancedOptions */
var _orig_custGenerateLessonPlan = custGenerateLessonPlan;
custGenerateLessonPlan = function() {
  var pEl = document.getElementById('cust-pincode');
  if (pEl) {
    var cleaned = pEl.value.replace(/[^0-9]/g, '');
    customizeState.pincode = cleaned;
    if (state && state.advancedOptions) state.advancedOptions.pincode = cleaned;
  }
  _orig_custGenerateLessonPlan();
};

/* Wrap openActivityWithCustomize to pull existing pincode into customizeState */
var _orig_openActivityWithCustomize = openActivityWithCustomize;
openActivityWithCustomize = function(topicKey, projId, actId) {
  _orig_openActivityWithCustomize(topicKey, projId, actId);
  customizeState.pincode = (state && state.advancedOptions && state.advancedOptions.pincode) || '';
};

/* ─────────────────────────────────────────────────────────────────
   ② WORKING AI LOADER — showAILoader()
   Replaces the broken showEngagingLoading (which referenced
   non-existent DOM ids engaging-humorous-msg / loading-progress-bar-node).
   Uses the correct ids from the existing engaging-loading-overlay.
   ───────────────────────────────────────────────────────────────── */

function showAILoader(callback) {
  var overlay = document.getElementById('engaging-loading-overlay');
  if (!overlay) { if (callback) callback(); return; }

  // Show the overlay
  overlay.style.display = 'flex';
  if (typeof initializeLoadingParticleBackground === 'function') initializeLoadingParticleBackground();
  if (typeof renderRandomLoadingMicroGame === 'function') renderRandomLoadingMicroGame();

  // Element refs (all guarded)
  var headingNode    = document.getElementById('loading-main-heading');
  var countdownNode  = document.getElementById('ks-loading-countdown-node');
  var pctNode        = document.getElementById('ks-loading-percentage-node');
  var pctBar         = document.getElementById('ks-loading-percentage-bar');
  var asciiBar       = document.getElementById('ks-loading-ascii-bar');
  var rotatingCard   = document.getElementById('ks-rotating-card-body');
  var tipsText       = document.getElementById('ks-tips-carousel-text');

  // Reset display
  if (headingNode)   headingNode.textContent   = 'Kaushal Saathi Engine';
  if (pctNode)       pctNode.textContent       = '0%';
  if (pctBar)        pctBar.style.width        = '0%';
  if (asciiBar)      asciiBar.textContent      = '░░░░░░░░░░ 0%';
  if (countdownNode) countdownNode.textContent = 'Preparing lesson…';

  // Reset all timeline nodes
  var totalNodes = document.querySelectorAll("[id^='tl-node-']").length;
  for (var n = 0; n < totalNodes; n++) {
    var tn = document.getElementById('tl-node-' + n);
    if (!tn) continue;
    tn.className = 'ks-timeline-line-item ' + (n === 0 ? 'state-pending' : 'state-todo');
    var sp = tn.querySelector('span');
    if (sp) sp.textContent = n === 0 ? '●' : '○';
  }

  /* Animation config: ~3.8 s to reach 95 %, callback fires then overlay hides. */
  var DURATION_MS  = 3800;
  var TICK_MS      = 180;
  var INC          = 95 / (DURATION_MS / TICK_MS); // ~4.5 % per tick
  var pct          = 0;
  var tlIdx        = 0;

  // ③ Rotate mini-game every 2.5 s
  var gameTimer = setInterval(function() {
    if (typeof renderRandomLoadingMicroGame === 'function') renderRandomLoadingMicroGame();
  }, 2500);

  var progressTimer = setInterval(function() {
    pct = Math.min(pct + INC, 95);
    var r = Math.round(pct);

    if (pctNode)  pctNode.textContent = r + '%';
    if (pctBar)   pctBar.style.width  = r + '%';
    if (asciiBar) {
      var filled = Math.floor(r / 10), bar = '';
      for (var i = 0; i < 10; i++) bar += i < filled ? '█' : '░';
      asciiBar.textContent = bar + ' ' + r + '%';
    }

    // Rotate informational cards
    if (rotatingCard && r % 25 === 0 && typeof ROTATING_CARDS_MESSAGES !== 'undefined') {
      rotatingCard.textContent = ROTATING_CARDS_MESSAGES[Math.floor(r / 25) % ROTATING_CARDS_MESSAGES.length];
    }
    if (tipsText && r % 20 === 0 && typeof AI_TIPS_CAROUSEL_DATA !== 'undefined') {
      tipsText.textContent = AI_TIPS_CAROUSEL_DATA[Math.floor(r / 20) % AI_TIPS_CAROUSEL_DATA.length];
    }

    // Advance timeline proportionally
    var maxTl = totalNodes - 2; // keep last node for final "done"
    var targetTl = Math.min(Math.floor(r / (95 / Math.max(maxTl, 1))), maxTl);
    while (tlIdx < targetTl) {
      var doneEl = document.getElementById('tl-node-' + tlIdx);
      if (doneEl) {
        doneEl.className = 'ks-timeline-line-item state-done';
        var ds = doneEl.querySelector('span'); if (ds) ds.textContent = '✓';
      }
      tlIdx++;
      var pendEl = document.getElementById('tl-node-' + tlIdx);
      if (pendEl) {
        pendEl.className = 'ks-timeline-line-item state-pending';
        var ps = pendEl.querySelector('span'); if (ps) ps.textContent = '●';
      }
    }

    var secsLeft = Math.max(Math.round(((95 - pct) / 95) * DURATION_MS / 1000), 1);
    if (countdownNode) countdownNode.textContent = secsLeft + ' seconds remaining';

  }, TICK_MS);

  /* ④ After DURATION_MS: fire callback, show success, confetti, auto-close */
  setTimeout(function() {
    clearInterval(progressTimer);
    clearInterval(gameTimer);

    // Execute lesson generation
    if (callback) { try { callback(); } catch (e) { console.warn('AI Loader callback:', e); } }

    // Finalize progress bar
    if (pctNode)  pctNode.textContent = '100%';
    if (pctBar)   pctBar.style.width  = '100%';
    if (asciiBar) asciiBar.textContent = '██████████ 100%';

    // Mark every timeline node done (covers 7-node config for fetch intercept too)
    document.querySelectorAll("[id^='tl-node-']").forEach(function(el) {
      el.className = 'ks-timeline-line-item state-done';
      var s = el.querySelector('span'); if (s) s.textContent = '✓';
    });

    // ④ Success animation
    if (headingNode)   headingNode.textContent   = '✅ Lesson Ready!';
    if (countdownNode) countdownNode.textContent = 'AI generated successfully.';
    if (typeof executeSuccessConfettiBurst === 'function') executeSuccessConfettiBurst();

    // Auto-close after 1.2 s (lesson already rendered behind overlay)
    setTimeout(function() {
      overlay.style.display = 'none';
      document.querySelectorAll('.ks-confetti-piece-node').forEach(function(e) { e.remove(); });
    }, 1200);

  }, DURATION_MS);
}

/** Manually hide the AI loader overlay (rarely needed — showAILoader auto-hides
 *  itself after the success animation, but exposed here for completeness /
 *  for any future call site that wants explicit control). */
function hideAILoader() {
  var overlay = document.getElementById('engaging-loading-overlay');
  if (!overlay) return;
  overlay.style.display = 'none';
  document.querySelectorAll('.ks-confetti-piece-node').forEach(function(e) { e.remove(); });
}

/* Replace the broken showEngagingLoading with the working showAILoader */
showEngagingLoading = showAILoader;

/* ④ Patch executeSuccessConfettiBurst to always mark ALL timeline nodes done
   (handles both local loader and fetch-intercept paths, including 7th node) */
var _origConfetti = executeSuccessConfettiBurst;
executeSuccessConfettiBurst = function() {
  _origConfetti();
  document.querySelectorAll("[id^='tl-node-']").forEach(function(el) {
    el.className = 'ks-timeline-line-item state-done';
    var sp = el.querySelector('span'); if (sp) sp.textContent = '✓';
  });
};

/* ─────────────────────────────────────────────────────────────────
   ⑤ NULL-SAFE triggerRegistrationLocalization
   The old version crashed on missing DOM ids (regional-quote-area etc.)
   which were part of "Today's Personalization Highlights" — a section
   removed from s-teacher-home HTML. This wrapper adds null guards.
   ───────────────────────────────────────────────────────────────── */
triggerRegistrationLocalization = function() {
  var pincodeNode = document.getElementById('reg-pincode-input');
  if (!pincodeNode) return;
  var pincode = pincodeNode.value.trim();
  var db = (typeof LOCALIZATION_CONFIG_DB !== 'undefined') ? LOCALIZATION_CONFIG_DB : {};
  var config = db[pincode] || db['411001'] || {};
  if (!config.state) return;

  // Helper: set textContent/innerHTML only if element exists
  var safeText = function(id, text) {
    var el = document.getElementById(id); if (el) el.textContent = text;
  };
  var safeHtml = function(id, html) {
    var el = document.getElementById(id); if (el) el.innerHTML = html;
  };

  safeText('welcome-regional-greeting', (config.greeting || 'NAMASTE').toUpperCase());
  safeText('welcome-teacher-name', (config.greeting || 'Namaskar') + ' Triveni! 🙏');
  safeText('welcome-location-text', 'Welcome from ' + config.city + ', ' + config.state + '.');
  safeText('loc-landmark', config.landmark || '');
  safeText('loc-food',     config.food     || '');
  safeText('loc-festival', config.festival || '');

  /* These elements (regional-quote-area, teaching-tip-area, skill-events-placeholder)
     were part of "Today's Personalization Highlights" and have been removed from the
     HTML. The guards below prevent null-reference TypeErrors. */
  safeHtml('regional-quote-area',    '<strong>Regional Quote:</strong> "' + (config.quote || '') + '"');
  safeHtml('teaching-tip-area',      '💡 <strong>Teaching Tip:</strong> ' + (config.tip || ''));
  safeHtml('skill-events-placeholder', '📅 <strong>Nearby Skill Events:</strong> ' + (config.city || '') + ' Vocational Forum 2026');

  var soundToggle = document.getElementById('reg-welcome-sound-toggle');
  if (soundToggle && soundToggle.checked && config.sound) {
    var audio = new Audio(config.sound);
    audio.volume = 0.3;
    audio.play().catch(function() {});
  }
};

/* ─────────────────────────────────────────────────────────────────
   ⑥ MISSING FUNCTIONS for s-advanced screen
   These are referenced in existing HTML but were never defined.
   ───────────────────────────────────────────────────────────────── */

/** Toggle a resource chip in the s-advanced screen */
function toggleResource(btn) {
  btn.classList.toggle('selected');
}

/** Add a tool tag in the s-advanced screen */
function addTool() {
  var inp  = document.getElementById('adv-tool-input');
  var tags = document.getElementById('adv-tools-tags');
  if (!inp || !inp.value.trim() || !tags) return;
  var label = inp.value.trim();
  var tag = document.createElement('span');
  tag.className = 'tool-tag';
  tag.innerHTML = label + '<button onclick="this.parentElement.remove()">×</button>';
  tags.appendChild(tag);
  inp.value = '';
}

/** Apply advanced options and regenerate the current lesson plan */
function applyAdvancedOptions() {
  var safeVal = function(id) { var el = document.getElementById(id); return el ? el.value : ''; };
  var safeChk = function(id) { var el = document.getElementById(id); return el ? el.checked : false; };

  var selectedResources = Array.from(
    document.querySelectorAll('#adv-resources .adv-resource-chip.selected')
  ).map(function(b) { return b.textContent.trim().replace(/^[\S]+\s/, ''); });

  var toolTags = Array.from(
    document.querySelectorAll('#adv-tools-tags .tool-tag')
  ).map(function(t) { return t.childNodes[0].textContent.trim(); });

  var pincodeEl = document.getElementById('adv-pincode');
  state.advancedOptions = {
    periodDuration:      parseInt(safeVal('adv-period')) || 35,
    classSize:           safeVal('adv-classsize'),
    state:               safeVal('adv-state'),
    city:                safeVal('adv-city'),
    pincode:             pincodeEl ? pincodeEl.value.replace(/[^0-9]/g, '') : '',
    resources:           selectedResources.length ? selectedResources : ['Chalk & Board'],
    tools:               toolTags,
    internet:            safeChk('adv-internet'),
    subject:             safeVal('adv-subject'),
    subjectIntegration:  safeVal('adv-integrate'),
    teachingChallenge:   safeVal('adv-challenge')
  };

  if (typeof showToast === 'function') showToast('⚙️ Options saved — regenerating plan…');

  // Re-fire lesson with the same topic/project/activity if available
  var t = state.topic, p = state.project && state.project.id, a = state.activity && state.activity.id;
  if (t && p && a && typeof igniteInteractiveLesson === 'function') {
    igniteInteractiveLesson(t, p, a);
  } else {
    if (typeof go === 'function') go('s-lesson');
  }
}

/* ═══════════════════════════════════════════════════════════════════
   KAUSHAL SAATHI — HOME PAGE "ALL FEATURES" GRID v1.0
   The #th-feature-grid container + renderTeacherHome() already existed
   in this file but the matching <div id="th-feature-grid"> was never
   added to index.html, so the grid silently never rendered. The HTML
   container has now been wired in (s-teacher-home). This override only
   replaces the TH_FEATURES *data* so the grid matches the approved
   Home page screenshot — renderTeacherHome() itself is untouched.
   ═══════════════════════════════════════════════════════════════════ */
TH_FEATURES = [
  { ico:'📅', bg:'var(--sky)',      name:'Today',              meta:'Aaj ka din - आज की कक्षा',  onclick:"openTodayPlan()" },
  { ico:'🧩', bg:'var(--mint)',     name:'AI Lesson Plans',    meta:'NCF-aligned, in seconds',   onclick:"go('s-home')" },
  { ico:'📈', bg:'var(--lavender)', name:'Dashboard',          meta:'Class & personal progress', onclick:"goDashboard()" },
  { ico:'🧭', bg:'var(--peach)',    name:'Projects',           meta:'Project Navigator',         onclick:"goProjects()" },
  { ico:'📊', bg:'var(--yellow)',   name:'Assessments',        meta:'Competencies & marks',      onclick:"goAssessments()" },
  { ico:'📦', bg:'var(--coral)',    name:'Content Repository', meta:'Images, Videos, PDFs',      onclick:"goRepository()" },
  { ico:'📚', bg:'var(--sky)',      name:'Stories',            meta:'Motivational & skill stories', onclick:"goStories()" },
  { ico:'📁', bg:'var(--yellow)',   name:'Portfolio',          meta:'Student learning portfolios', onclick:"goPortfolio()" },
  { ico:'✨', bg:'var(--lavender)', name:'Saathi AI',          meta:'Voice-first companion',     onclick:"openAiChat()" }
];

/* Re-render now in case DOMContentLoaded already fired before this override
   (e.g. script re-run / hot reload scenarios) so the grid never shows stale data. */
if (document.readyState !== 'loading' && typeof renderTeacherHome === 'function') {
  renderTeacherHome();
}