import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ReferralButton from "../components/ReferalButton";
import { useNavigate } from "react-router-dom";

const CounselingPage = () => {
    const [selectedStars, setSelectedStars] = useState(0);
    const [selectedSymptoms, setSelectedSymptoms] = useState([]);
    const [showFreeTherapyOptions, setShowFreeTherapyOptions] = useState(false);
    const [selectedTherapy, setSelectedTherapy] = useState(null);
    const navigate = useNavigate();

    const symptoms = [
        "Excessive sleeping or lack of sleep",
        "Disturbed eating pattern",
        "Social isolation",
        "Difficulty communicating with others / persistent difficulty",
        "Difficulty in everyday activities (eating, drawing, bathing, etc.)",
        "Reading/writing issues",
        "Short-tempered or too aggressive",
        "Rigid behaviour patterns",
        "Repetitive & restricted behaviour",
        "Learning difficulty",
        "Delay in developmental milestones",
        "Hopelessness/helplessness",
        "Hearing or sensory impairment",
        "Seeks attention",
        "Seizures/fits",
        "Excessive mood variations",
        "Hypo sensitive / Hypersensitive",
        "Suicidal thoughts or behaviour",
        "Hallucinations / Delusions",
        "Self-harm",
        "Sensitivity to light or noise",
        "Disorganised thinking",
        "Obsession (recurring unwanted thoughts/images/urges)",
        "Addiction (persistent & intense use of substances/things)",
        "Disrespects or disobeys parents",
        "Parenting issues",
        "Disagreement with partner or parents",
        "Any fears",
        "Self doubt / focus more on self image",
        "Fight / arguments between parents or couples",
    ];

    const freeTherapyOptions = [
        "ADHD",
        "Autism",
        "Behavioural Challenges",
        "Depression",
        "Emotional Abuse",
        "Learning Delays",
        "Relationship",
        "Addiction",
        "Dementia",
        "Developmental Delays",
        "Fears & Phobias",
        "Impairments",
        "Intellectual Issues",
        "OCD",
        "Parenting",
        "Personality Disorders",
        "PTSD",
        "Self-Esteem",
        "SLD",
        "Social Anxiety",

    ];
    const therapyDetails = {
        "Addiction": {
            Symptoms: [
                "Strong urge or craving to use a substance (alcohol, drugs, gaming, etc.)",
                "Loss of control – difficulty stopping once you start",
                "Neglecting work, studies, or family responsibilities",
                "Mood swings, irritability, or withdrawal symptoms",
                "Continuing use even when it causes harm"
            ],
            Strategies: [
                "Seek professional counselling or therapy (CBT, motivational therapy)",
                "Join support groups (like AA/NA) to share and stay motivated",
                "Build healthy routines – regular sleep, exercise, hobbies",
                "Stay connected with supportive family and friends",
                "Avoid triggers and high-risk situations",
                "If needed, consult doctors for safe detox or medication support"
            ],
            Recovery: [
                "With proper treatment, 50–60% of people achieve long-term recovery",
                "Relapse is common, but each attempt builds strength toward success",
                "Millions worldwide have rebuilt healthy, fulfilling lives after addiction",
                "Therapy gives tools to stay in control and prevent relapse"
            ],
            Note: "Addiction is not a weakness—it’s a challenge that can be overcome. Every small step you take counts. Recovery is real, and many live happy, free lives after counselling."
        },

        "Dementia": {
            Symptoms: [
                "Increasing forgetfulness or memory loss",
                "Confusion about time, place, or familiar people",
                "Trouble with daily activities (managing money, cooking, dressing)",
                "Difficulty speaking or finding the right words",
                "Changes in mood, personality, or behaviour"
            ],
            Strategies: [
                "Get an early diagnosis – it helps in planning and slowing decline",
                "Engage in memory exercises, puzzles, and meaningful activities",
                "Maintain a structured daily routine for comfort and stability",
                "Encourage social interaction and light physical activity",
                "Provide family counselling for guidance and support",
                "Follow doctor’s advice for medicines and therapy"
            ],
            Recovery: [
                "Dementia cannot be fully cured, but early support slows progress",
                "Therapy, activities, and family involvement improve daily living quality",
                "Many people with dementia continue to enjoy meaningful life experiences",
                "Support for families reduces stress and builds coping strength"
            ],
            Note: "Dementia does not erase dignity or worth. With love, therapy, and support, people with dementia can live safer, more comfortable, and more fulfilling lives. Families are not alone—help is available."
        },

        "Fears & Phobias": {
            Symptoms: [
                "Intense worry or fear about specific situations (darkness, animals, exams, crowds, etc.)",
                "Physical reactions – sweating, fast heartbeat, shaky hands",
                "Avoiding places or situations due to fear",
                "Overthinking worst-case scenarios",
                "Difficulty focusing when faced with the feared object or thought"
            ],
            Strategies: [
                "Gradual exposure – face fears step by step, in a safe way",
                "Relaxation skills – deep breathing, mindfulness, grounding exercises",
                "Talking about fears with a trusted person or therapist",
                "Replace negative thoughts with positive, realistic ones",
                "Build confidence through small achievements",
                "Limit scary content (movies, social media triggers)"
            ],
            Recovery: [
                "80–90% improve with counselling/CBT techniques",
                "Fears often reduce within weeks of consistent therapy",
                "Millions of people worldwide overcome phobias and lead normal lives",
                "Early help prevents fears from controlling daily life"
            ],
            Note: "Fear is a feeling, not a life sentence. With guidance, you can retrain your mind to feel safe and strong. Many before you have conquered their fears—you can too."
        },

        "Impairments": {
            Symptoms: [
                "Child or adult learns and develops more slowly than peers",
                "Difficulty in problem-solving, reasoning, or abstract thinking",
                "Trouble with reading, writing, or daily self-care skills",
                "May need extra time and support for communication or academics",
                "Behavioural challenges like frustration, dependency, or withdrawal"
            ],
            Strategies: [
                "Early diagnosis and therapy tailored to type of impairment",
                "Use assistive devices (wheelchair, hearing aids, screen readers) when needed",
                "Special education and individualized learning support",
                "Counselling for emotional strength and self-acceptance",
                "Family training to provide patience, support, and structured routines",
                "Encourage independence and skill training for daily living"
            ],
            Recovery: [
                "Many impairments can be managed effectively with therapy and support systems",
                "Assistive technology and rehabilitation improve independence",
                "Early support increases confidence, education, and job opportunities",
                "Millions worldwide live happy and successful lives with impairments"
            ],
            Note: "An impairment does not limit your potential. With the right tools, therapy, and support, you can lead a life full of dignity, independence, and achievement."
        },

        "OCD": {
            Symptoms: [
                "Repeated, unwanted thoughts (obsessions) that cause anxiety",
                "Repetitive behaviours (compulsions) like checking, washing, counting, or arranging",
                "Feeling driven to perform rituals to relieve anxiety",
                "Time-consuming routines affecting school, work, or relationships",
                "Awareness that behaviours are excessive but feeling unable to stop"
            ],
            Strategies: [
                "Cognitive Behavioural Therapy (CBT) with Exposure & Response Prevention (ERP)",
                "Relaxation techniques and mindfulness to reduce anxiety",
                "Limit avoidance behaviours gradually and safely",
                "Family education to reduce criticism and increase support",
                "In severe cases, medication prescribed by psychiatrists may help"
            ],
            Recovery: [
                "60–70% of people improve significantly with CBT/ERP therapy",
                "Symptoms can reduce within 3–6 months of consistent counselling",
                "Many patients regain normal functioning and control over life",
                "Relapse prevention strategies ensure long-term stability"
            ],
            Note: "OCD is not about being “weak” or “strange.” It is a common, treatable condition. With therapy, countless people have learned to break free from rituals and regain peace of mind. You can too."
        },

        "Intellectual Issues": {
            Symptoms: [
                "Delayed developmental milestones (walking, talking, learning)",
                "Difficulty in reasoning, problem-solving, and abstract thinking",
                "Trouble in academics – reading, writing, numbers",
                "Challenges with daily self-care (dressing, hygiene, money handling)",
                "Behavioural concerns – frustration, dependency, low confidence",
                "Needs extra time and support compared to peers"
            ],
            Strategies: [
                "Early identification and Individualized Education Plans (IEPs)",
                "Special education support with simplified teaching methods",
                "Use of visual aids, repetition, and structured routines",
                "Behaviour therapy to handle frustration and improve social skills",
                "Life skills and vocational training for independence",
                "Regular counselling for family to build acceptance and coping",
                "Encourage participation in play, social activities, and community support"
            ],
            Recovery: [
                "Intellectual disability is lifelong, but skills and independence improve greatly with therapy",
                "Early intervention (before age 6) shows best outcomes",
                "Many individuals achieve independent or semi-independent living",
                "With supportive environments, people can study, work, and form relationships successfully"
            ],
            Note: "Intellectual issues do not take away a person’s ability to learn, grow, and live a meaningful life. Every small progress counts. With patience, love, and professional support, children and adults can achieve far more than expected."
        },

        "Parenting": {
            Symptoms: [
                "Balancing work, home, and child’s needs",
                "Managing behavioural issues like tantrums, defiance, or withdrawal",
                "Helping children cope with learning difficulties or special needs",
                "Communication gaps between parent and child (especially teens)",
                "Feeling guilty, stressed, or overwhelmed by parenting responsibilities",
                "Conflicts in parenting style between mother, father, or grandparents"
            ],
            Strategies: [
                "Consistent routines help children feel safe and stable",
                "Use positive reinforcement (praise, rewards) more than punishment",
                "Listen actively – allow children to share feelings without judgment",
                "Break tasks into small, achievable steps to reduce pressure",
                "Encourage independence while providing guidance",
                "Take care of your own mental health – calm parents raise calmer kids",
                "Seek professional counselling if conflicts or stress feel unmanageable"
            ],
            Recovery: [
                "Parenting interventions reduce stress and improve child behaviour in 70–80% of families",
                "Children show better emotional regulation and learning outcomes with positive parenting",
                "Parenting counselling helps rebuild confidence and healthy family bonds"
            ],
            Note: "Parenting does not come with a manual—but you don’t have to do it alone. With guidance, patience, and support, families can overcome challenges and grow stronger together."
        },

        "Personality Disorders": {
            Symptoms: [
                "Long-term patterns of thinking, feeling, and behaving that cause distress or problems in daily life",
                "Rigid and extreme ways of relating to others",
                "Difficulty in managing emotions or controlling impulses",
                "Struggles with relationships (unstable, intense, or distant)",
                "Low self-esteem, identity confusion, or fear of abandonment",
                "Mood swings, mistrust, aggression, dependency, or social withdrawal"
            ],
            Strategies: [
                "Psychotherapy (DBT, CBT, Schema Therapy)",
                "Medication may help with mood swings, anxiety, or depression",
                "Build stable daily routines",
                "Learn coping skills for emotions and relationships",
                "Family counselling to improve support and reduce conflicts",
                "Encourage healthy lifestyle – sleep, exercise, and avoiding alcohol/substance abuse"
            ],
            Recovery: [
                "With long-term therapy, 60–70% of patients show significant improvement",
                "Many people with Borderline Personality Disorder recover within 2–6 years",
                "Supportive family and professional help improve outcomes",
                "Personality disorders are challenging, but not a life sentence"
            ],
            Note: "A diagnosis of personality disorder does not mean you are “bad” or “broken.” With therapy, patience, and support, you can build stable relationships and live a fulfilling life."
        },

        "PTSD": {
            Symptoms: [
                "Reliving the trauma (flashbacks, nightmares, intrusive thoughts)",
                "Avoiding reminders of the event (places, people, conversations)",
                "Feeling constantly alert, tense, or easily startled",
                "Negative thoughts about self, others, or the world",
                "Emotional numbness or withdrawal from loved ones",
                "Trouble sleeping or concentrating",
                "Mood swings, irritability, guilt, or shame"
            ],
            Strategies: [
                "Grounding techniques (deep breathing, focusing on present moment)",
                "Keep a daily routine to feel safe and in control",
                "Talk about your feelings with a trusted person (do not isolate)",
                "Practice relaxation – yoga, meditation, or light exercise",
                "Avoid alcohol, drugs, or overuse of screens as coping tools",
                "Seek professional therapy (CBT, EMDR, trauma-focused therapy)"
            ],
            Recovery: [
                "With proper treatment like CBT and EMDR, 60–80% of people see major improvement",
                "Many people feel relief within 8–16 sessions of trauma-focused counselling",
                "Healing is possible at any stage of life – therapy helps process trauma safely",
                "Love, patience, and support from family make a huge difference"
            ],
            Note: "PTSD is your mind’s way of saying it has been through too much—but it can heal. The past does not have to control your future. With the right help, you can regain peace, safety, and joy in life."
        },

        "Self-Esteem": {
            Symptoms: [
                "Constant self-criticism or negative self-talk",
                "Feeling “not good enough” compared to others",
                "Difficulty accepting compliments",
                "Avoiding challenges due to fear of failure",
                "Over-dependence on others’ opinions for self-worth",
                "Struggles with decision-making or setting boundaries",
                "Feeling undeserving of success or happiness"
            ],
            Strategies: [
                "Practice positive self-talk – replace “I can’t” with “I’ll try”",
                "Set small, achievable goals and celebrate progress",
                "Write down 3 things you like about yourself daily",
                "Spend time with supportive and positive people",
                "Learn a new skill or hobby – success builds confidence",
                "Take care of your body (sleep, exercise, healthy food)",
                "Seek therapy or counselling to challenge negative beliefs"
            ],
            Recovery: [
                "70–80% of people improve self-esteem with therapy and self-practice",
                "CBT, affirmations, and group support work effectively within 8–12 weeks",
                "Low self-esteem is common, but not permanent",
                "Building self-esteem improves mental health, relationships, and success"
            ],
            Note: "You are more capable and worthy than you believe. Low self-esteem is just a filter – not the truth about who you are. With the right tools and support, you can learn to value yourself and live confidently."
        },

        "SLD": {
            Symptoms: [
                "Difficulty in reading (Dyslexia) – mixing up letters, slow reading, poor comprehension",
                "Difficulty in writing (Dysgraphia) – poor handwriting, spelling mistakes, trouble organizing thoughts",
                "Difficulty in math (Dyscalculia) – struggles with numbers or solving problems",
                "Slow learning compared to peers despite normal intelligence",
                "Trouble remembering instructions or sequences",
                "Low confidence, frustration, or school avoidance due to repeated struggles"
            ],
            Strategies: [
                "Use multi-sensory learning methods (visuals, audio, hands-on practice)",
                "Break learning into small, simple steps",
                "Provide extra time during tests and assignments",
                "Encourage strengths and talents (art, music, sports, creativity)",
                "Use assistive tools like reading software, calculators, or audio books",
                "Work with special educators, counsellors, and teachers as a team",
                "Focus on building confidence and emotional support along with academics"
            ],
            Recovery: [
                "SLD is not a problem of intelligence – children and adults can succeed with support",
                "Early intervention and special education improve learning outcomes by 60–80%",
                "Many successful people had learning difficulties but achieved great success",
                "With therapy and accommodations, individuals can lead happy, independent lives"
            ],
            Note: "Having a learning disability does not mean failure. It simply means learning differently. With the right strategies, patience, and encouragement, every child and adult with SLD can shine."
        },

        "Social Anxiety": {
            Symptoms: [
                "Intense fear of being judged or embarrassed in social situations",
                "Avoiding speaking, eating, or performing in front of others",
                "Physical signs: sweating, blushing, shaky voice, racing heartbeat",
                "Overthinking conversations ('Did I say something wrong?')",
                "Difficulty making friends or participating in group activities",
                "Feeling isolated, lonely, or 'different' from others"
            ],
            Strategies: [
                "Practice slow breathing before and during social situations",
                "Start with small, safe interactions and gradually face bigger challenges",
                "Prepare simple conversation starters in advance",
                "Challenge negative thoughts with positive, realistic ones",
                "Limit caffeine and stimulants that can increase anxiety",
                "Practice role-play or social skills training with a counsellor",
                "Seek therapy – CBT and exposure therapy are highly effective"
            ],
            Recovery: [
                "With proper therapy, 60–80% of people improve significantly",
                "Many report progress in 8–12 sessions of counselling",
                "Social anxiety is very common and highly treatable",
                "Countless people who once avoided social life now live confidently"
            ],
            Note: "Social anxiety does not define who you are. Step by step, you can learn to feel calm and confident around people. Every small effort builds strength – and the courage you need is already within you."
        }
    };

    const handleSymptomChange = (symptom) => {
        setSelectedSymptoms((prev) =>
            prev.includes(symptom)
                ? prev.filter((s) => s !== symptom)
                : [...prev, symptom]
        );
    };

    const handleSubmit = () => {
        navigate("/assignment");
    };

    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#6b2400] via-[#f76822] to-[#f76822] text-white">
            <Navbar />
            <section className="flex flex-col items-center justify-center text-center py-[12vh] px-4">
                <h1 className="text-4xl md:text-5xl font-bold text-white drop-shadow-lg mb-4">
                    Counseling & Therapy Support
                </h1>
                <p className="text-white/90 text-lg md:text-xl max-w-2xl">
                    Share your feelings and symptoms with us. Our goal is to guide your
                    mental wellbeing.
                </p>
            </section>
            {showFreeTherapyOptions && (
                <div className="bg-[#f76822]/90 p-6">
                    <h3 className="text-xl font-semibold underline mb-6 text-center">
                        Click below for Free Therapy Resources
                    </h3>

                    <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-4">
                        {freeTherapyOptions.map((therapy, idx) => (
                            <div
                                key={idx}
                                className="border border-white/30 rounded-xl bg-white/10 hover:bg-white/20 transition-all shadow-md hover:shadow-lg"
                            >
                                <button
                                    onClick={() => setSelectedTherapy(therapy)}
                                    className="w-full text-left px-6 py-4 font-medium text-white text-lg"
                                >
                                    {therapy}
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            )}
            <main className="flex justify-center flex-grow py-10 px-4 bg-gradient-to-b from-[#f76822] via-[#f76822] to-[#f76822]">
                <div className="bg-white/95 text-black rounded-2xl p-6 w-full max-w-6xl shadow-lg flex flex-col lg:flex-row gap-8">
                    <div className="flex-1 overflow-y-auto max-h-[70vh]">
                        <h3 className="text-2xl font-semibold text-orange-600 mb-2">
                            Tick 8–10 symptoms
                        </h3>
                        <p className="text-sm text-gray-500 mb-4">
                            (This info will be saved in your profile)
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {symptoms.map((item, index) => (
                                <label
                                    key={index}
                                    className="flex items-center border border-gray-300 rounded-lg p-2 cursor-pointer hover:bg-gray-100"
                                >
                                    <input
                                        type="checkbox"
                                        checked={selectedSymptoms.includes(item)}
                                        onChange={() => handleSymptomChange(item)}
                                        className="mr-2 accent-orange-500"
                                    />
                                    <span className="text-sm">{item}</span>
                                </label>
                            ))}
                        </div>
                    </div>
                    <div className="flex flex-col justify-center items-center w-full lg:w-1/3 gap-4">
                        <h4 className="font-medium text-gray-800 text-center">
                            How are you feeling right now?
                        </h4>

                        <div className="flex justify-center mb-6">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <span
                                    key={star}
                                    onClick={() => setSelectedStars(star)}
                                    className={`text-3xl cursor-pointer ${star <= selectedStars ? "text-yellow-400" : "text-gray-300"
                                        }`}
                                >
                                    ⭐
                                </span>
                            ))}
                        </div>

                        <div className="flex flex-col md:flex-row gap-3 w-full">
                            <button
                                onClick={() => handleSubmit("Paid Therapy")}
                                className="flex-1 bg-black text-white py-3 rounded-full text-lg hover:bg-gray-800 transition"
                            >
                                Paid Therapy
                            </button>

                            <button
                                onClick={() => setShowFreeTherapyOptions((prev) => !prev)}
                                className="flex-1 bg-black text-white py-3 rounded-full text-lg hover:bg-gray-700 transition"
                            >
                                Free Therapy
                            </button>

                            <button
                                onClick={handleSubmit}
                                className="flex-1 bg-black text-white py-3 rounded-full text-lg hover:bg-gray-700 transition"
                            >
                                Assignments
                            </button>
                        </div>
                    </div>
                </div>
            </main>
            {selectedTherapy && (
                <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
                    <div className="bg-white rounded-2xl max-w-3xl w-full p-6 relative overflow-y-auto max-h-[80vh] shadow-xl">
                        <button
                            onClick={() => setSelectedTherapy(null)}
                            className="absolute top-3 right-4 text-black text-2xl font-bold"
                        >
                            ×
                        </button>

                        <h2 className="text-2xl font-bold text-orange-600 mb-4 text-center">
                            {selectedTherapy}
                        </h2>

                        {therapyDetails[selectedTherapy]?.Symptoms ? (
                            <div className="space-y-6 text-gray-800">
                                <div>
                                    <h3 className="font-semibold text-lg text-orange-600">Symptoms</h3>
                                    <ul className="list-disc text-orange-500 list-inside">
                                        {therapyDetails[selectedTherapy].Symptoms.map((s, i) => (
                                            <li key={i}>{s}</li>
                                        ))}
                                    </ul>
                                </div>

                                <div>
                                    <h3 className="font-semibold text-lg text-orange-600">Basic Strategies</h3>
                                    <ul className="list-disc text-orange-500 list-inside">
                                        {therapyDetails[selectedTherapy].Strategies.map((s, i) => (
                                            <li key={i}>{s}</li>
                                        ))}
                                    </ul>
                                </div>

                                <div>
                                    <h3 className="font-semibold text-lg text-orange-600">Recovery Facts & Hope</h3>
                                    <ul className="list-disc text-orange-500 list-inside">
                                        {therapyDetails[selectedTherapy].Recovery.map((s, i) => (
                                            <li key={i}>{s}</li>
                                        ))}
                                    </ul>
                                </div>

                                <p className="italic text-orange-500">
                                    {therapyDetails[selectedTherapy].Note}
                                </p>
                            </div>
                        ) : (
                            <p className="text-center text-gray-600">No details available yet.</p>
                        )}
                    </div>
                </div>
            )}
            <ReferralButton />
            <Footer />
        </div>
    );
};

export default CounselingPage;
