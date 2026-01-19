import { templates } from "./templates";
import { getEmpathyReply } from "./empathy";

export function chatbotReply(text) {
  const input = text.toLowerCase();
  const empathy = getEmpathyReply();


  /* =========================
     HEAD & NEUROLOGICAL
  ========================== */
  
  // Hair loss patterns
  if (/(?:hair loss|hairloss |hairlos |hairfall|hair fall|harlosss|balding|alopecia|thinning hair|thinninghair|patchy hair loss|recedinghairline|receding hairline|telogen effluvium)/.test(input)) {
    return { reply: `${empathy}\n\n${templates.hair_loss || templates.default}` };
  }

  // Scalp issues patterns
  if (/(?:scalp problems|scalp itching|scalpitching |scalppain|scalp pain|dandruff|scalp psoriasis|seborrheic dermatitis|scalp infection)/.test(input)) {
    return { reply: `${empathy}\n\n${templates.scalp_issues || templates.default}` };
  }

  // Eye problems patterns
  if (/(?:eye pain|redeye|red eye|eyepain |blurryvision|vision problem|blurry vision|eye infection|conjunctivitis|pink eye|glaucoma|cataract|floaters|flashes|dry eyes|watery eyes|eye strain)/.test(input)) {
    return { reply: `${empathy}\n\n${templates.eye_problems || templates.default}` };
  }

  // Ear problems patterns
  if (/(?:ear pain|ear infection earloss earpain hearingloss|hearing loss|tinnitus|ear discharge|swimmer's ear|vertigo|dizziness|ear fullness|ear pressure|otitis)/.test(input)) {
    return { reply: `${empathy}\n\n${templates.ear_problems || templates.default}` };
  }

  // Nose problems patterns
  if (/(?:nosebleed |nose bleed|epistaxis|nasal congestion|runny nose|sinus pain|sinus pressure|postnasal drip|sinus infection|rhinitis|deviated septum|nasal polyps)/.test(input)) {
    return { reply: `${empathy}\n\n${templates.nose_problems || templates.default}` };
  }

  // Mouth problems patterns
  if (/(?:mouthulcers| mouth ulcers| mouthulcer |mouth ulcer| canker sores|oral thrush|tooth pain|gum pain|bleeding gums|dry mouth|bad breath|oral lesions|tongue problems|dental pain)/.test(input)) {
    return { reply: `${empathy}\n\n${templates.mouth_problems || templates.default}` };
  }

  // Throat problems patterns
  if (/(?:sore throat|throat pain| throatpain |throat|scratchy throat|pharyngitis|tonsillitis|throat infection|hoarseness|laryngitis|globus sensation|difficulty swallowing|dysphagia)/.test(input)) {
    return { reply: `${empathy}\n\n${templates.throat_problems || templates.default}` };
  }

  // Headache patterns (existing but refined)
  if (/(?:headache|head ache|migraine|head pain|headpain|headpain cephalalgia|tension headache|cluster headache|thunderclap headache|sinus headache)/.test(input)) {
    return { reply: `${empathy}\n\n${templates.headache}` };
  }

  // Neck pain patterns
  if (/(?:neck pain |nekpain|neckpain| nekpain |nek pain|stiff neck|cervical pain|neck stiffness|whiplash|cervical radiculopathy|torticollis)/.test(input)) {
    return { reply: `${empathy}\n\n${templates.neck_pain || templates.default}` };
  }

  // Dementia/memory patterns
  if (/(?:memory loss |memoryloss |memmory loss|memmoryloss| memmory|forgetfulness|dementia|alzheimer's|cognitive decline|confusion|memory problems|brain fog)/.test(input)) {
    return { reply: `${empathy}\n\n${templates.dementia_memory || templates.default}` };
  }

  /* =========================
     CHEST & RESPIRATORY
  ========================== */
  
  // Chest pain patterns (existing)
  if (/(?:chest pain|chestpain|chest tightness|angina|heart pain|breastbone pain|sternum pain|chest pressure|chest discomfort)/.test(input)) {
    return { reply: `${empathy}\n\n${templates.chest_pain}` };
  }

  // Shortness of breath patterns
  if (/(?:shortness of breath|difficulty breathing|dyspnea|breathlessness|can't breathe|hardbreathe|hardbreathe|wheezing|gasping|air hunger|respiratory distress)/.test(input)) {
    return { reply: `${empathy}\n\n${templates.shortness_of_breath || templates.default}` };
  }

  // Cough patterns
  if (/(?:cough|dry cough|wet cough|productive cough|whooping cough|persistent cough|chronic cough|barking cough|coughing blood|hemoptysis)/.test(input)) {
    return { reply: `${empathy}\n\n${templates.cough || templates.default}` };
  }

  // Palpitations patterns
  if (/(?:palpitations|heart racing|irregular heartbeat|skipped beats|heart flutter|arrhythmia|fast heartbeat|tachycardia|pounding heart)/.test(input)) {
    return { reply: `${empathy}\n\n${templates.palpitations || templates.default}` };
  }

  /* =========================
     ABDOMINAL & DIGESTIVE
  ========================== */
  
  // Abdominal pain patterns (existing)
  if (/(?:abdominal pain|stomach pain|belly ache|tummy pain|stomachache|abdomen pain|stomach cramps|gut pain)/.test(input)) {
    return { reply: `${empathy}\n\n${templates.abdominal_pain}` };
  }

  // Nausea/vomiting patterns
  if (/(?:nausea|vomiting|throwing up|sick to stomach|vomit|queasy|morning sickness|retching|dry heaves)/.test(input)) {
    return { reply: `${empathy}\n\n${templates.nausea_vomiting || templates.default}` };
  }

  // Diarrhea patterns
  if (/(?:diarrhea|loose motion|loosemotion|watery stool|frequent bowel|runny stool|gastroenteritis|stomach flu|food poisoning)/.test(input)) {
    return { reply: `${empathy}\n\n${templates.diarrhea || templates.default}` };
  }

  // Constipation patterns
  if (/(?:constipation|hard stool|stool|hardstool|difficult bowel|infrequent bowel|straining|bloated|impacted|irregular bowels)/.test(input)) {
    return { reply: `${empathy}\n\n${templates.constipation || templates.default}` };
  }

  // Heartburn patterns
  if (/(?:heartburn|acid reflux|gerd|indigestion|dyspepsia|burning|chest burn|regurgitation|bitter taste|acid taste)/.test(input)) {
    return { reply: `${empathy}\n\n${templates.heartburn || templates.default}` };
  }

  /* =========================
     GENITOURINARY
  ========================== */
  
  // Urinary problems patterns
  if (/(?:urinary problems|frequent urination|urinary urgency|painful urination|dysuria|blood in urine|hematuria|urinary incontinence|bladder pain)/.test(input)) {
    return { reply: `${empathy}\n\n${templates.urinary_problems || templates.default}` };
  }

  // Kidney pain patterns
  if (/(?:kidney pain|flank pain|renal pain|kidney stones|renal colic|nephrolithiasis|loin pain)/.test(input)) {
    return { reply: `${empathy}\n\n${templates.kidney_pain || templates.default}` };
  }

  // Vaginal discharge patterns
  if (/(?:vaginal discharge|abnormal discharge|yeast infection|bacterial vaginosis|trichomoniasis|vaginal itching|vaginal odor|vaginal burning)/.test(input)) {
    return { reply: `${empathy}\n\n${templates.vaginal_discharge || templates.default}` };
  }

  // Breast problems patterns
  if (/(?:breast pain|breast lump|mastalgia|nipple discharge|breast swelling|breast tenderness|breast changes|nipple changes)/.test(input)) {
    return { reply: `${empathy}\n\n${templates.breast_problems || templates.default}` };
  }

  /* =========================
     MUSCULOSKELETAL
  ========================== */
  
  // Back pain patterns (existing)
  if (/(?:back pain|lower back pain|upper back pain|spinal pain|backache|lumbago|sciatica|disc pain)/.test(input)) {
    return { reply: `${empathy}\n\n${templates.back_pain}` };
  }

  // Shoulder pain patterns
  if (/(?:shoulder pain|rotator cuff|frozen shoulder|shoulder stiffness|shoulder injury|shoulder arthritis)/.test(input)) {
    return { reply: `${empathy}\n\n${templates.shoulder_pain || templates.default}` };
  }

  // Elbow pain patterns
  if (/(?:elbow pain|tennis elbow|golfer's elbow|elbow stiffness|elbow swelling|elbow arthritis)/.test(input)) {
    return { reply: `${empathy}\n\n${templates.elbow_pain || templates.default}` };
  }

  // Wrist pain patterns
  if (/(?:wrist pain|carpal tunnel|wrist stiffness|wrist swelling|wrist injury|de quervain's)/.test(input)) {
    return { reply: `${empathy}\n\n${templates.wrist_pain || templates.default}` };
  }

  // Hand/finger problems patterns
  if (/(?:hand pain|finger pain|trigger finger|arthritis hands|hand numbness|finger swelling|dupytren's contracture)/.test(input)) {
    return { reply: `${empathy}\n\n${templates.hand_finger_problems || templates.default}` };
  }

  // Hip pain patterns
  if (/(?:hip pain|hip arthritis|hip stiffness|hip injury|groin pain|trochanteric pain)/.test(input)) {
    return { reply: `${empathy}\n\n${templates.hip_pain || templates.default}` };
  }

  // Knee pain patterns
  if (/(?:knee pain|knee swelling|knee stiffness|knee injury|knee arthritis|meniscus tear|acl injury)/.test(input)) {
    return { reply: `${empathy}\n\n${templates.knee_pain || templates.default}` };
  }

  // Ankle/foot pain patterns
  if (/(?:ankle pain|foot pain|heel pain|plantar fasciitis|ankle swelling|foot swelling|bunions|hammer toes)/.test(input)) {
    return { reply: `${empathy}\n\n${templates.ankle_foot_pain || templates.default}` };
  }

  // Leg pain/swelling patterns
  if (/(?:leg pain|leg swelling|calf pain|shin pain|thigh pain|leg cramps|varicose veins|deep vein thrombosis|dvt)/.test(input)) {
    return { reply: `${empathy}\n\n${templates.leg_pain_swelling || templates.default}` };
  }

  // Joint pain patterns (existing)
  if (/(?:joint pain|arthritis|arthralgia|joint swelling|joint stiffness|gout|pseudogout|inflammatory arthritis)/.test(input)) {
    return { reply: `${empathy}\n\n${templates.joint_pain}` };
  }

  /* =========================
     SKIN CONDITIONS
  ========================== */
  
  // Rash patterns (existing)
  if (/(?:rash|skin rash|eruption|spots on skin|red patches|skin lesions|skin redness|dermatitis)/.test(input)) {
    return { reply: `${empathy}\n\n${templates.rash}` };
  }

  // Itching patterns (existing)
  if (/(?:itching|itchy skin|pruritus|skin itching|scratching|itch all over|localized itching)/.test(input)) {
    return { reply: `${empathy}\n\n${templates.itching}` };
  }

  // Acne patterns
  if (/(?:acne|pimples|zits|blackheads|whiteheads|breakout|cystic acne|acne vulgaris)/.test(input)) {
    return { reply: `${empathy}\n\n${templates.acne || templates.default}` };
  }

  /* =========================
     INFECTIOUS DISEASES
  ========================== */
  
  // Fever patterns (existing)
  if (/(?:fever|temperature|high temp|hot body|fewer|chills|night sweats|pyrexia)/.test(input)) {
    return { reply: `${empathy}\n\n${templates.fever}` };
  }

  // Common cold patterns
  if (/(?:common cold|cold symptoms|runny nose|sneezing|nasal congestion|postnasal drip|rhinovirus)/.test(input)) {
    return { reply: `${empathy}\n\n${templates.common_cold || templates.default}` };
  }

  // Flu patterns
  if (/(?:flu|influenza|seasonal flu|flu symptoms|influenza virus|body aches fever)/.test(input)) {
    return { reply: `${empathy}\n\n${templates.flu || templates.default}` };
  }

  // STI patterns
  if (/(?:sti|std|sexually transmitted|chlamydia|gonorrhea|syphilis|herpes|hpv|trichomonas)/.test(input)) {
    return { reply: `${empathy}\n\n${templates.sti || templates.default}` };
  }

  /* =========================
     MENTAL HEALTH
  ========================== */
  
  // Depression patterns
  if (/(?:depression|depressed|sadness|hopeless|suicidal|down mood|low mood|anhedonia)/.test(input)) {
    return { reply: `${empathy}\n\n${templates.depression || templates.default}` };
  }

  // Anxiety patterns
  if (/(?:anxiety|anxious|panic attack|worry|nervous|stress|panic disorder|generalized anxiety)/.test(input)) {
    return { reply: `${empathy}\n\n${templates.anxiety || templates.default}` };
  }

  // Stress patterns
  if (/(?:stress|burnout|overwhelmed|work stress|emotional stress|stress management)/.test(input)) {
    return { reply: `${empathy}\n\n${templates.stress || templates.default}` };
  }

  // Insomnia patterns
  if (/(?:insomnia|can't sleep|sleep problem|waking up|tired but can't sleep|sleep disorder|sleep difficulties)/.test(input)) {
    return { reply: `${empathy}\n\n${templates.insomnia || templates.default}` };
  }

  /* =========================
     CHRONIC CONDITIONS
  ========================== */
  
  // Diabetes symptoms patterns
  if (/(?:diabetes|high blood sugar|low blood sugar|hyperglycemia|hypoglycemia|blood glucose|type 1 diabetes|type 2 diabetes)/.test(input)) {
    return { reply: `${empathy}\n\n${templates.diabetes_symptoms || templates.default}` };
  }

  // Hypertension patterns
  if (/(?:high blood pressure|hypertension|bp high|elevated blood pressure|blood pressure problems)/.test(input)) {
    return { reply: `${empathy}\n\n${templates.hypertension || templates.default}` };
  }

  // Thyroid problems patterns
  if (/(?:thyroid|hypothyroid|hyperthyroid|tsh|t3|t4|goiter|thyroid nodule|hashimoto's|graves' disease)/.test(input)) {
    return { reply: `${empathy}\n\n${templates.thyroid_problems || templates.default}` };
  }

  // Autoimmune diseases patterns
  if (/(?:autoimmune|rheumatoid arthritis|lupus|sle|sjogren's|scleroderma|autoimmune disease)/.test(input)) {
    return { reply: `${empathy}\n\n${templates.autoimmune_diseases || templates.default}` };
  }

  // Cancer warning signs patterns
  if (/(?:cancer warning|cancer symptoms|lump|unexplained weight loss|unusual bleeding|caution)/.test(input)) {
    return { reply: `${empathy}\n\n${templates.cancer_warning_signs || templates.default}` };
  }

  // Chronic pain patterns
  if (/(?:chronic pain|long-term pain|persistent pain|pain management|fibromyalgia|neuropathic pain)/.test(input)) {
    return { reply: `${empathy}\n\n${templates.chronic_pain || templates.default}` };
  }

  /* =========================
     WOMEN'S HEALTH
  ========================== */
  
  // Menstrual pain patterns (existing)
  if (/(?:menstrual pain|period pain|cramps|dysmenorrhea|monthly pain|menstrual cramps)/.test(input)) {
    return { reply: `${empathy}\n\n${templates.menstrual_pain}` };
  }

  // Heavy periods patterns (existing)
  if (/(?:heavy periods|heavy bleeding|menorrhagia|soaking pads|clots|excessive bleeding)/.test(input)) {
    return { reply: `${empathy}\n\n${templates.heavy_periods}` };
  }

  // Pregnancy symptoms patterns (existing)
  if (/(?:pregnant|pregnancy|missed period|morning sickness|gestation|expecting|prenatal)/.test(input)) {
    return { reply: `${empathy}\n\n${templates.pregnancy_symptoms}` };
  }

  // PCOS patterns (existing)
  if (/(?:pcos|pcod|polycystic ovary|irregular periods|hormonal imbalance|hirsutism|ovarian cysts)/.test(input)) {
    return { reply: `${empathy}\n\n${templates.pcos}` };
  }

  // Menopause patterns (existing)
  if (/(?:menopause|hot flashes|night sweats|perimenopause|change of life|menopausal|vaginal dryness)/.test(input)) {
    return { reply: `${empathy}\n\n${templates.menopause}` };
  }

  /* =========================
     MEN'S HEALTH
  ========================== */
  
  // Erectile dysfunction patterns (existing)
  if (/(?:erectile dysfunction|ed|impotence|sexual problem|erection problem|difficulty getting hard)/.test(input)) {
    return { reply: `${empathy}\n\n${templates.erectile_dysfunction}` };
  }

  // Prostate issues patterns (existing)
  if (/(?:prostate|bph|enlarged prostate|urination problem|urine flow|frequent urination|prostatitis)/.test(input)) {
    return { reply: `${empathy}\n\n${templates.prostate_issues}` };
  }

  // Male infertility patterns (existing)
  if (/(?:male infertility|low sperm|infertility men|fertility problem men|sperm count|azoospermia)/.test(input)) {
    return { reply: `${empathy}\n\n${templates.male_infertility}` };
  }

  // Testicular pain patterns
  if (/(?:testicular pain|testicle pain|scrotal pain|testicular swelling|testicular lump|orchitis|epididymitis)/.test(input)) {
    return { reply: `${empathy}\n\n${templates.testicular_pain || templates.default}` };
  }

  /* =========================
     CHILD HEALTH
  ========================== */
  
  // Infant fever patterns (existing)
  if (/(?:infant fever|baby fever|newborn fever|fever in baby|fever child under 2|neonate fever)/.test(input)) {
    return { reply: `${empathy}\n\n${templates.infant_fever}` };
  }

  // Childhood viral patterns (existing)
  if (/(?:childhood virus|viral illness child|child sick|fever and rash child|kids virus|pediatric infection)/.test(input)) {
    return { reply: `${empathy}\n\n${templates.childhood_viral}` };
  }

  // Asthma childhood patterns (existing)
  if (/(?:childhood asthma|asthma child|wheezing child|breathing problem child|pediatric asthma|asthma attack child)/.test(input)) {
    return { reply: `${empathy}\n\n${templates.asthma_childhood}` };
  }

  // ADHD patterns
  if (/(?:adhd|attention deficit|hyperactivity|attention problems|focus problems|add|child behavior problems)/.test(input)) {
    return { reply: `${empathy}\n\n${templates.adhd || templates.default}` };
  }

  // Childhood development patterns
  if (/(?:developmental delay|milestones|speech delay|walking late|learning problem child|autism|developmental concerns)/.test(input)) {
    return { reply: `${empathy}\n\n${templates.childhood_development || templates.default}` };
  }

  /* =========================
     GERIATRIC HEALTH
  ========================== */
  
  // Fall prevention patterns
  if (/(?:fall prevention|balance problems|falls|unsteady gait|dizziness elderly|mobility problems)/.test(input)) {
    return { reply: `${empathy}\n\n${templates.fall_prevention || templates.default}` };
  }

  /* =========================
     INJURIES & FIRST AID
  ========================== */
  
  // Animal bites patterns (existing)
  if (/(?:animal bite|dog bite|cat bite|snake bite|rabies|bat bite|wild animal bite|insect bite)/.test(input)) {
    return { reply: `${empathy}\n\n${templates.animal_bites}` };
  }

  // Insect bites/stings patterns
  if (/(?:insect sting|bee sting|wasp sting|mosquito bite|tick bite|spider bite|scorpion sting)/.test(input)) {
    return { reply: `${empathy}\n\n${templates.insect_bites_stings || templates.default}` };
  }

  // Fractures patterns (existing)
  if (/(?:fracture|broken bone|bone injury|broken arm|broken leg|hairline fracture|stress fracture)/.test(input)) {
    return { reply: `${empathy}\n\n${templates.fractures}` };
  }

  // Burns patterns
  if (/(?:burn|scald|hot water burn|fire burn|chemical burn|sunburn|thermal burn|electrical burn)/.test(input)) {
    return { reply: `${empathy}\n\n${templates.burns || templates.default}` };
  }

  // Head injury patterns
  if (/(?:head injury|head trauma|concussion|hit head|head bump|skull injury|brain injury|tbi)/.test(input)) {
    return { reply: `${empathy}\n\n${templates.head_injury || templates.default}` };
  }

  // Sprains/strains patterns
  if (/(?:sprain|strain|twisted ankle|pulled muscle|ligament injury|muscle tear|muscle strain)/.test(input)) {
    return { reply: `${empathy}\n\n${templates.sprains || templates.default}` };
  }

  /* =========================
     NUTRITION & METABOLIC
  ========================== */
  
  // Weight management patterns
  if (/(?:weight management|weight loss|weight gain|obesity|underweight|body mass index|bmi|dieting)/.test(input)) {
    return { reply: `${empathy}\n\n${templates.weight_management || templates.default}` };
  }

  // Vitamin deficiencies patterns
  if (/(?:vitamin deficiency|vitamin d|b12 deficiency|iron deficiency|anemia|nutritional deficiency|mineral deficiency)/.test(input)) {
    return { reply: `${empathy}\n\n${templates.vitamin_deficiencies || templates.default}` };
  }

  /* =========================
     ENVIRONMENTAL & TRAVEL
  ========================== */
  
  // Heat/cold injuries patterns
  if (/(?:heat stroke|heat exhaustion|frostbite|hypothermia|cold injury|heat injury|temperature injury)/.test(input)) {
    return { reply: `${empathy}\n\n${templates.heat_cold_injuries || templates.default}` };
  }

  // Travel medicine patterns
  if (/(?:travel health|vaccination travel|malaria|traveler's diarrhea|jet lag|altitude sickness|travel medicine)/.test(input)) {
    return { reply: `${empathy}\n\n${templates.travel_medicine || templates.default}` };
  }

  /* =========================
     COMPLEMENTARY MEDICINE
  ========================== */
  
  // Alternative therapies patterns
  if (/(?:alternative therapy|complementary medicine|acupuncture|chiropractic|herbal medicine|massage therapy|meditation|yoga)/.test(input)) {
    return { reply: `${empathy}\n\n${templates.alternative_therapies || templates.default}` };
  }

  /* =========================
     MEDICATION MANAGEMENT
  ========================== */
  
  // Medication safety patterns
  if (/(?:medication safety|drug interactions|side effects|polypharmacy|medication adherence|pill organizer)/.test(input)) {
    return { reply: `${empathy}\n\n${templates.medication_safety || templates.default}` };
  }

  /* =========================
     HEALTH MAINTENANCE
  ========================== */
  
  // Preventive screening patterns
  if (/(?:preventive screening|health screening|mammogram|colonoscopy|psa test|pap smear|preventive care)/.test(input)) {
    return { reply: `${empathy}\n\n${templates.preventive_screening || templates.default}` };
  }

  /* =========================
     EMERGENCY RESPONSE
  ========================== */
  
  // CPR/first aid patterns
  if (/(?:cpr|first aid|cardiopulmonary resuscitation|emergency response|heimlich|choking|bleeding control)/.test(input)) {
    return { reply: `${empathy}\n\n${templates.cpr_first_aid || templates.default}` };
  }

  /* =========================
     TELEHEALTH GUIDANCE
  ========================== */
  
  // Telehealth preparation patterns
  if (/(?:telehealth|virtual visit|online doctor|telemedicine|video consultation|remote healthcare)/.test(input)) {
    return { reply: `${empathy}\n\n${templates.telehealth_preparation || templates.default}` };
  }

  /* =========================
     GENERAL SYMPTOMS (Additional)
  ========================== */
  
  // Weakness patterns
  if (/(?:weakness|muscle weakness|fatigue|tiredness|lethargy|loss of strength|exhaustion)/.test(input)) {
    return { reply: `${empathy}\n\n${templates.weakness || templates.default}` };
  }

  // Numbness patterns
  if (/(?:numbness|tingling|pins and needles|paresthesia|loss of sensation|neuropathy)/.test(input)) {
    return { reply: `${empathy}\n\n${templates.numbness || templates.default}` };
  }

  // Dizziness patterns
  if (/(?:dizziness|lightheaded|vertigo|spinning|unsteady|feeling faint|balance problems)/.test(input)) {
    return { reply: `${empathy}\n\n${templates.dizziness || templates.default}` };
  }

  // Swelling patterns
  if (/(?:swelling|edema|fluid retention|puffy|swollen|lymphedema)/.test(input)) {
    return { reply: `${empathy}\n\n${templates.swelling || templates.default}` };
  }

  /* =========================
     DEFAULT FALLBACK
  ========================== */
  
  // If no pattern matches, provide general guidance
  return { 
    reply: `${empathy}\n\n${templates.default || 'I understand you have a health concern. Please describe your symptoms in more detail, including: 1) What you are experiencing, 2) How long it has been going on, 3) How severe it is (1-10 scale), 4) Your age and gender, and 5) Any other symptoms you may have. This will help me provide more specific guidance.'}`
  };
}