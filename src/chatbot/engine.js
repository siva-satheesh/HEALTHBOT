import { templates } from "./templates";

export function chatbotReply(text) {
  const input = text.toLowerCase();
  
  /* =========================
     HEAD & NEUROLOGICAL
  ========================== */
  
  // Hair loss patterns
  if (/(?:hair loss|hairloss|hairlos|hairfall|hair fall|harlosss|hairlose|balding|alopecia|thinning hair|thinninghair|patchy hair loss|recedinghairline|receding hairline|telogen effluvium)/.test(input)) {
    return { reply: `${templates.hair_loss || templates.default}` };
  }

  // Scalp issues patterns
  if (/(?:scalp problems|scalp itching|scalpitching|scalppain|scalp pain|dandruff|scalp psoriasis|seborrheic dermatitis|scalp infection)/.test(input)) {
    return { reply: `${templates.scalp_issues || templates.default}` };
  }

  // Eye problems patterns
  if (/(?:eye pain|redeye|red eye|eyepain|blurryvision|vision problem|blurry vision|eye infection|conjunctivitis|pink eye|glaucoma|cataract|floaters|flashes|dry eyes|watery eyes|eye strain)/.test(input)) {
    return { reply: `${templates.eye_problems || templates.default}` };
  }

  // Ear problems patterns
  if (/(?:ear pain|ear infection|earloss|earpain|hearingloss|hearing loss|tinnitus|ear discharge|swimmer's ear|vertigo|dizziness|ear fullness|ear pressure|otitis)/.test(input)) {
    return { reply: `${templates.ear_problems || templates.default}` };
  }

  // Nose problems patterns
  if (/(?:nosebleed|nose bleed|epistaxis|nosebleeding|nasal congestion|runny nose|sinus pain|sinus pressure|postnasal drip|sinus infection|rhinitis|deviated septum|nasal polyps)/.test(input)) {
    return { reply: `${templates.nose_problems || templates.default}` };
  }

  // Mouth problems patterns
  if (/(?:mouthulcers|mouth ulcers|mouthulcer|mouth ulcer|canker sores|oral thrush|tooth pain|gum pain|bleeding gums|dry mouth|bad breath|oral lesions|tongue problems|dental pain)/.test(input)) {
    return { reply: `${templates.mouth_problems || templates.default}` };
  }

  // Throat problems patterns
  if (/(?:sore throat|throat pain|throatpain|throat|scratchy throat|pharyngitis|tonsillitis|throat infection|hoarseness|laryngitis|globus sensation|difficulty swallowing|dysphagia)/.test(input)) {
    return { reply: `${templates.throat_problems || templates.default}` };
  }

  // Headache patterns
  if (/(?:headache|head ache|headtake|migraine|head pain|headpain|cephalalgia|tension headache|cluster headache|thunderclap headache|sinus headache)/.test(input)) {
    return { reply: `${templates.headache || templates.default}` };
  }

  // Neck pain patterns
  if (/(?:neck pain|nekpain|nekpain|neckpain|nek pain|stiff neck|cervical pain|neck stiffness|whiplash|cervical radiculopathy|torticollis)/.test(input)) {
    return { reply: `${templates.neck_pain || templates.default}` };
  }

  // Dementia/memory patterns
  if (/(?:memory loss|memoryloss|memmory loss|memmoryloss|memmory|forgetfulness|dementia|alzheimer's|cognitive decline|confusion|memory problems|brain fog)/.test(input)) {
    return { reply: `${templates.dementia_memory || templates.default}` };
  }

  /* =========================
     CHEST & RESPIRATORY
  ========================== */
  
  // Chest pain patterns
  if (/(?:chest pain|chestpain|chest tightness|angina|heart pain|breastbone pain|sternum pain|chest pressure|chest discomfort)/.test(input)) {
    return { reply: `${templates.chest_pain || templates.default}` };
  }

  // Shortness of breath patterns
  if (/(?:shortness of breath|difficulty breathing|respiratory problem|breathing problem|breathingproblem|dyspnea|breathlessness|can't breathe|hardbreathe|wheezing|gasping|air hunger|respiratory distress)/.test(input)) {
    return { reply: `${templates.shortness_of_breath || templates.default}` };
  }

  // Cough patterns
  if (/(?:cough|dry cough|wet cough|cougf|productive cough|whooping cough|persistent cough|chronic cough|barking cough|coughing blood|hemoptysis)/.test(input)) {
    return { reply: `${templates.cough || templates.default}` };
  }

  // Palpitations patterns
  if (/(?:palpitations|heart racing|irregular heartbeat|skipped beats|heart flutter|arrhythmia|fast heartbeat|tachycardia|pounding heart)/.test(input)) {
    return { reply: `${templates.palpitations || templates.default}` };
  }

  /* =========================
     ABDOMINAL & DIGESTIVE
  ========================== */
  
  // Abdominal pain patterns
  if (/(?:abdominal pain|stomach pain|belly ache|tummy pain|stomachache|abdomen pain|stomach cramps|gut pain)/.test(input)) {
    return { reply: `${templates.abdominal_pain || templates.default}` };
  }

  // Nausea/vomiting patterns
  if (/(?:nausea|vomiting|throwing up|sick to stomach|vomit|queasy|morning sickness|retching|dry heaves)/.test(input)) {
    return { reply: `${templates.nausea_vomiting || templates.default}` };
  }

  // Diarrhea patterns
  if (/(?:diarrhea|loose motion|loosemotion|watery stool|frequent bowel|runny stool|gastroenteritis|stomach flu|food poisoning)/.test(input)) {
    return { reply: `${templates.diarrhea || templates.default}` };
  }

  // Constipation patterns
  if (/(?:constipation|hard stool|hardstool|difficult bowel|infrequent bowel|straining|bloated|impacted|irregular bowels)/.test(input)) {
    return { reply: `${templates.constipation || templates.default}` };
  }

  // Heartburn patterns
  if (/(?:heartburn|acid reflux|gerd|indigestion|dyspepsia|burning|chest burn|regurgitation|bitter taste|acid taste)/.test(input)) {
    return { reply: `${templates.heartburn || templates.default}` };
  }

  /* =========================
     GENITOURINARY
  ========================== */
  
  // Urinary problems patterns
  if (/(?:urinary problems|frequent urination|urinary urgency|painful urination|dysuria|blood in urine|hematuria|urinary incontinence|bladder pain)/.test(input)) {
    return { reply: `${templates.urinary_problems || templates.default}` };
  }

  // Kidney pain patterns
  if (/(?:kidney pain|flank pain|renal pain|kidney stones|renal colic|nephrolithiasis|loin pain)/.test(input)) {
    return { reply: `${templates.kidney_pain || templates.default}` };
  }

  /* =========================
     MUSCULOSKELETAL
  ========================== */
  
  // Back pain patterns
  if (/(?:back pain|lower back pain|backpain|upper back pain|spinal pain|backache|lumbago|sciatica|disc pain)/.test(input)) {
    return { reply: `${templates.back_pain || templates.default}` };
  }

  // Shoulder pain patterns
  if (/(?:shoulder pain|rotator cuff|frozen shoulder|shoulder stiffness|shoulder injury|shoulder arthritis)/.test(input)) {
    return { reply: `${templates.shoulder_pain || templates.default}` };
  }

  // Elbow pain patterns
  if (/(?:elbow pain|tennis elbow|golfer's elbow|elbow stiffness|elbow swelling|elbow arthritis)/.test(input)) {
    return { reply: `${templates.elbow_pain || templates.default}` };
  }

  // Wrist pain patterns
  if (/(?:wrist pain|carpal tunnel|wrist stiffness|wrist swelling|wrist injury|de quervain's)/.test(input)) {
    return { reply: `${templates.wrist_pain || templates.default}` };
  }

  // Hand/finger problems patterns
  if (/(?:hand pain|finger pain|trigger finger|arthritis hands|hand numbness|finger swelling|dupytren's contracture)/.test(input)) {
    return { reply: `${templates.hand_finger_problems || templates.default}` };
  }

  // Hip pain patterns
  if (/(?:hip pain|hip arthritis|hip stiffness|hip injury|groin pain|trochanteric pain)/.test(input)) {
    return { reply: `${templates.hip_pain || templates.default}` };
  }

  // Knee pain patterns
  if (/(?:knee pain|knee swelling|knee stiffness|knee injury|knee arthritis|meniscus tear|acl injury)/.test(input)) {
    return { reply: `${templates.knee_pain || templates.default}` };
  }

  // Ankle/foot pain patterns
  if (/(?:ankle pain|foot pain|heel pain|plantar fasciitis|ankle swelling|foot swelling|bunions|hammer toes)/.test(input)) {
    return { reply: `${templates.ankle_foot_pain || templates.default}` };
  }

  // Leg pain/swelling patterns
  if (/(?:leg pain|leg swelling|calf pain|shin pain|thigh pain|leg cramps|varicose veins|deep vein thrombosis|dvt)/.test(input)) {
    return { reply: `${templates.leg_pain_swelling || templates.default}` };
  }

  /* =========================
     SKIN CONDITIONS
  ========================== */
  
  // Rash patterns
  if (/(?:rash|skin rash|eruption|spots on skin|red patches|skin lesions|skin redness|dermatitis)/.test(input)) {
    return { reply: `${templates.rash || templates.default}` };
  }

  // Itching patterns
  if (/(?:itching|itchy skin|pruritus|skin itching|scratching|itch all over|localized itching)/.test(input)) {
    return { reply: `${templates.itching || templates.default}` };
  }

  // Acne patterns
  if (/(?:acne|pimples|zits|blackheads|whiteheads|breakout|cystic acne|acne vulgaris)/.test(input)) {
    return { reply: `${templates.acne || templates.default}` };
  }

  /* =========================
     INFECTIOUS DISEASES
  ========================== */
  
  // Fever patterns
  if (/(?:fever|temperature|high temp|hot body|fevr|fvr|fewer|chills|night sweats|pyrexia)/.test(input)) {
    return { reply: `${templates.fever || templates.default}` };
  }

  // Common cold patterns
  if (/(?:common cold|cold symptoms|runny nose|sneezing|nasal congestion|postnasal drip|rhinovirus)/.test(input)) {
    return { reply: `${templates.common_cold || templates.default}` };
  }

  // Flu patterns
  if (/(?:flu|influenza|seasonal flu|flu symptoms|influenza virus|body aches fever)/.test(input)) {
    return { reply: `${templates.flu || templates.default}` };
  }

  // STI patterns
  if (/(?:sti|std|sexually transmitted|chlamydia|gonorrhea|syphilis|herpes|hpv|trichomonas)/.test(input)) {
    return { reply: `${templates.sti || templates.default}` };
  }

  /* =========================
     MENTAL HEALTH
  ========================== */
  
  // Depression patterns
  if (/(?:depression|depressed|sadness|hopeless|suicidal|down mood|low mood|anhedonia)/.test(input)) {
    return { reply: `${templates.depression || templates.default}` };
  }

  // Anxiety patterns
  if (/(?:anxiety|anxious|panic attack|worry|nervous|stress|panic disorder|generalized anxiety)/.test(input)) {
    return { reply: `${templates.anxiety || templates.default}` };
  }

  // Stress patterns
  if (/(?:stress|burnout|overwhelmed|work stress|emotional stress|stress management)/.test(input)) {
    return { reply: `${templates.stress || templates.default}` };
  }

  // Insomnia patterns
  if (/(?:insomnia|can't sleep|sleep problem|waking up|tired but can't sleep|sleep disorder|sleep difficulties)/.test(input)) {
    return { reply: `${templates.insomnia || templates.default}` };
  }

  /* =========================
     CHRONIC CONDITIONS
  ========================== */
  
  // Diabetes symptoms patterns
  if (/(?:diabetes|high blood sugar|low blood sugar|hyperglycemia|hypoglycemia|blood glucose|type 1 diabetes|type 2 diabetes)/.test(input)) {
    return { reply: `${templates.diabetes_symptoms || templates.default}` };
  }

  // Hypertension patterns
  if (/(?:high blood pressure|hypertension|bp high|elevated blood pressure|blood pressure problems)/.test(input)) {
    return { reply: `${templates.hypertension || templates.default}` };
  }

  // Thyroid problems patterns
  if (/(?:thyroid|hypothyroid|hyperthyroid|tsh|t3|t4|goiter|thyroid nodule|hashimoto's|graves' disease)/.test(input)) {
    return { reply: `${templates.thyroid_problems || templates.default}` };
  }

  // Autoimmune diseases patterns
  if (/(?:autoimmune|rheumatoid arthritis|lupus|sle|sjogren's|scleroderma|autoimmune disease)/.test(input)) {
    return { reply: `${templates.autoimmune_diseases || templates.default}` };
  }

  // Cancer warning signs patterns
  if (/(?:cancer warning|cancer symptoms|lump|unexplained weight loss|unusual bleeding|caution)/.test(input)) {
    return { reply: `${templates.cancer_warning_signs || templates.default}` };
  }

  // Chronic pain patterns
  if (/(?:chronic pain|long-term pain|persistent pain|pain management|fibromyalgia|neuropathic pain)/.test(input)) {
    return { reply: `${templates.chronic_pain || templates.default}` };
  }

  /* =========================
     WOMEN'S HEALTH
  ========================== */
  
  // Menstrual problems patterns
  if (/(?:menstrual problems|menstrual problem|period problems|period problem|irregular periods|menstrual cycle|menstrual issues|pms|pmdd|dysmenorrhea|period cramps|menstrual cramps)/.test(input)) {
    return { reply: `${templates.menstrual_problems || templates.default}` };
  }

  // Heavy periods patterns
  if (/(?:heavy periods|heavy bleeding|menorrhagia|soaking pads|clots|excessive bleeding|flooding)/.test(input)) {
    return { reply: `${templates.heavy_periods || templates.default}` };
  }

  // Vaginal discharge patterns
  if (/(?:vaginal discharge|abnormal discharge|yeast infection|bacterial vaginosis|trichomoniasis|vaginal itching|vaginal odor|vaginal burning)/.test(input)) {
    return { reply: `${templates.vaginal_discharge || templates.default}` };
  }

  // Pregnancy concerns patterns
  if (/(?:pregnancy concerns|pregnant worry|pregnancy symptoms|missed period|morning sickness|gestation|expecting|prenatal care|pregnancy complication)/.test(input)) {
    return { reply: `${templates.pregnancy_concerns || templates.default}` };
  }

  // Breast concerns patterns
  if (/(?:breast concerns|breast lump|breast pain|mastalgia|nipple discharge|breast swelling|breast tenderness|breast changes|nipple changes)/.test(input)) {
    return { reply: `${templates.breast_concerns || templates.default}` };
  }

  // PCOS patterns
  if (/(?:pcos|pcod|polycystic ovary|irregular periods|hormonal imbalance|hirsutism|ovarian cysts|polycystic ovarian)/.test(input)) {
    return { reply: `${templates.pcos || templates.default}` };
  }

  // Menopause patterns
  if (/(?:menopause symptoms|hot flashes|night sweats|perimenopause|change of life|menopausal symptoms|vaginal dryness|menopause transition)/.test(input)) {
    return { reply: `${templates.menopause_symptoms || templates.default}` };
  }

  /* =========================
     MEN'S HEALTH
  ========================== */
  
  // Erectile dysfunction patterns
  if (/(?:erectile dysfunction|ed|impotence|sexual problem|erection problem|difficulty getting hard|sexual dysfunction)/.test(input)) {
    return { reply: `${templates.erectile_dysfunction || templates.default}` };
  }

  // Prostate concerns patterns
  if (/(?:prostate concerns|bph|enlarged prostate|urination problem|urine flow|frequent urination|prostatitis|prostate pain)/.test(input)) {
    return { reply: `${templates.prostate_concerns || templates.default}` };
  }

  // Male infertility patterns
  if (/(?:male infertility|low sperm|infertility men|fertility problem men|sperm count|azoospermia|sperm quality)/.test(input)) {
    return { reply: `${templates.male_infertility || templates.default}` };
  }

  // Testicular concerns patterns
  if (/(?:testicular concerns|testicular pain|testicle pain|scrotal pain|testicular swelling|testicular lump|orchitis|epididymitis|testicular cancer)/.test(input)) {
    return { reply: `${templates.testicular_concerns || templates.default}` };
  }

  /* =========================
     CHILD HEALTH
  ========================== */
  
  // Infant fever patterns
  if (/(?:infant fever|baby fever|newborn fever|fever in baby|fever child under 2|neonate fever|baby temperature)/.test(input)) {
    return { reply: `${templates.infant_fever || templates.default}` };
  }

  // Childhood viral patterns
  if (/(?:childhood viral|childhood virus|viral illness child|child sick|fever and rash child|kids virus|pediatric infection|child infection)/.test(input)) {
    return { reply: `${templates.childhood_viral || templates.default}` };
  }

  // Childhood rashes patterns
  if (/(?:childhood rash|rash in child|baby rash|kids rash|pediatric rash|child skin rash|child rash with fever)/.test(input)) {
    return { reply: `${templates.childhood_rashes || templates.default}` };
  }

  // Asthma childhood patterns
  if (/(?:childhood asthma|asthma child|wheezing child|breathing problem child|pediatric asthma|asthma attack child|child breathing difficulty)/.test(input)) {
    return { reply: `${templates.asthma_childhood || templates.default}` };
  }

  // ADHD patterns
  if (/(?:adhd child|attention deficit child|hyperactivity child|attention problems child|focus problems child|add child|child behavior problems|adhd symptoms)/.test(input)) {
    return { reply: `${templates.adhd || templates.default}` };
  }

  // Childhood behavior concerns patterns
  if (/(?:child behavior concerns|behavior problems child|temper tantrums|child aggression|child oppositional|behavioral issues child|child mental health)/.test(input)) {
    return { reply: `${templates.childhood_behavior_concerns || templates.default}` };
  }

  // Childhood developmental concerns patterns
  if (/(?:developmental concerns|developmental delay|milestones delayed|speech delay|walking late|learning problem child|autism concerns|developmental screening)/.test(input)) {
    return { reply: `${templates.childhood_developmental_concerns || templates.default}` };
  }

  /* =========================
     GERIATRIC HEALTH
  ========================== */
  
  // Fall prevention patterns
  if (/(?:fall prevention|balance problems|falls elderly|unsteady gait|dizziness elderly|mobility problems elderly|elderly falls)/.test(input)) {
    return { reply: `${templates.fall_prevention || templates.default}` };
  }

  /* =========================
     INJURIES & FIRST AID
  ========================== */
  
  // Animal bites patterns
  if (/(?:animal bite|dog bite|cat bite|rabies|bat bite|wild animal bite|pet bite|mammal bite)/.test(input)) {
    return { reply: `${templates.animal_bites || templates.default}` };
  }

  // Insect bites/stings patterns
  if (/(?:insect bites|insect sting|bee sting|wasp sting|mosquito bite|tick bite|spider bite|scorpion sting|bug bite)/.test(input)) {
    return { reply: `${templates.insect_bites_stings || templates.default}` };
  }

  // Snake bites patterns
  if (/(?:snake bite|snake bite emergency|venomous snake|rattlesnake bite|coral snake bite|copperhead bite|water moccasin bite)/.test(input)) {
    return { reply: `${templates.snake_bites || templates.default}` };
  }

  // Fractures patterns
  if (/(?:fracture|broken bone|bone injury|broken arm|broken leg|hairline fracture|stress fracture|bone break)/.test(input)) {
    return { reply: `${templates.fractures || templates.default}` };
  }

  // Burns patterns
  if (/(?:burn|scald|hot water burn|fire burn|chemical burn|sunburn|thermal burn|electrical burn|skin burn)/.test(input)) {
    return { reply: `${templates.burns || templates.default}` };
  }

  // Head injury patterns
  if (/(?:head injury|head trauma|concussion|hit head|head bump|skull injury|brain injury|tbi|head impact)/.test(input)) {
    return { reply: `${templates.head_injury || templates.default}` };
  }

  /* =========================
     NUTRITION & METABOLIC
  ========================== */
  
  // Weight management patterns
  if (/(?:weight management|weight loss|weight gain|obesity|underweight|body mass index|bmi|dieting|body weight)/.test(input)) {
    return { reply: `${templates.weight_management || templates.default}` };
  }

  // Vitamin deficiencies patterns
  if (/(?:vitamin deficiency|vitamin d|b12 deficiency|iron deficiency|anemia|nutritional deficiency|mineral deficiency|vitamin b12)/.test(input)) {
    return { reply: `${templates.vitamin_deficiencies || templates.default}` };
  }

  /* =========================
     ENVIRONMENTAL & TRAVEL
  ========================== */
  
  // Heat/cold injuries patterns
  if (/(?:heat stroke|heat exhaustion|frostbite|hypothermia|cold injury|heat injury|temperature injury|heat exposure|cold exposure)/.test(input)) {
    return { reply: `${templates.heat_cold_injuries || templates.default}` };
  }

  // Travel medicine patterns
  if (/(?:travel health|vaccination travel|malaria prevention|traveler's diarrhea|jet lag|altitude sickness|travel medicine|travel vaccination)/.test(input)) {
    return { reply: `${templates.travel_medicine || templates.default}` };
  }

  /* =========================
     COMPLEMENTARY MEDICINE
  ========================== */
  
  // Alternative therapies patterns
  if (/(?:alternative therapy|complementary medicine|acupuncture|chiropractic|herbal medicine|massage therapy|meditation|yoga|holistic medicine)/.test(input)) {
    return { reply: `${templates.alternative_therapies || templates.default}` };
  }

  /* =========================
     MEDICATION MANAGEMENT
  ========================== */
  
  // Medication safety patterns
  if (/(?:medication safety|drug interactions|side effects|polypharmacy|medication adherence|pill organizer|medication management|drug safety)/.test(input)) {
    return { reply: `${templates.medication_safety || templates.default}` };
  }

  /* =========================
     HEALTH MAINTENANCE
  ========================== */
  
  // Preventive screening patterns
  if (/(?:preventive screening|health screening|mammogram|colonoscopy|psa test|pap smear|preventive care|health checkup)/.test(input)) {
    return { reply: `${templates.preventive_screening || templates.default}` };
  }

  /* =========================
     EMERGENCY RESPONSE
  ========================== */
  
  // CPR/first aid patterns
  if (/(?:cpr|firstaid|first aid|cardiopulmonary resuscitation|emergency response|heimlich|choking emergency|bleeding control|life support)/.test(input)) {
    return { reply: `${templates.cpr_first_aid || templates.default}` };
  }

  /* =========================
     TELEHEALTH GUIDANCE
  ========================== */
  
  // Telehealth preparation patterns
  if (/(?:telehealth|virtual visit|online doctor|telemedicine|video consultation|remote healthcare|virtual care|digital health)/.test(input)) {
    return { reply: `${templates.telehealth_preparation || templates.default}` };
  }

  /* =========================
     GENERAL SYMPTOMS (Additional)
  ========================== */
  
  // Weakness patterns
  if (/(?:weakness|muscle weakness|fatigue|tiredness|lethargy|loss of strength|exhaustion|general weakness)/.test(input)) {
    return { reply: `${templates.weakness || templates.default}` };
  }

  // Numbness patterns
  if (/(?:numbness|tingling|pins and needles|paresthesia|loss of sensation|neuropathy|numb feeling)/.test(input)) {
    return { reply: `${templates.numbness || templates.default}` };
  }

  // Dizziness patterns
  if (/(?:dizziness|lightheaded|vertigo|spinning|unsteady|feeling faint|balance problems|dizzy spells)/.test(input)) {
    return { reply: `${templates.dizziness || templates.default}` };
  }

  // Swelling patterns
  if (/(?:swelling|edema|fluid retention|puffy|swollen|lymphedema|swollen limbs|swollen joints)/.test(input)) {
    return { reply: `${templates.swelling || templates.default}` };
  }

  // Skin problems (general) patterns
  if (/(?:skin problems|skin condition|dermatology|skin issues|skin disorder|skin abnormality)/.test(input)) {
    return { reply: `${templates.skin_problems || templates.default}` };
  }

  /* =========================
     DEFAULT FALLBACK
  ========================== */
  
  // If no pattern matches, provide general guidance
  return { 
    reply: `${templates.default || 'Sorry, I didn’t understand that. Please try asking in a different way.'}`
  };
}