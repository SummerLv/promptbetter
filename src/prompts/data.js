// PromptBetter - AI Prompt Templates Data
// Categories and prompts database

const CATEGORIES = [
    { id: 'writing', name: 'Writing', icon: '✍️', count: 85, desc: 'Blog posts, emails, copy, stories' },
    { id: 'coding', name: 'Coding', icon: '💻', count: 72, desc: 'Debug, refactor, generate, explain' },
    { id: 'marketing', name: 'Marketing', icon: '📈', count: 65, desc: 'SEO, ads, social media, funnels' },
    { id: 'business', name: 'Business', icon: '💼', count: 58, desc: 'Strategy, analysis, planning' },
    { id: 'education', name: 'Education', icon: '📚', count: 45, desc: 'Teaching, learning, tutoring' },
    { id: 'creative', name: 'Creative', icon: '🎨', count: 52, desc: 'Art, design, brainstorming' },
    { id: 'productivity', name: 'Productivity', icon: '⚡', count: 40, desc: 'Workflows, automation, planning' },
    { id: 'data', name: 'Data & Analytics', icon: '📊', count: 35, desc: 'SQL, analysis, visualization' },
    { id: 'sales', name: 'Sales', icon: '🎯', count: 30, desc: 'Outreach, proposals, closing' },
    { id: 'hr', name: 'HR & Career', icon: '👤', count: 28, desc: 'Resumes, interviews, hiring' },
    { id: 'legal', name: 'Legal', icon: '⚖️', count: 20, desc: 'Contracts, policies, compliance' },
    { id: 'health', name: 'Health & Wellness', icon: '🏥', count: 18, desc: 'Fitness, nutrition, mental health' },
];

const PROMPTS = [
    // === WRITING ===
    {
        id: 1,
        title: 'Blog Post Writer',
        category: 'writing',
        models: ['chatgpt', 'claude', 'gemini'],
        tags: ['blog', 'content', 'seo'],
        popularity: 98,
        prompt: `You are an expert blog writer and SEO specialist. Write a comprehensive, engaging blog post about [TOPIC].

Requirements:
- Length: 1500-2000 words
- Include an attention-grabbing headline
- Use H2 and H3 subheadings for structure
- Write in a conversational, authoritative tone
- Include 3-5 actionable takeaways
- Add a compelling introduction that hooks the reader
- End with a strong call-to-action
- Naturally incorporate these keywords: [KEYWORDS]
- Use short paragraphs (2-3 sentences max)
- Include relevant examples and data points

Target audience: [AUDIENCE]
Tone: [professional/casual/humorous/inspirational]`
    },
    {
        id: 2,
        title: 'Email Copywriter',
        category: 'writing',
        models: ['chatgpt', 'claude', 'gemini'],
        tags: ['email', 'copywriting', 'conversion'],
        popularity: 95,
        prompt: `You are a world-class email copywriter who has generated millions in revenue. Write a high-converting email for the following:

Purpose: [GOAL - e.g., product launch, nurture sequence, re-engagement]
Product/Service: [DESCRIPTION]
Target Audience: [WHO]
Desired Action: [WHAT YOU WANT THEM TO DO]

Structure the email with:
1. Subject line (3 options - one curiosity-driven, one benefit-driven, one urgency-driven)
2. Preview text
3. Opening hook (first 2 lines are crucial)
4. Body copy with clear benefits
5. Social proof element
6. Clear CTA button text
7. P.S. line

Keep it under 300 words. Use power words. Create urgency without being pushy.`
    },
    {
        id: 3,
        title: 'LinkedIn Post Generator',
        category: 'writing',
        models: ['chatgpt', 'claude', 'gemini'],
        tags: ['linkedin', 'social', 'personal-brand'],
        popularity: 92,
        prompt: `Create a viral LinkedIn post about [TOPIC].

Format rules:
- Start with a bold, counterintuitive hook (first line must stop the scroll)
- Use short lines (1-2 sentences per paragraph)
- Include plenty of white space
- Add relevant emojis sparingly
- End with a question to drive engagement
- Include 3-5 relevant hashtags
- Keep total length under 1300 characters

Post style: [storytelling/educational/controversial/inspirational]
My industry: [YOUR INDUSTRY]
Key message: [WHAT YOU WANT PEOPLE TO REMEMBER]`
    },
    {
        id: 4,
        title: 'Product Description Writer',
        category: 'writing',
        models: ['chatgpt', 'claude', 'gemini'],
        tags: ['ecommerce', 'product', 'conversion'],
        popularity: 88,
        prompt: `Write a compelling product description that sells.

Product: [NAME]
Category: [TYPE]
Key Features: [LIST 3-5 FEATURES]
Target Customer: [WHO BUYS THIS]
Price Point: [RANGE]
Unique Selling Point: [WHAT MAKES IT DIFFERENT]

Write in this structure:
1. Headline (benefit-focused, under 10 words)
2. Subheadline (expand on the benefit)
3. Opening paragraph (paint the problem/desire)
4. 3-5 bullet points (features → benefits)
5. Social proof line
6. Urgency/scarcity element
7. CTA

Tone: Luxurious yet approachable. Make the reader FEEL something.`
    },
    {
        id: 5,
        title: 'Story/Fiction Writer',
        category: 'writing',
        models: ['chatgpt', 'claude'],
        tags: ['fiction', 'creative', 'storytelling'],
        popularity: 85,
        prompt: `You are a master storyteller. Write a [LENGTH] story with these parameters:

Genre: [GENRE]
Setting: [TIME AND PLACE]
Main Character: [BRIEF DESCRIPTION]
Conflict: [CENTRAL PROBLEM]
Theme: [UNDERLYING MESSAGE]
Tone: [DARK/LIGHT/HUMOROUS/MYSTERIOUS]

Writing guidelines:
- Show, don't tell
- Use vivid sensory details
- Create compelling dialogue
- Build tension progressively
- End with a satisfying but unexpected resolution
- Use varied sentence structure
- Avoid clichés and purple prose`
    },

    // === CODING ===
    {
        id: 6,
        title: 'Code Review Expert',
        category: 'coding',
        models: ['claude', 'chatgpt', 'gemini'],
        tags: ['review', 'quality', 'best-practices'],
        popularity: 96,
        prompt: `You are a senior software engineer conducting a thorough code review. Analyze the following code:

\`\`\`[LANGUAGE]
[PASTE YOUR CODE HERE]
\`\`\`

Review for:
1. **Bugs & Logic Errors** - Any potential runtime issues?
2. **Performance** - Time/space complexity concerns?
3. **Security** - Input validation, injection risks, auth issues?
4. **Readability** - Naming, structure, comments?
5. **Best Practices** - Design patterns, SOLID principles?
6. **Edge Cases** - What inputs could break this?
7. **Testing** - What test cases are needed?

For each issue found:
- Rate severity: 🔴 Critical | 🟡 Warning | 🟢 Suggestion
- Explain WHY it's a problem
- Provide the FIXED code

End with an overall quality score (1-10) and top 3 priorities.`
    },
    {
        id: 7,
        title: 'Full-Stack Feature Builder',
        category: 'coding',
        models: ['claude', 'chatgpt'],
        tags: ['fullstack', 'feature', 'architecture'],
        popularity: 94,
        prompt: `You are a full-stack developer. Build a complete feature implementation.

Feature: [DESCRIBE THE FEATURE]
Tech Stack: [e.g., React + Node.js + PostgreSQL]
Authentication: [YES/NO, method]
API Style: [REST/GraphQL]

Deliver:
1. **Database Schema** - Tables, relationships, indexes
2. **API Endpoints** - Routes, request/response shapes, validation
3. **Backend Logic** - Service layer, error handling, business rules
4. **Frontend Components** - React components with hooks, state management
5. **Tests** - Unit tests for critical paths
6. **Migration Script** - SQL for database changes

Requirements:
- Follow [STYLE GUIDE] conventions
- Include error handling for all edge cases
- Add TypeScript types/interfaces
- Include loading and error states in UI
- Make it production-ready`
    },
    {
        id: 8,
        title: 'Debug Detective',
        category: 'coding',
        models: ['claude', 'chatgpt', 'gemini'],
        tags: ['debug', 'troubleshoot', 'fix'],
        popularity: 93,
        prompt: `You are a debugging expert. Help me fix this issue:

**Error Message:**
\`\`\`
[PASTE ERROR HERE]
\`\`\`

**Relevant Code:**
\`\`\`[LANGUAGE]
[PASTE CODE HERE]
\`\`\`

**What I've Already Tried:**
[LIST ATTEMPTS]

**Expected Behavior:** [WHAT SHOULD HAPPEN]
**Actual Behavior:** [WHAT HAPPENS INSTEAD]
**Environment:** [OS, versions, dependencies]

Please:
1. Identify the root cause (not just the symptom)
2. Explain WHY this error occurs
3. Provide the fix with explanation
4. Suggest how to prevent this in the future
5. If multiple possible causes, rank them by likelihood`
    },
    {
        id: 9,
        title: 'API Documentation Generator',
        category: 'coding',
        models: ['claude', 'chatgpt'],
        tags: ['docs', 'api', 'documentation'],
        popularity: 87,
        prompt: `Generate comprehensive API documentation for the following endpoint:

Endpoint: [METHOD] [PATH]
Purpose: [WHAT IT DOES]
Auth: [REQUIRED/OPTIONAL, TYPE]

Include:
1. **Overview** - One-line description
2. **Authentication** - How to authenticate
3. **Request**
   - Headers (table)
   - Path parameters (table)
   - Query parameters (table)
   - Request body (JSON example + field descriptions)
4. **Response**
   - Success (200) - JSON example
   - Error responses (400, 401, 403, 404, 500) with examples
5. **Rate Limiting** - Limits and headers
6. **Code Examples** - cURL, JavaScript (fetch), Python (requests)
7. **Notes/Warnings** - Edge cases, deprecation notices

Format in Markdown. Make it developer-friendly.`
    },
    {
        id: 10,
        title: 'Regex Pattern Builder',
        category: 'coding',
        models: ['chatgpt', 'claude', 'gemini'],
        tags: ['regex', 'pattern', 'validation'],
        popularity: 86,
        prompt: `Create a regex pattern for the following requirement:

I need to match: [DESCRIBE WHAT TO MATCH]
Language/Flavor: [JavaScript/Python/Java/etc.]

Examples that SHOULD match:
- [EXAMPLE 1]
- [EXAMPLE 2]
- [EXAMPLE 3]

Examples that should NOT match:
- [COUNTER-EXAMPLE 1]
- [COUNTER-EXAMPLE 2]

Please provide:
1. The regex pattern
2. Explanation of each part (annotated)
3. Test cases (5 match, 5 no-match)
4. Common edge cases to watch for
5. Performance considerations
6. Alternative simpler patterns if the requirement allows`
    },

    // === MARKETING ===
    {
        id: 11,
        title: 'SEO Content Strategy',
        category: 'marketing',
        models: ['chatgpt', 'claude', 'gemini'],
        tags: ['seo', 'strategy', 'keywords'],
        popularity: 94,
        prompt: `You are an SEO expert who has ranked hundreds of pages on Google's first page. Create a content strategy for:

Website/Niche: [YOUR NICHE]
Current Domain Rating: [DR IF KNOWN]
Target Audience: [WHO]
Business Goal: [MORE TRAFFIC/LEADS/SALES]

Deliver:
1. **Keyword Research** - 20 target keywords with:
   - Search volume estimate (High/Med/Low)
   - Competition level
   - Search intent (informational/transactional/navigational)
   - Recommended content type

2. **Content Calendar** - 12-week plan with:
   - Topic + target keyword
   - Content type (guide/listicle/comparison/how-to)
   - Word count target
   - Internal linking strategy

3. **Quick Wins** - 5 keywords you can rank for within 30 days
4. **Long-term Plays** - 5 high-value keywords to build toward
5. **Technical SEO Checklist** - Top 10 things to fix first`
    },
    {
        id: 12,
        title: 'Facebook/Meta Ad Copy',
        category: 'marketing',
        models: ['chatgpt', 'claude'],
        tags: ['ads', 'facebook', 'paid'],
        popularity: 90,
        prompt: `Create high-converting Facebook/Meta ad copy for:

Product/Service: [WHAT YOU'RE SELLING]
Target Audience: [DEMOGRAPHICS + PSYCHOGRAPHICS]
Campaign Objective: [CONVERSIONS/LEADS/AWARENESS]
Budget Level: [LOW/MEDIUM/HIGH]
Landing Page URL: [IF RELEVANT]

Generate 3 ad variations:

**Variation 1: Problem-Agitate-Solution**
- Primary text (125 chars max for mobile)
- Headline (40 chars)
- Description (30 chars)
- CTA button recommendation

**Variation 2: Social Proof**
- (same structure)

**Variation 3: Direct Benefit**
- (same structure)

Also provide:
- Recommended audience targeting
- A/B testing suggestions
- Creative direction for the image/video`
    },
    {
        id: 13,
        title: 'Landing Page Copy',
        category: 'marketing',
        models: ['chatgpt', 'claude'],
        tags: ['landing-page', 'conversion', 'copy'],
        popularity: 91,
        prompt: `Write conversion-optimized landing page copy for:

Product: [NAME AND DESCRIPTION]
Price: [AMOUNT]
Target Customer: [IDEAL BUYER PROFILE]
Main Pain Point: [PROBLEM YOU SOLVE]
Unique Value Prop: [WHY YOU, NOT COMPETITORS]
Social Proof: [TESTIMONIALS, NUMBERS, LOGOS]

Write each section:
1. **Hero Section** - Headline + subheadline + CTA
2. **Problem Section** - Agitate the pain
3. **Solution Section** - Introduce your product
4. **Benefits** - 3-5 benefit blocks with icons
5. **How It Works** - 3-step process
6. **Social Proof** - Testimonial format
7. **FAQ** - 5 objection-handling questions
8. **Final CTA** - Urgency + guarantee + button

Tone: [PROFESSIONAL/FRIENDLY/BOLD]
Keep paragraphs short. Use power words. Create urgency.`
    },

    // === BUSINESS ===
    {
        id: 14,
        title: 'Business Plan Generator',
        category: 'business',
        models: ['chatgpt', 'claude', 'gemini'],
        tags: ['startup', 'plan', 'strategy'],
        popularity: 89,
        prompt: `Create a lean business plan for:

Business Idea: [DESCRIBE YOUR IDEA]
Industry: [SECTOR]
Target Market: [WHO ARE YOUR CUSTOMERS]
Initial Budget: [AMOUNT]
Timeline: [WHEN TO LAUNCH]

Include these sections:
1. **Executive Summary** (200 words)
2. **Problem & Solution** - What pain point? How do you solve it?
3. **Target Market** - Size, demographics, psychographics
4. **Revenue Model** - How will you make money?
5. **Go-to-Market Strategy** - First 100 customers
6. **Competitive Analysis** - Who else? Your moat?
7. **Financial Projections** - Month 1, 3, 6, 12 revenue estimates
8. **Key Metrics** - What to track?
9. **Risks & Mitigation** - Top 3 risks
10. **Next Steps** - First 30 days action plan

Keep it concise and actionable. No fluff.`
    },
    {
        id: 15,
        title: 'SWOT Analysis Creator',
        category: 'business',
        models: ['chatgpt', 'claude', 'gemini'],
        tags: ['analysis', 'strategy', 'planning'],
        popularity: 85,
        prompt: `Perform a comprehensive SWOT analysis for:

Company/Product: [NAME]
Industry: [SECTOR]
Current Stage: [STARTUP/GROWTH/MATURE]
Key Competitors: [LIST 2-3]

For each quadrant, provide 5-7 specific, actionable points:

**Strengths** (Internal Positives)
- What do you do better than competitors?
- What unique resources do you have?

**Weaknesses** (Internal Negatives)
- Where do you fall short?
- What do customers complain about?

**Opportunities** (External Positives)
- Market trends in your favor?
- Underserved customer segments?

**Threats** (External Negatives)
- Competitive threats?
- Regulatory or market risks?

Then provide:
- **Strategic Recommendations**: 3 actions combining S+O
- **Risk Mitigation**: 3 actions addressing W+T
- **Priority Matrix**: What to tackle first?`
    },

    // === EDUCATION ===
    {
        id: 16,
        title: 'Explain Like I\'m 5',
        category: 'education',
        models: ['chatgpt', 'claude', 'gemini'],
        tags: ['explain', 'simple', 'learning'],
        popularity: 93,
        prompt: `Explain [COMPLEX TOPIC] in the simplest possible terms.

Rules:
1. Use analogies from everyday life
2. No jargon - if you must use a technical term, define it immediately
3. Use concrete examples, not abstract concepts
4. Build understanding in layers: start super simple, then add complexity
5. Use "imagine..." or "think of it like..." framing
6. Maximum 3 key points
7. End with a one-sentence summary a 5-year-old would understand

Target understanding level: [5-year-old / high school student / non-technical adult]
Context: I need to understand this because [REASON]`
    },
    {
        id: 17,
        title: 'Study Guide Creator',
        category: 'education',
        models: ['chatgpt', 'claude', 'gemini'],
        tags: ['study', 'exam', 'learning'],
        popularity: 88,
        prompt: `Create a comprehensive study guide for:

Subject: [TOPIC/COURSE]
Exam Type: [MULTIPLE CHOICE/ESSAY/PRACTICAL]
Difficulty Level: [INTRODUCTORY/INTERMEDIATE/ADVANCED]
Time Until Exam: [DAYS/WEEKS]

Include:
1. **Key Concepts Summary** - Top 20 things you MUST know
2. **Flashcard Set** - 15 Q&A pairs for active recall
3. **Common Mistakes** - 5 traps students fall into
4. **Practice Questions** - 10 questions with answers
5. **Memory Tricks** - Mnemonics and associations
6. **Study Schedule** - Day-by-day plan for remaining time
7. **Quick Reference Sheet** - One-page cheat sheet

Make it engaging. Use analogies. Focus on understanding, not memorization.`
    },

    // === CREATIVE ===
    {
        id: 18,
        title: 'Midjourney Prompt Architect',
        category: 'creative',
        models: ['chatgpt', 'claude'],
        tags: ['midjourney', 'image', 'ai-art'],
        popularity: 91,
        prompt: `Generate 5 detailed Midjourney prompts for:

Concept: [WHAT I WANT TO CREATE]
Style: [REALISTIC/ARTISTIC/ABSTRACT/CINEMATIC]
Mood: [DARK/BRIGHT/DREAMY/ENERGETIC]
Use Case: [SOCIAL MEDIA/WEBSITE/PRINT/PERSONAL]

For each prompt include:
1. The main subject description (be hyper-specific)
2. Style keywords (e.g., "cinematic lighting, 8k, hyperrealistic")
3. Composition guidance (e.g., "rule of thirds, close-up, wide angle")
4. Color palette direction
5. Technical parameters (--ar, --v, --style, --chaos)

Format: /imagine [full prompt] --ar [ratio] --v 6 --style raw

Tips applied:
- Front-load the most important elements
- Use artist/photographer references when relevant
- Specify what to EXCLUDE with --no
- Include material/texture descriptions`
    },
    {
        id: 19,
        title: 'Brand Name Generator',
        category: 'creative',
        models: ['chatgpt', 'claude', 'gemini'],
        tags: ['branding', 'naming', 'startup'],
        popularity: 89,
        prompt: `Generate creative brand name options for:

Business Type: [WHAT YOU DO]
Target Audience: [WHO]
Brand Personality: [PLAYFUL/PROFESSIONAL/LUXURIOUS/EDGY/MINIMALIST]
Industry: [SECTOR]
Competitors: [NAMES TO AVOID SOUNDING LIKE]

Generate 20 name options across these styles:
1. **Invented Words** (5) - Unique, memorable, no dictionary meaning
2. **Compound Words** (5) - Two real words combined creatively
3. **Descriptive** (5) - Hints at what you do
4. **Abstract** (5) - Evocative, emotional connection

For each name:
- Check if .com domain is likely available (short/unique = probably taken)
- Rate memorability (1-5)
- Rate pronounceability (1-5)
- Suggest a tagline pairing
- Note any potential issues (cultural, trademark)

Top 3 recommendation with reasoning.`
    },

    // === PRODUCTIVITY ===
    {
        id: 20,
        title: 'Meeting Notes to Action Items',
        category: 'productivity',
        models: ['chatgpt', 'claude', 'gemini'],
        tags: ['meetings', 'action-items', 'summary'],
        popularity: 90,
        prompt: `Transform these meeting notes into structured action items:

[PASTE RAW MEETING NOTES HERE]

Output format:
1. **Meeting Summary** (3 sentences max)

2. **Key Decisions Made**
   - Decision 1
   - Decision 2

3. **Action Items** (table format)
| # | Task | Owner | Deadline | Priority |
|---|------|-------|----------|----------|
| 1 | ... | ... | ... | High/Med/Low |

4. **Open Questions** (unresolved items needing follow-up)

5. **Next Meeting** - Suggested agenda items

Rules:
- Be specific and actionable (not "look into X" but "research X and present findings")
- Assign deadlines even if not explicitly stated (suggest reasonable ones)
- Flag any blockers or dependencies between action items`
    },

    // === DATA ===
    {
        id: 21,
        title: 'SQL Query Builder',
        category: 'data',
        models: ['chatgpt', 'claude', 'gemini'],
        tags: ['sql', 'database', 'query'],
        popularity: 88,
        prompt: `Write an optimized SQL query for:

Database: [PostgreSQL/MySQL/SQLite/SQL Server]
Task: [DESCRIBE WHAT DATA YOU NEED]

Available tables and columns:
[PASTE YOUR SCHEMA OR DESCRIBE IT]

Requirements:
- [SPECIFIC CONDITIONS]
- [SORTING/GROUPING NEEDS]
- [ANY PERFORMANCE CONSTRAINTS]

Please provide:
1. The query with comments explaining each section
2. Expected output format
3. Index recommendations for performance
4. Alternative approaches if the query is complex
5. Edge cases to watch for (NULL handling, duplicates, etc.)

If creating/modifying tables, also provide:
- Migration script (up and down)
- Seed data example`
    },

    // === SALES ===
    {
        id: 22,
        title: 'Cold Email Outreach',
        category: 'sales',
        models: ['chatgpt', 'claude'],
        tags: ['outreach', 'cold-email', 'b2b'],
        popularity: 87,
        prompt: `Write a cold email sequence (3 emails) for B2B outreach:

My Company: [WHAT WE DO]
Target: [ROLE/COMPANY TYPE]
Value Proposition: [HOW WE HELP]
Social Proof: [RESULTS/CLIENTS]
CTA: [WHAT I WANT THEM TO DO]

**Email 1: Initial Outreach**
- Subject line (3 options)
- 4-5 sentences max
- Pattern interrupt opening (no "I hope this finds you well")
- One clear value statement
- Soft CTA

**Email 2: Follow-up (3 days later)**
- New angle/social proof
- Shorter than email 1
- Direct question

**Email 3: Break-up (5 days later)**
- Acknowledge their busy schedule
- Final value point
- Easy yes/no CTA

Rules: No spam trigger words. Be human. Personalization placeholders included.`
    },

    // === HR ===
    {
        id: 23,
        title: 'Resume Optimizer',
        category: 'hr',
        models: ['chatgpt', 'claude', 'gemini'],
        tags: ['resume', 'career', 'job-search'],
        popularity: 92,
        prompt: `Optimize my resume for this job posting:

**Job Posting:**
[PASTE JOB DESCRIPTION]

**My Current Resume/Experience:**
[PASTE YOUR RESUME OR KEY POINTS]

Please:
1. **ATS Optimization** - Identify keywords from the job posting I should include
2. **Bullet Point Rewrites** - Transform my experience into achievement-focused bullets using the XYZ formula (Accomplished [X] as measured by [Y] by doing [Z])
3. **Skills Section** - Reorganize to match job requirements
4. **Summary/Objective** - Write a compelling 2-3 sentence professional summary
5. **Gap Analysis** - What the job needs vs. what I have (and how to bridge gaps)
6. **Red Flags** - Anything that might hurt my application

Format bullets as: ▸ [Strong verb] + [What you did] + [Measurable result]`
    },

    // More prompts to fill out the library
    {
        id: 24,
        title: 'YouTube Script Writer',
        category: 'writing',
        models: ['chatgpt', 'claude'],
        tags: ['youtube', 'video', 'script'],
        popularity: 89,
        prompt: `Write a YouTube video script that hooks viewers and keeps them watching:

Topic: [VIDEO TOPIC]
Target Length: [MINUTES]
Channel Niche: [YOUR NICHE]
Target Audience: [WHO WATCHES]
Style: [EDUCATIONAL/ENTERTAINING/MOTIVATIONAL/TUTORIAL]

Script Structure:
1. **Hook** (0-15 sec) - Pattern interrupt, bold claim, or question
2. **Intro** (15-30 sec) - Quick channel intro, what they'll learn
3. **Main Content** - Key points with transitions
4. **CTA** - Subscribe, like, comment prompt (weave in naturally)
5. **Outro** - Summarize + tease next video

Include:
- [B-ROLL SUGGESTIONS] in brackets
- Retention hooks every 2-3 minutes
- Suggested thumbnail title
- SEO-optimized title (60 chars) and description
- 15 relevant tags`
    },
    {
        id: 25,
        title: 'Twitter/X Thread Creator',
        category: 'marketing',
        models: ['chatgpt', 'claude'],
        tags: ['twitter', 'thread', 'viral'],
        popularity: 86,
        prompt: `Create a viral Twitter/X thread about [TOPIC]:

Thread length: 8-12 tweets
Goal: [EDUCATE/ENTERTAIN/BUILD AUTHORITY/DRIVE TRAFFIC]
Target audience: [WHO]

Rules:
- Tweet 1: Must stop the scroll. Use a bold claim, number, or question
- Each tweet: Max 280 chars, standalone value, ends with a hook to next
- Last tweet: Strong CTA + "Follow @[handle] for more"
- Include: ↓ arrows between tweets, numbered (1/X)
- Mix: data points, stories, actionable tips, controversial takes
- Engagement bait: "Retweet if you agree" or "Reply with yours"

Do NOT:
- Use "In this thread, I'll..."
- Start with "Thread:" or "🧵"
- Be generic or obvious`
    },
];
