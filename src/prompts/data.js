// PromptBetter - AI Prompt Templates Data
// Categories and prompts database

const CATEGORIES = [
    { id: 'writing', name: 'Writing', icon: '✍️', desc: 'Blog posts, emails, copy, stories' },
    { id: 'coding', name: 'Coding', icon: '💻', desc: 'Debug, refactor, generate, explain' },
    { id: 'marketing', name: 'Marketing', icon: '📈', desc: 'SEO, ads, social media, funnels' },
    { id: 'business', name: 'Business', icon: '💼', desc: 'Strategy, analysis, planning' },
    { id: 'education', name: 'Education', icon: '📚', desc: 'Teaching, learning, tutoring' },
    { id: 'creative', name: 'Creative', icon: '🎨', desc: 'Art, design, brainstorming' },
    { id: 'productivity', name: 'Productivity', icon: '⚡', desc: 'Workflows, automation, planning' },
    { id: 'data', name: 'Data & Analytics', icon: '📊', desc: 'SQL, analysis, visualization' },
    { id: 'sales', name: 'Sales', icon: '🎯', desc: 'Outreach, proposals, closing' },
    { id: 'hr', name: 'HR & Career', icon: '👤', desc: 'Resumes, interviews, hiring' },
    { id: 'legal', name: 'Legal', icon: '⚖️', desc: 'Contracts, policies, compliance' },
    { id: 'health', name: 'Health & Wellness', icon: '🏥', desc: 'Fitness, nutrition, mental health' },
];

// Compute accurate category counts from actual PROMPTS data
// (called after PROMPTS is defined, at end of file)
function computeCategoryCounts() {
    CATEGORIES.forEach(cat => {
        cat.count = PROMPTS.filter(p => p.category === cat.id).length;
    });
}

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

    // === MORE CODING ===
    {
        id: 26,
        title: 'React Component Builder',
        category: 'coding',
        models: ['claude', 'chatgpt'],
        tags: ['react', 'frontend', 'component'],
        popularity: 91,
        prompt: `Build a production-ready React component:

Component Name: [NAME]
Purpose: [WHAT IT DOES]
Props: [LIST EXPECTED PROPS]
State: [WHAT STATE IT MANAGES]

Requirements:
1. TypeScript with proper interfaces
2. Responsive design (mobile-first)
3. Accessible (ARIA labels, keyboard navigation)
4. Error boundary handling
5. Loading and empty states
6. Unit tests (React Testing Library)
7. Storybook story (if applicable)
8. Performance optimized (useMemo/useCallback where appropriate)

Include:
- The component file
- Types/interfaces file
- Test file
- CSS/styled-components
- Usage example

Follow React best practices: composition over inheritance, controlled components, proper effect cleanup.`
    },
    {
        id: 27,
        title: 'Python Script Automator',
        category: 'coding',
        models: ['chatgpt', 'claude', 'gemini'],
        tags: ['python', 'automation', 'script'],
        popularity: 89,
        prompt: `Write a Python automation script for:

Task: [WHAT TO AUTOMATE]
Input: [WHAT DATA/FILES IT PROCESSES]
Output: [EXPECTED RESULT]
Schedule: [ONE-TIME/RECURRING]

Requirements:
- Python 3.10+
- Proper error handling with try/except
- Logging (use logging module, not print)
- Configuration via environment variables or config file
- Progress indicators for long operations
- Dry-run mode option
- Type hints throughout
- Docstrings for all functions
- requirements.txt for dependencies
- A brief README with usage instructions

Handle edge cases:
- Empty input
- Network failures (with retry logic)
- File permission issues
- Keyboard interrupt (graceful shutdown)`
    },
    {
        id: 28,
        title: 'Git Commit Message Writer',
        category: 'coding',
        models: ['chatgpt', 'claude', 'gemini'],
        tags: ['git', 'workflow', 'commits'],
        popularity: 84,
        prompt: `Write a clear, conventional commit message for these changes:

Changes made:
[DESCRIBE WHAT YOU CHANGED]

Files affected:
[LIST FILES]

Context:
[WHY THESE CHANGES WERE NEEDED]

Follow Conventional Commits format:
type(scope): subject

body

footer

Types: feat, fix, docs, style, refactor, perf, test, chore, ci, build
- Subject: imperative mood, lowercase, no period, under 50 chars
- Body: explain what and why, not how. Wrap at 72 chars.
- Footer: breaking changes, issue references

Provide 3 options from concise to detailed.`
    },

    // === MORE PRODUCTIVITY ===
    {
        id: 29,
        title: 'Weekly Planning Assistant',
        category: 'productivity',
        models: ['chatgpt', 'claude', 'gemini'],
        tags: ['planning', 'weekly', 'goals'],
        popularity: 87,
        prompt: `Help me plan my upcoming week. Here's my context:

**Top 3 priorities this week:**
1. [PRIORITY 1]
2. [PRIORITY 2]
3. [PRIORITY 3]

**Recurring commitments:**
[MEETINGS, CLASSES, ROUTINES]

**Deadlines this week:**
[LIST DEADLINES WITH DATES]

**Energy patterns:**
[WHEN AM I MOST PRODUCTIVE? MORNING/AFTERNOON/EVENING]

Please create:
1. **Monday-Friday time blocks** - Allocate focused work, meetings, breaks
2. **Daily Top 3** - Most important task for each day
3. **Buffer time** - When to handle unexpected items
4. **Weekend prep** - What to prepare Sunday evening
5. **Success metrics** - How I'll know the week was productive

Rules:
- No back-to-back deep work blocks (max 90 min then break)
- Schedule hardest tasks during my peak energy
- Include buffer for unexpected tasks (20% of time)
- Batch similar tasks together`
    },
    {
        id: 30,
        title: 'Decision Matrix Builder',
        category: 'productivity',
        models: ['chatgpt', 'claude', 'gemini'],
        tags: ['decisions', 'framework', 'analysis'],
        popularity: 83,
        prompt: `Help me make a decision using a weighted decision matrix.

Decision: [WHAT I'M DECIDING BETWEEN]

Options:
1. [OPTION A]
2. [OPTION B]
3. [OPTION C]

Factors I care about:
[LIST FACTORS - e.g., cost, time, quality, risk, scalability]

For each factor:
1. Assign a weight (1-10) based on importance
2. Score each option (1-10) on that factor
3. Calculate weighted scores
4. Present as a clear table

Also provide:
- Gut check: Does the "winner" feel right? If not, what's missing?
- Reversibility analysis: Which decisions are easily reversed?
- 10/10/10 rule: How will I feel about this in 10 minutes/10 months/10 years?
- Pre-mortem: If I choose the winner and it fails, what went wrong?`
    },

    // === MORE MARKETING ===
    {
        id: 31,
        title: 'Product Hunt Launch Plan',
        category: 'marketing',
        models: ['chatgpt', 'claude'],
        tags: ['product-hunt', 'launch', 'growth'],
        popularity: 88,
        prompt: `Create a complete Product Hunt launch strategy for:

Product: [NAME AND DESCRIPTION]
Category: [PH CATEGORY]
Target audience: [WHO USES IT]
Unique value: [WHY IT'S DIFFERENT]
Launch date: [DATE]

Deliver:
1. **Pre-launch (2 weeks before)**
   - Teaser content calendar
   - Hunter outreach template
   - Early access signup strategy
   - Maker community engagement plan

2. **Launch day**
   - Optimal posting time
   - Tagline (max 60 chars, benefit-focused)
   - Description (first comment strategy)
   - Gallery images checklist
   - First hour action plan
   - Upvote request templates (non-spammy)

3. **Post-launch (48 hours)**
   - Comment response templates
   - Social media amplification
   - Follow-up with commenters
   - Metrics to track

4. **Assets needed**
   - Logo (240x240)
   - Gallery images (5 max)
   - Maker video script (30 sec)
   - First comment copy`
    },
    {
        id: 32,
        title: 'Newsletter Writer',
        category: 'marketing',
        models: ['chatgpt', 'claude'],
        tags: ['newsletter', 'email', 'content'],
        popularity: 84,
        prompt: `Write this week's newsletter edition:

Newsletter name: [NAME]
Topic/Theme: [THIS WEEK'S FOCUS]
Audience: [WHO READS THIS]
Tone: [PROFESSIONAL/CASUAL/WITTY]
Length: [SHORT <500 words / MEDIUM 500-1000 / LONG 1000+]

Structure:
1. **Subject line** (3 options - aim for 40% open rate)
2. **Preview text** (supporting the subject line)
3. **Opening hook** - Personal anecdote or timely reference
4. **Main content** - [NUMBER] key points/stories
5. **Actionable takeaway** - One thing readers can do TODAY
6. **CTA** - Reply, share, or visit link
7. **Sign-off** - Personal, memorable

Extras to include:
- One relevant link/resource
- One quote or stat
- One personal opinion or hot take

Make it feel like a smart friend sharing insights, not a corporate update.`
    },

    // === MORE CREATIVE ===
    {
        id: 33,
        title: 'Logo Concept Generator',
        category: 'creative',
        models: ['chatgpt', 'claude'],
        tags: ['logo', 'branding', 'design'],
        popularity: 85,
        prompt: `Generate 5 logo concepts for:

Brand Name: [NAME]
Industry: [SECTOR]
Brand Values: [3-5 ADJECTIVES]
Target Audience: [WHO]
Competitors: [SIMILAR BRANDS TO DIFFERENTIATE FROM]
Color Preferences: [ANY/NONE]

For each concept, describe:
1. **Visual description** - What the logo looks like in detail
2. **Symbolism** - Why this design represents the brand
3. **Style** - Wordmark/lettermark/icon/combination/emblem
4. **Color palette** - Primary + secondary with hex codes
5. **Typography** - Font style recommendation
6. **Versatility** - How it works on dark/light, small/large
7. **Midjourney prompt** - A prompt to generate a rough version

Consider:
- Scalability (favicon to billboard)
- Cultural sensitivity
- Trademark uniqueness
- Digital-first readability`
    },
    {
        id: 34,
        title: 'UX Copy Writer',
        category: 'creative',
        models: ['chatgpt', 'claude'],
        tags: ['ux', 'microcopy', 'ui'],
        popularity: 82,
        prompt: `Write UX microcopy for:

Product/Feature: [DESCRIPTION]
Platform: [WEB/MOBILE/DESKTOP]
User action: [WHAT THE USER IS DOING]
Brand voice: [FORMAL/CASUAL/PLAYFUL/MINIMAL]

Write copy for these states:
1. **Empty state** - First time, no data yet
2. **Loading state** - Waiting for content
3. **Success state** - Action completed
4. **Error state** - Something went wrong
5. **Confirmation dialog** - Before destructive action
6. **Tooltip/Help text** - Explaining the feature
7. **CTA buttons** - Primary and secondary
8. **Onboarding step** - Introducing the feature

Rules:
- Max 2 sentences per element
- Use active voice
- Be specific, not vague ("Your file is saved" not "Success")
- Include helpful next steps in errors
- Match the user's emotional state
- Avoid jargon`
    },

    // === MORE BUSINESS ===
    {
        id: 35,
        title: 'Competitor Analysis Framework',
        category: 'business',
        models: ['chatgpt', 'claude', 'gemini'],
        tags: ['competition', 'analysis', 'market'],
        popularity: 86,
        prompt: `Perform a detailed competitor analysis:

My Product: [YOUR PRODUCT/SERVICE]
Competitors to analyze:
1. [COMPETITOR 1]
2. [COMPETITOR 2]
3. [COMPETITOR 3]

Analyze each competitor on:
1. **Product** - Core features, pricing, unique value prop
2. **Market Position** - Target segment, brand perception
3. **Strengths** - What they do well
4. **Weaknesses** - Where they fall short
5. **Marketing** - Channels, messaging, content strategy
6. **Technology** - Tech stack (if visible), innovation
7. **Team** - Size, key hires, leadership
8. **Funding/Revenue** - Known metrics

Then provide:
- **Comparison matrix** - Feature-by-feature table
- **Gap analysis** - Opportunities they're missing
- **Positioning map** - Where each player sits (2x2 matrix)
- **My competitive advantages** - Where I can win
- **Threats** - Where they could beat me
- **Strategic recommendations** - 3 actionable moves`
    },

    // === MORE DATA ===
    {
        id: 36,
        title: 'Data Visualization Advisor',
        category: 'data',
        models: ['chatgpt', 'claude', 'gemini'],
        tags: ['visualization', 'charts', 'dashboard'],
        popularity: 81,
        prompt: `Recommend the best data visualization for my data:

Data description: [WHAT YOUR DATA CONTAINS]
Audience: [WHO WILL SEE THIS - executives/analysts/public]
Purpose: [COMPARE/TREND/DISTRIBUTION/RELATIONSHIP/COMPOSITION]
Tool: [Tableau/Power BI/Excel/D3.js/Python matplotlib/etc.]

I have:
- [NUMBER] data points
- [VARIABLES] - list the columns/fields
- Time component: [YES/NO - time series?]
- Categories: [HOW MANY DISTINCT GROUPS]

Please recommend:
1. **Primary chart type** with reasoning
2. **Alternative option** for different emphasis
3. **Color palette** suggestion (colorblind-safe)
4. **Layout tips** - axis labels, legends, annotations
5. **Common mistakes** to avoid with this data type
6. **Code snippet** - Basic implementation in my tool
7. **Storytelling tip** - What narrative does this data tell?

If creating a dashboard, also suggest:
- KPI cards to feature
- Filter/interaction design
- Mobile responsiveness approach`
    },

    // === GEMINI SPECIFIC ===
    {
        id: 37,
        title: 'Gemini 3.5 Flash - Image Analysis',
        category: 'creative',
        models: ['gemini'],
        tags: ['image', 'multimodal', 'analysis'],
        popularity: 90,
        prompt: `[Upload an image first, then use this prompt]

Analyze this image comprehensively:

1. **Description** - What's in the image? Be detailed and specific.
2. **Text extraction** - Any visible text? Transcribe it exactly.
3. **Objects detected** - List all identifiable objects with positions.
4. **Colors & style** - Dominant colors, artistic style, mood.
5. **Technical quality** - Resolution feel, lighting, composition.
6. **Context clues** - When/where might this have been taken?
7. **Accessibility** - Write alt-text for screen readers (under 125 chars).
8. **Similar images** - What would I search to find similar content?

Additional (if applicable):
- Faces: Estimate emotions, but don't identify specific people
- Documents: Extract and format any structured data
- Products: Identify brand, model, approximate price range
- Nature: Species identification if plants/animals visible`
    },
    {
        id: 38,
        title: 'Claude Opus 4 - Deep Research',
        category: 'education',
        models: ['claude'],
        tags: ['research', 'analysis', 'deep-dive'],
        popularity: 92,
        prompt: `Conduct thorough research and analysis on: [TOPIC]

Research Parameters:
- Depth: [OVERVIEW / DEEP DIVE / EXPERT LEVEL]
- Perspective: [NEUTRAL / [SPECIFIC VIEWPOINT]]
- Time scope: [ALL TIME / LAST 5 YEARS / CURRENT]

Deliverable Structure:
1. **Executive Summary** (3 sentences)
2. **Background & Context** - History and current state
3. **Key Arguments/Perspectives** - Present all major viewpoints
4. **Evidence & Data** - Statistics, studies, examples
5. **Expert Opinions** - What do authorities say?
6. **Counterarguments** - Steel-man opposing views
7. **Implications** - What does this mean going forward?
8. **Knowledge Gaps** - What's unknown or debated?
9. **Conclusion** - Your synthesis
10. **Sources to explore** - Where to learn more

Quality standards:
- Distinguish facts from opinions
- Note when information may be outdated
- Highlight areas of uncertainty
- Cross-reference claims where possible
- Present minority views fairly`
    },

    // === SALES ===
    {
        id: 39,
        title: 'Sales Pitch Deck Outline',
        category: 'sales',
        models: ['chatgpt', 'claude'],
        tags: ['pitch', 'presentation', 'b2b'],
        popularity: 84,
        prompt: `Create a 10-slide sales pitch deck outline for:

Product/Service: [WHAT YOU'RE SELLING]
Prospect: [COMPANY/ROLE YOU'RE PRESENTING TO]
Deal Size: [APPROXIMATE VALUE]
Stage: [FIRST MEETING / FOLLOW-UP / CLOSING]
Time: [10/20/30 MINUTES]

Slide-by-slide:
1. **Title** - Company name, one-line value prop
2. **Problem** - The pain your prospect feels (use their language)
3. **Impact** - Cost of not solving this ($$$ or time)
4. **Solution** - Your product in one sentence
5. **How It Works** - 3-step process, visual
6. **Proof** - Case study with metrics (similar company)
7. **Differentiator** - Why you, not alternatives
8. **ROI** - Expected return with timeline
9. **Pricing** - Options with recommendation
10. **Next Steps** - Clear, low-friction CTA

For each slide provide:
- Headline (benefit, not feature)
- Key talking points (3 max)
- Visual suggestion
- Objection it preemptively handles`
    },

    // === HEALTH ===
    {
        id: 40,
        title: 'Workout Plan Generator',
        category: 'health',
        models: ['chatgpt', 'claude', 'gemini'],
        tags: ['fitness', 'workout', 'exercise'],
        popularity: 80,
        prompt: `Create a personalized workout plan:

**My Profile:**
- Goal: [LOSE WEIGHT / BUILD MUSCLE / IMPROVE ENDURANCE / GENERAL FITNESS]
- Experience: [BEGINNER / INTERMEDIATE / ADVANCED]
- Available days: [X DAYS PER WEEK]
- Session length: [X MINUTES]
- Equipment: [GYM / HOME / MINIMAL]
- Injuries/limitations: [ANY]
- Age range: [RANGE]

**Generate:**
1. **Weekly split** - Which muscle groups on which days
2. **Each workout** - Exercises, sets, reps, rest times
3. **Warm-up routine** (5 min)
4. **Cool-down routine** (5 min)
5. **Progression plan** - How to increase difficulty over 4 weeks
6. **Alternatives** - Swap options for each exercise
7. **Recovery tips** - Sleep, nutrition basics

Format as a clean table. Include video search terms for unfamiliar exercises.

Disclaimer: This is general guidance, not medical advice. Consult a professional for specific needs.`
    },

    // === ROUND 2 PROMPTS (IDs 41-60) ===
    {
        id: 41,
        title: 'AI Text Humanizer',
        category: 'writing',
        models: ['chatgpt', 'claude', 'gemini'],
        tags: ['humanize', 'rewrite', 'natural'],
        popularity: 95,
        prompt: `You are an expert editor who makes AI-generated text sound naturally human. Rewrite the following text to bypass AI detection while preserving the original meaning:

[PASTE AI-GENERATED TEXT HERE]

Transformation rules:
1. **Vary sentence structure** - Mix short punchy sentences with longer flowing ones
2. **Add imperfections** - Occasional contractions, colloquialisms, mild redundancy
3. **Use concrete language** - Replace abstract phrases with specific examples
4. **Add personal voice** - Include opinions, hedging language ("I think", "arguably")
5. **Break patterns** - AI tends to use parallel structure; disrupt it
6. **Inject personality** - Add humor, asides, or rhetorical questions where appropriate
7. **Use active voice** - Convert passive constructions where possible
8. **Add transitions** - Use natural bridges between ideas ("Here's the thing", "Look")

Tone: [CASUAL/PROFESSIONAL/ACADEMIC/CONVERSATIONAL]
Reading level: [GRADE 8 / COLLEGE / EXPERT]

Output the rewritten version only. Do not explain what you changed.`
    },
    {
        id: 42,
        title: 'Startup Pitch Email',
        category: 'sales',
        models: ['chatgpt', 'claude'],
        tags: ['startup', 'pitch', 'fundraising'],
        popularity: 88,
        prompt: `Write a concise, compelling pitch email to a [INVESTOR TYPE - Angel/VC/Accelerator]:

**Startup Details:**
- Company: [NAME]
- One-liner: [WHAT YOU DO IN ONE SENTENCE]
- Stage: [PRE-SEED/SEED/SERIES A]
- Traction: [KEY METRICS - users, revenue, growth rate]
- Raising: [AMOUNT] at [VALUATION/TERMS]
- Team: [BRIEF FOUNDER BACKGROUNDS]

**The email should:**
1. Subject line that gets opened (not "Fundraising" or "Investment Opportunity")
2. Opening line with a hook - lead with traction or a bold claim
3. 2-3 sentences explaining the problem and your solution
4. One line of social proof (investors, advisors, customers)
5. Clear ask: meeting request with specific availability
6. Total length: under 200 words

**Tone:** Confident but not arrogant. Data-driven. Respect their time.

Provide 2 versions:
- Version A: Warm intro (someone connected you)
- Version B: Cold outreach (no prior connection)`
    },
    {
        id: 43,
        title: 'Technical Documentation Writer',
        category: 'coding',
        models: ['claude', 'chatgpt', 'gemini'],
        tags: ['documentation', 'technical', 'developer'],
        popularity: 87,
        prompt: `Write clear, comprehensive technical documentation for:

**Project/Feature:** [NAME AND DESCRIPTION]
**Audience:** [DEVELOPERS/DEVOPS/END USERS/ALL]
**Type:** [API DOCS/README/ARCHITECTURE/RUNBOOK/TUTORIAL]

**Generate documentation including:**

1. **Overview** - What it does, why it exists, who it's for
2. **Prerequisites** - Required tools, versions, access
3. **Quick Start** - Minimal steps to get running (under 5 minutes)
4. **Architecture** - System diagram description, key components
5. **Configuration** - All config options with defaults and examples
6. **API Reference** - Endpoints/methods with request/response examples
7. **Examples** - 3 common use cases with complete code
8. **Troubleshooting** - Top 5 common issues with solutions
9. **FAQ** - 5 questions developers always ask
10. **Changelog** - Version history format

**Style guidelines:**
- Use code blocks with syntax highlighting
- Include copy-paste ready examples
- Write scannable content (headers, bullets, tables)
- Explain the "why" not just the "how"
- Link to related docs where relevant

Format in Markdown.`
    },
    {
        id: 44,
        title: 'Social Media Calendar Generator',
        category: 'marketing',
        models: ['chatgpt', 'claude', 'gemini'],
        tags: ['social-media', 'calendar', 'content-plan'],
        popularity: 89,
        prompt: `Create a 30-day social media content calendar for:

**Brand:** [NAME]
**Industry:** [SECTOR]
**Platforms:** [INSTAGRAM/TWITTER/LINKEDIN/TIKTOK/FACEBOOK]
**Posting frequency:** [X POSTS PER WEEK PER PLATFORM]
**Brand voice:** [PROFESSIONAL/PLAYFUL/EDUCATIONAL/EDGY]
**Goals:** [AWARENESS/ENGAGEMENT/LEADS/SALES]

**For each day, provide:**
- Platform
- Content type (carousel, reel, story, static, text post, poll)
- Post topic/concept
- Caption draft (with hashtags where relevant)
- Best posting time
- CTA

**Content mix (follow the 80/20 rule):**
- 40% Educational/Value
- 25% Entertaining/Relatable
- 20% Community/Engagement (polls, questions, UGC)
- 15% Promotional/Sales

**Also include:**
- 5 content pillar themes
- Hashtag strategy (branded + niche + broad)
- Key dates/holidays to leverage this month
- Engagement strategy (how to respond to comments)

Format as a table: Date | Platform | Type | Topic | Caption Preview | Time`
    },
    {
        id: 45,
        title: 'Customer Support Response',
        category: 'business',
        models: ['chatgpt', 'claude', 'gemini'],
        tags: ['support', 'customer-service', 'response'],
        popularity: 86,
        prompt: `You are an expert customer support agent. Write a professional, empathetic response to this customer message:

**Customer message:**
[PASTE CUSTOMER COMPLAINT/QUESTION HERE]

**Context:**
- Product/Service: [YOUR PRODUCT]
- Customer tier: [FREE/PAID/VIP]
- Issue type: [BUG/BILLING/FEATURE REQUEST/COMPLAINT/HOW-TO]
- Resolution available: [WHAT YOU CAN OFFER]

**Response guidelines:**
1. **Acknowledge** - Show you understand their frustration (don't be robotic)
2. **Apologize** - If warranted, be specific about what went wrong
3. **Explain** - Brief context (without making excuses)
4. **Resolve** - Clear next steps or solution
5. **Prevent** - What you're doing so this doesn't happen again
6. **Close** - Offer further help, set expectations

**Tone:** [FORMAL/FRIENDLY/CASUAL]
**Channel:** [EMAIL/CHAT/SOCIAL MEDIA]

Provide 2 versions:
- If we CAN solve their problem
- If we CANNOT solve their problem (with alternatives)

Keep response under 150 words for chat, under 250 for email.`
    },
    {
        id: 46,
        title: 'Data Analysis Report',
        category: 'data',
        models: ['chatgpt', 'claude', 'gemini'],
        tags: ['analysis', 'report', 'insights'],
        popularity: 85,
        prompt: `Analyze this data and generate an executive-ready report:

**Data description:**
[DESCRIBE YOUR DATASET - what columns, what it represents, time period]

**Raw data or summary statistics:**
[PASTE DATA, CSV SNIPPET, OR KEY NUMBERS]

**Analysis goals:**
- Primary question: [WHAT DO YOU WANT TO KNOW?]
- Secondary questions: [ADDITIONAL INSIGHTS NEEDED]
- Audience: [EXECUTIVES/TEAM/STAKEHOLDERS]

**Generate report with:**

1. **Executive Summary** (3 bullet points - the "so what?")
2. **Key Findings** - Top 5 insights with supporting numbers
3. **Trends** - What's going up/down/changing?
4. **Anomalies** - Anything unusual or unexpected?
5. **Correlations** - Relationships between variables
6. **Segments** - Differences across groups/categories
7. **Recommendations** - 3 data-driven actions to take
8. **Methodology notes** - Assumptions and limitations
9. **Suggested visualizations** - What charts would tell this story best
10. **Next steps** - What data to collect next

Format: Use tables, bullet points, and bold key numbers. Make it skimmable.`
    },
    {
        id: 47,
        title: 'Personal Finance Advisor',
        category: 'productivity',
        models: ['chatgpt', 'claude', 'gemini'],
        tags: ['finance', 'budget', 'money'],
        popularity: 82,
        prompt: `Act as a personal finance advisor and help me optimize my finances:

**My Situation:**
- Monthly income (after tax): [AMOUNT]
- Monthly expenses: [AMOUNT OR LIST MAJOR CATEGORIES]
- Current savings: [AMOUNT]
- Debt: [TYPE AND AMOUNT - student loans, credit cards, mortgage]
- Financial goals: [WHAT YOU WANT TO ACHIEVE AND BY WHEN]
- Risk tolerance: [CONSERVATIVE/MODERATE/AGGRESSIVE]
- Age range: [RANGE]
- Country: [FOR TAX CONTEXT]

**Please provide:**
1. **Budget breakdown** - Recommended allocation (50/30/20 or custom)
2. **Debt strategy** - Avalanche vs. snowball recommendation with math
3. **Emergency fund** - How much and where to keep it
4. **Savings plan** - Monthly targets to hit your goals
5. **Investment suggestions** - Asset allocation for your risk level
6. **Tax optimization** - Deductions or accounts to leverage
7. **Quick wins** - 3 things to do this week
8. **6-month roadmap** - Month-by-month milestones

**Disclaimers:** This is educational, not financial advice. Verify with a licensed professional.`
    },
    {
        id: 48,
        title: 'Travel Itinerary Planner',
        category: 'productivity',
        models: ['chatgpt', 'claude', 'gemini'],
        tags: ['travel', 'itinerary', 'planning'],
        popularity: 90,
        prompt: `Create a detailed travel itinerary for:

**Trip Details:**
- Destination: [CITY/COUNTRY]
- Duration: [NUMBER OF DAYS]
- Travel dates: [MONTH/SEASON]
- Budget level: [BUDGET/MID-RANGE/LUXURY]
- Travelers: [SOLO/COUPLE/FAMILY WITH KIDS/GROUP]
- Interests: [CULTURE/FOOD/ADVENTURE/RELAXATION/NIGHTLIFE/NATURE]
- Pace: [RELAXED/MODERATE/PACKED]

**For each day, provide:**
1. Morning activity (with opening hours)
2. Lunch recommendation (with price range)
3. Afternoon activity
4. Dinner recommendation
5. Evening/optional activity
6. Estimated daily budget
7. Transportation between locations

**Also include:**
- Best neighborhoods to stay (with hotel/Airbnb price ranges)
- Must-try local foods (top 5)
- Money-saving tips specific to this destination
- Common tourist traps to avoid
- Packing essentials for the weather/activities
- Key phrases in local language
- Emergency contacts and safety tips
- Day trip options if time allows

Format as a day-by-day table with times.`
    },
    {
        id: 49,
        title: 'Recipe Generator from Ingredients',
        category: 'health',
        models: ['chatgpt', 'claude', 'gemini'],
        tags: ['recipe', 'cooking', 'food'],
        popularity: 84,
        prompt: `Create a recipe using these ingredients I have on hand:

**Available ingredients:**
[LIST WHAT YOU HAVE]

**Constraints:**
- Dietary restrictions: [NONE/VEGETARIAN/VEGAN/GLUTEN-FREE/KETO/DAIRY-FREE]
- Cooking skill: [BEGINNER/INTERMEDIATE/ADVANCED]
- Time available: [15 MIN/30 MIN/1 HOUR/UNLIMITED]
- Equipment: [STOVETOP/OVEN/MICROWAVE/AIR FRYER/INSTANT POT]
- Servings needed: [NUMBER]
- Cuisine preference: [ANY/SPECIFIC]

**Provide:**
1. **Recipe name** (creative and appetizing)
2. **Difficulty rating** (1-5 stars)
3. **Prep time / Cook time / Total time**
4. **Ingredients list** with exact measurements
5. **Step-by-step instructions** (numbered, clear)
6. **Pro tips** - How to elevate the dish
7. **Substitutions** - What to swap if missing something
8. **Storage** - How long it keeps, reheating instructions
9. **Nutrition estimate** - Approximate calories and macros per serving
10. **Variations** - 2 ways to modify the recipe

If I'm missing a key ingredient, suggest the simplest addition to buy.`
    },
    {
        id: 50,
        title: 'Cover Letter Writer',
        category: 'hr',
        models: ['chatgpt', 'claude', 'gemini'],
        tags: ['cover-letter', 'job', 'application'],
        popularity: 91,
        prompt: `Write a compelling cover letter for this application:

**Job Details:**
- Position: [JOB TITLE]
- Company: [COMPANY NAME]
- Job Description: [PASTE KEY REQUIREMENTS]
- Company Values: [IF KNOWN]

**My Background:**
- Current role: [TITLE AT COMPANY]
- Years of experience: [NUMBER]
- Top 3 relevant achievements: [LIST WITH METRICS]
- Why this company: [GENUINE REASON]
- Why this role: [WHAT EXCITES YOU]

**Cover letter structure:**
1. **Opening hook** - Not "I'm writing to apply for..." Something memorable
2. **Value proposition** - What you bring that matches their top need
3. **Evidence paragraph** - 1-2 specific achievements with numbers
4. **Cultural fit** - Connect your values to theirs
5. **Closing** - Confident CTA, not "I hope to hear from you"

**Guidelines:**
- Under 350 words (3-4 short paragraphs)
- Mirror language from the job posting
- Show you researched the company
- Personality over formality
- No clichés ("passionate team player", "hit the ground running")

Tone: [CONFIDENT/HUMBLE/ENTHUSIASTIC]`
    },
    {
        id: 51,
        title: 'Interview Question Preparer',
        category: 'hr',
        models: ['chatgpt', 'claude', 'gemini'],
        tags: ['interview', 'preparation', 'career'],
        popularity: 88,
        prompt: `Help me prepare for a job interview:

**Position:** [JOB TITLE]
**Company:** [COMPANY NAME]
**Industry:** [SECTOR]
**Interview stage:** [PHONE SCREEN/TECHNICAL/BEHAVIORAL/FINAL ROUND]
**Interviewer role:** [HR/HIRING MANAGER/PEER/EXECUTIVE]

**Generate:**

1. **Top 10 likely questions** for this specific role/stage with:
   - The question
   - Why they ask it (what they're really evaluating)
   - STAR-format answer framework (Situation, Task, Action, Result)
   - A strong example answer

2. **5 behavioral questions** with answer templates:
   - "Tell me about a time when..."
   - Framework for each answer

3. **5 questions I should ASK them** (impressive, not generic):
   - About the role
   - About the team
   - About growth

4. **Red flags to avoid** - Common mistakes for this level
5. **Salary negotiation prep** - If it comes up, how to handle
6. **30-second elevator pitch** - "Tell me about yourself" answer

**My experience summary:** [BRIEF BACKGROUND]`
    },
    {
        id: 52,
        title: 'Product Comparison Table',
        category: 'business',
        models: ['chatgpt', 'claude', 'gemini'],
        tags: ['comparison', 'product', 'decision'],
        popularity: 83,
        prompt: `Create a detailed product comparison table:

**Products to compare:**
1. [PRODUCT/SERVICE 1]
2. [PRODUCT/SERVICE 2]
3. [PRODUCT/SERVICE 3]
(Add more if needed: 4. [PRODUCT 4])

**Category:** [SOFTWARE/HARDWARE/SERVICE/SUBSCRIPTION]
**Use case:** [WHO IS THIS FOR AND WHAT THEY NEED]
**Budget range:** [IF RELEVANT]

**Compare on these criteria:**
- Pricing (monthly/annual/one-time, tiers)
- Key features (list top 10 features to compare)
- Pros and cons (3 each)
- Best for (ideal user type)
- Limitations/dealbreakers
- Customer support quality
- Integration/compatibility
- Learning curve
- Scalability
- User reviews summary (if known)

**Output format:**
1. Quick recommendation (TL;DR - pick this if...)
2. Detailed comparison table (Markdown)
3. Feature-by-feature breakdown
4. Price-to-value analysis
5. Final verdict with reasoning

Make it objective. Note where one clearly wins and where it's preference-dependent.`
    },
    {
        id: 53,
        title: 'Meeting Agenda Creator',
        category: 'productivity',
        models: ['chatgpt', 'claude', 'gemini'],
        tags: ['meeting', 'agenda', 'collaboration'],
        popularity: 81,
        prompt: `Create an effective meeting agenda:

**Meeting Details:**
- Purpose: [WHY ARE WE MEETING]
- Duration: [30 MIN/45 MIN/60 MIN]
- Attendees: [ROLES/NAMES]
- Meeting type: [STANDUP/PLANNING/REVIEW/BRAINSTORM/DECISION/1-ON-1]
- Recurring: [YES/NO - frequency]

**Context:**
- Key decisions needed: [WHAT NEEDS TO BE DECIDED]
- Pre-read materials: [ANY DOCS TO REVIEW BEFOREHAND]
- Previous action items: [FOLLOW-UPS FROM LAST MEETING]

**Generate:**

1. **Meeting header** - Title, date, time, attendees, objective
2. **Pre-meeting prep** - What attendees should review/prepare (send 24h before)
3. **Timed agenda** - Each item with:
   - Topic name
   - Owner/presenter
   - Time allocation
   - Type: [INFORM/DISCUSS/DECIDE]
   - Desired outcome
4. **Parking lot** - Space for off-topic items
5. **Action items template** - Table for capturing decisions
6. **Meeting norms** - 2-3 ground rules

**Tips applied:**
- Most important items first (in case you run out of time)
- No item over 15 minutes without a break
- End 5 minutes early for wrap-up
- Include "what's not in scope" to keep focus`
    },
    {
        id: 54,
        title: 'Bug Report Template',
        category: 'coding',
        models: ['chatgpt', 'claude', 'gemini'],
        tags: ['bug', 'report', 'qa'],
        popularity: 82,
        prompt: `Write a clear, actionable bug report for the following issue:

**What happened:**
[DESCRIBE THE BUG IN PLAIN LANGUAGE]

**Product/Feature:** [WHERE IN THE APP]
**Severity:** [CRITICAL/HIGH/MEDIUM/LOW]
**Frequency:** [ALWAYS/SOMETIMES/RARE]

**Generate a structured bug report with:**

1. **Title** - Clear, searchable (format: "[Component] Brief description of issue")
2. **Environment**
   - Browser/OS/Device
   - App version
   - User role/permissions
3. **Steps to Reproduce** (numbered, specific)
   - Step 1: Go to...
   - Step 2: Click...
   - Step 3: Observe...
4. **Expected Behavior** - What should happen
5. **Actual Behavior** - What actually happens
6. **Impact** - Who is affected and how badly
7. **Workaround** - If any exists
8. **Screenshots/Logs** - Placeholder for visual evidence
9. **Additional Context** - Related issues, recent changes
10. **Suggested Fix** - If you have an idea (optional)

**Priority recommendation** based on: user impact × frequency × workaround availability

Format for: [JIRA/GITHUB ISSUES/LINEAR/GENERIC]`
    },
    {
        id: 55,
        title: 'User Persona Creator',
        category: 'business',
        models: ['chatgpt', 'claude', 'gemini'],
        tags: ['persona', 'ux', 'research'],
        popularity: 84,
        prompt: `Create a detailed user persona for:

**Product/Service:** [WHAT YOU'RE BUILDING]
**Target segment:** [BROAD AUDIENCE DESCRIPTION]
**Data sources:** [INTERVIEWS/SURVEYS/ANALYTICS/ASSUMPTIONS]

**Generate a complete persona including:**

1. **Demographics**
   - Name (fictional but realistic)
   - Age, location, occupation, income
   - Education, family status
   - A representative photo description

2. **Psychographics**
   - Values and beliefs
   - Personality traits (introvert/extrovert, etc.)
   - Lifestyle and daily routine
   - Media consumption habits

3. **Goals & Motivations**
   - Primary goal (related to your product)
   - Secondary goals
   - What success looks like to them

4. **Pain Points & Frustrations**
   - Current problems (top 3)
   - What they've tried before
   - Why those solutions failed

5. **Behavior Patterns**
   - How they discover products
   - Decision-making process
   - Technology comfort level
   - Buying triggers and objections

6. **Quote** - A sentence they might say that captures their essence
7. **Scenario** - A day-in-the-life story showing the problem
8. **Design implications** - What this persona means for your product decisions

Create [1/2/3] distinct personas with different needs.`
    },
    {
        id: 56,
        title: 'A/B Test Hypothesis Writer',
        category: 'data',
        models: ['chatgpt', 'claude', 'gemini'],
        tags: ['ab-test', 'hypothesis', 'optimization'],
        popularity: 79,
        prompt: `Generate a well-structured A/B test hypothesis:

**Context:**
- Page/Feature to test: [WHAT YOU'RE TESTING]
- Current metric: [BASELINE CONVERSION RATE OR KPI]
- Problem observed: [WHY YOU THINK IT NEEDS IMPROVEMENT]
- Traffic volume: [MONTHLY VISITORS/USERS]

**Generate:**

1. **Hypothesis statement** (use this format):
   "If we [CHANGE], then [METRIC] will [IMPROVE/INCREASE] by [EXPECTED %], because [REASONING BASED ON DATA/PSYCHOLOGY]."

2. **Test design:**
   - Control (A): Current version description
   - Variant (B): Proposed change description
   - Primary metric: What defines success
   - Secondary metrics: What else to watch
   - Guardrail metrics: What should NOT get worse

3. **Sample size calculation:**
   - Minimum detectable effect: [X%]
   - Confidence level: 95%
   - Estimated duration to reach significance

4. **Risks & considerations:**
   - Novelty effect awareness
   - Segment-specific impacts
   - Interaction with other tests

5. **Success criteria:**
   - When to call winner
   - When to stop early
   - What to do with results

Generate 3 test ideas ranked by expected impact and ease of implementation.`
    },
    {
        id: 57,
        title: 'Podcast Episode Outline',
        category: 'creative',
        models: ['chatgpt', 'claude'],
        tags: ['podcast', 'content', 'outline'],
        popularity: 83,
        prompt: `Create a detailed podcast episode outline:

**Show Details:**
- Podcast name: [YOUR SHOW]
- Episode topic: [SUBJECT]
- Format: [SOLO/INTERVIEW/CO-HOST/PANEL]
- Target length: [20/30/45/60 MINUTES]
- Audience: [WHO LISTENS]
- Tone: [EDUCATIONAL/ENTERTAINING/INVESTIGATIVE/CONVERSATIONAL]

**Generate:**

1. **Episode title** (3 options - curiosity-driven, SEO-friendly)
2. **Cold open** (30 sec) - Hook that makes listeners stay
3. **Intro** (1 min) - Episode overview, why it matters now
4. **Segment 1** (main topic):
   - Key talking points (5-7)
   - Transition to next segment
5. **Segment 2** (deeper dive or guest questions):
   - Interview questions (if applicable) - 8-10 questions from easy to deep
   - Follow-up prompts for each
6. **Segment 3** (actionable takeaways)
7. **Outro** - CTA, next episode tease, sign-off
8. **Show notes draft** - Summary, links, timestamps

**Extras:**
- 3 potential episode clips for social media (quotable moments)
- SEO description (under 160 chars)
- 5 related episode ideas to continue the topic
- Guest research brief (if interview format)`
    },
    {
        id: 58,
        title: 'Contract Clause Explainer',
        category: 'legal',
        models: ['claude', 'chatgpt', 'gemini'],
        tags: ['contract', 'legal', 'plain-language'],
        popularity: 78,
        prompt: `Explain this contract clause in plain, simple English:

**Contract clause:**
[PASTE THE LEGAL TEXT HERE]

**Context:**
- Contract type: [EMPLOYMENT/FREELANCE/SaaS/NDA/LEASE/PARTNERSHIP]
- My role: [WHICH PARTY AM I - employer/employee, buyer/seller, etc.]
- Concern: [WHAT SPECIFICALLY WORRIES ME ABOUT THIS]

**Please provide:**

1. **Plain English translation** - What this actually means in normal words
2. **Key obligations** - What each party must do
3. **Rights granted** - What each party can do
4. **Risks for me** - What could go wrong with this clause
5. **Red flags** - Anything unusual or one-sided
6. **Common vs. uncommon** - Is this standard language or unusual?
7. **Negotiation suggestions** - How to request more favorable terms
8. **Questions to ask** - What to clarify with a lawyer

**Important notes:**
- Highlight any vague language that could be interpreted multiple ways
- Flag any clauses that might not be enforceable
- Note jurisdiction-specific considerations if relevant

⚠️ Disclaimer: This is educational analysis, not legal advice. Consult a qualified attorney for your specific situation.`
    },
    {
        id: 59,
        title: 'Workout + Meal Plan Generator',
        category: 'health',
        models: ['chatgpt', 'claude', 'gemini'],
        tags: ['meal-plan', 'nutrition', 'fitness'],
        popularity: 86,
        prompt: `Create a combined weekly workout and meal plan:

**My Profile:**
- Goal: [FAT LOSS/MUSCLE GAIN/MAINTENANCE/PERFORMANCE]
- Current stats: [WEIGHT, HEIGHT, ACTIVITY LEVEL]
- Dietary style: [OMNIVORE/VEGETARIAN/VEGAN/KETO/PALEO]
- Food allergies: [ANY]
- Cooking skill: [MINIMAL/MODERATE/ADVANCED]
- Meal prep time: [15 MIN/30 MIN/1 HOUR PER MEAL]
- Budget: [$/WEEK FOR GROCERIES]
- Workouts per week: [NUMBER]

**Generate:**

1. **Daily calorie & macro targets**
   - Calories, protein, carbs, fat
   - Training day vs. rest day differences

2. **7-day meal plan** (for each day):
   - Breakfast, lunch, dinner, 1-2 snacks
   - Macro breakdown per meal
   - Prep time

3. **Grocery list** - Organized by store section
4. **Meal prep guide** - What to batch cook on Sunday
5. **Pre/post workout nutrition** - Timing and options
6. **Supplement suggestions** - Only evidence-based ones
7. **Hydration guide** - Daily water targets

**Format:** Daily table with meals + macros. Keep recipes simple (under 5 ingredients when possible).

⚠️ General guidance only. Consult a nutritionist for medical dietary needs.`
    },
    {
        id: 60,
        title: 'YouTube Thumbnail Idea Generator',
        category: 'creative',
        models: ['chatgpt', 'claude', 'gemini'],
        tags: ['youtube', 'thumbnail', 'design'],
        popularity: 85,
        prompt: `Generate click-worthy YouTube thumbnail concepts:

**Video Details:**
- Video title: [YOUR VIDEO TITLE]
- Niche: [YOUR CHANNEL NICHE]
- Content type: [TUTORIAL/VLOG/REVIEW/REACTION/EDUCATIONAL/ENTERTAINMENT]
- Target CTR: [CURRENT CTR% → GOAL CTR%]
- Competitor examples: [CHANNELS WITH GOOD THUMBNAILS IN YOUR NICHE]

**Generate 5 thumbnail concepts, each with:**

1. **Visual description** - Exactly what appears in the thumbnail
2. **Text overlay** - 3-4 words max (large, readable at small size)
3. **Color scheme** - Dominant colors for contrast
4. **Emotion/expression** - If face included, what expression
5. **Composition** - Rule of thirds placement, focal point
6. **Psychological trigger** - Why this would get clicked (curiosity gap, shock, desire)

**Thumbnail best practices applied:**
- High contrast (readable at 168x94px mobile size)
- Face with emotion (if applicable)
- Maximum 4 words of text
- No clutter - one clear focal point
- Colors that pop against YouTube's white/dark UI
- Before/after or transformation when relevant
- Arrows/circles for attention (sparingly)

**Also provide:**
- Which concept to A/B test first
- Common thumbnail mistakes for this niche
- Canva/Photoshop layer suggestions`
    },
    {
        id: 61,
        title: 'Instagram Caption Generator',
        category: 'marketing',
        models: ['chatgpt', 'claude', 'gemini'],
        tags: ['instagram', 'caption', 'social-media'],
        popularity: 89,
        prompt: `Write scroll-stopping Instagram captions for my post:

**Post Details:**
- Content type: [PHOTO/CAROUSEL/REEL/STORY]
- Topic/Subject: [WHAT THE POST IS ABOUT]
- Brand/Account type: [PERSONAL/BUSINESS/CREATOR]
- Niche: [YOUR NICHE - e.g., fitness, travel, food, fashion, tech]
- Goal: [ENGAGEMENT/SALES/FOLLOWERS/BRAND AWARENESS]
- Tone: [FUNNY/INSPIRATIONAL/EDUCATIONAL/CASUAL/PROFESSIONAL]

**Target audience:**
- Age range: [DEMOGRAPHIC]
- Interests: [WHAT THEY CARE ABOUT]
- Pain point this addresses: [PROBLEM YOU SOLVE]

**Generate 3 caption options:**

1. **Short & punchy** (under 125 characters) - for quick engagement
2. **Medium storytelling** (150-300 words) - hook + value + CTA
3. **Long-form value** (300+ words) - micro-blog style with tips

**Each caption must include:**
- Strong hook in first line (before "...more" cutoff)
- Relevant emojis (not overdone)
- Clear call-to-action (save, share, comment, link in bio)
- 20-30 relevant hashtags (mix of small, medium, large volume)
- Best posting time recommendation for this content type

**Also provide:**
- Alt text for accessibility
- Story poll/question sticker ideas to pair with this post
- Reels audio suggestion if applicable`
    },
    {
        id: 62,
        title: 'SQL Query Optimizer',
        category: 'coding',
        models: ['chatgpt', 'claude', 'gemini'],
        tags: ['sql', 'database', 'optimization'],
        popularity: 87,
        prompt: `Optimize this SQL query for better performance:

**Current Query:**
\`\`\`sql
[PASTE YOUR SQL QUERY HERE]
\`\`\`

**Context:**
- Database: [MYSQL/POSTGRESQL/SQL SERVER/ORACLE/SQLITE]
- Table sizes: [APPROXIMATE ROW COUNTS FOR EACH TABLE]
- Current execution time: [HOW LONG IT TAKES]
- Indexes available: [EXISTING INDEXES, IF KNOWN]
- Frequency: [HOW OFTEN THIS QUERY RUNS]
- Use case: [REPORTING/REAL-TIME/BATCH/API ENDPOINT]

**Please provide:**

1. **Optimized query** - Rewritten for maximum performance
2. **Explanation of changes** - Why each modification helps
3. **Index recommendations** - What indexes to create (with CREATE INDEX statements)
4. **Execution plan analysis** - What the optimizer likely does with original vs. new
5. **Performance estimate** - Expected improvement factor
6. **Alternative approaches:**
   - CTE version (if applicable)
   - Window function version (if applicable)
   - Materialized view suggestion (if query runs frequently)
7. **Anti-patterns identified** - Common SQL mistakes in the original
8. **Scalability notes** - How this will perform as data grows 10x/100x

**Bonus:**
- If this could be split into multiple simpler queries, show that option
- Suggest query caching strategy if appropriate
- Note any database-specific features that could help`
    },
    {
        id: 63,
        title: 'Presentation Slide Outline',
        category: 'business',
        models: ['chatgpt', 'claude', 'gemini'],
        tags: ['presentation', 'slides', 'pitch'],
        popularity: 88,
        prompt: `Create a compelling presentation slide deck outline:

**Presentation Details:**
- Topic: [SUBJECT OF PRESENTATION]
- Duration: [5/10/15/20/30/60 MINUTES]
- Audience: [WHO - executives, team, clients, investors, conference]
- Purpose: [INFORM/PERSUADE/TEACH/PITCH/UPDATE]
- Presentation tool: [POWERPOINT/GOOGLE SLIDES/KEYNOTE/CANVA]

**Context:**
- Key message: [ONE SENTENCE - what should they remember?]
- Supporting data: [KEY STATS OR FACTS TO INCLUDE]
- Desired outcome: [WHAT ACTION AFTER THE PRESENTATION]
- Audience knowledge level: [NONE/BASIC/INTERMEDIATE/EXPERT]

**Generate a slide-by-slide outline:**

For each slide provide:
1. **Slide title** (clear, action-oriented)
2. **Key message** (one sentence - the "so what?")
3. **Visual suggestion** (chart type, image, diagram, or icon)
4. **Bullet points** (max 3-4 per slide)
5. **Speaker notes** (what to SAY vs. what's on screen)
6. **Transition** (how to move to next slide naturally)

**Structure:**
- Title slide with subtitle
- Agenda/overview
- Problem statement (why this matters)
- 3-5 content slides (main body)
- Data/evidence slide
- Recommendation/solution
- Next steps
- Q&A / Thank you

**Also include:**
- Design tips (color palette, font suggestions)
- Storytelling arc (tension → resolution)
- Backup slides for anticipated questions`
    },
    {
        id: 64,
        title: "Children's Story Writer",
        category: 'creative',
        models: ['chatgpt', 'claude', 'gemini'],
        tags: ['story', 'children', 'bedtime'],
        popularity: 86,
        prompt: `Write an engaging children's story:

**Story Parameters:**
- Child's name: [NAME - to personalize]
- Age group: [2-4/5-7/8-10/11-13]
- Theme/Lesson: [FRIENDSHIP/COURAGE/KINDNESS/HONESTY/DIVERSITY/PERSEVERANCE]
- Setting: [FANTASY KINGDOM/OUTER SPACE/UNDERWATER/FOREST/SCHOOL/HOME]
- Main character type: [CHILD/ANIMAL/MAGICAL CREATURE/ROBOT]
- Tone: [FUNNY/ADVENTUROUS/GENTLE/MYSTERIOUS/SILLY]
- Length: [SHORT - 500 words / MEDIUM - 1000 words / LONG - 2000 words]

**Interests to weave in:** [DINOSAURS/PRINCESSES/SPACE/ANIMALS/SPORTS/MUSIC]

**Story structure:**
1. **Opening** - Introduce character in their world (relatable moment)
2. **Inciting event** - Something changes or a problem appears
3. **Rising action** - Character tries to solve it (with setbacks)
4. **Climax** - The big moment of bravery/cleverness/kindness
5. **Resolution** - Problem solved, lesson learned naturally
6. **Ending** - Warm, satisfying close (with hint of next adventure)

**Guidelines:**
- Age-appropriate vocabulary and sentence length
- Repetition for younger ages (catchphrases, repeated patterns)
- Diverse, inclusive characters
- No scary or violent content
- Include dialogue to bring characters alive
- Sensory details (sounds, colors, textures)
- A moral that emerges naturally (never preachy)

**Also provide:**
- 3 illustration prompts (for key scenes)
- Discussion questions for parents
- A "what happens next?" prompt for the child to continue the story`
    },
    {
        id: 65,
        title: 'API Error Message Writer',
        category: 'coding',
        models: ['chatgpt', 'claude', 'gemini'],
        tags: ['api', 'error-handling', 'developer-experience'],
        popularity: 80,
        prompt: `Write clear, helpful API error messages for my application:

**API Context:**
- API type: [REST/GRAPHQL/GRPC/WEBSOCKET]
- Audience: [INTERNAL DEVS/THIRD-PARTY DEVELOPERS/MIXED]
- Product: [WHAT YOUR API DOES]
- Style guide: [FORMAL/FRIENDLY/MINIMAL]

**Error scenarios to cover:**
[LIST YOUR ERROR CASES - e.g., invalid input, rate limited, unauthorized, resource not found, server error]

**For each error, generate:**

1. **HTTP status code** (with explanation of why this code)
2. **Error code** (machine-readable, e.g., "INVALID_EMAIL_FORMAT")
3. **Message** (human-readable, developer-friendly)
4. **Description** (detailed explanation of what went wrong)
5. **How to fix** (actionable steps for the developer)
6. **Example response** (JSON format):
\`\`\`json
{
  "error": {
    "code": "ERROR_CODE",
    "message": "Brief description",
    "details": "Longer explanation",
    "fix": "What to do",
    "docs": "https://docs.example.com/errors/ERROR_CODE"
  }
}
\`\`\`

**Principles applied:**
- Never expose internal system details or stack traces
- Always tell the developer what to do next
- Include request_id for support escalation
- Consistent format across all errors
- Rate limit errors include retry-after header suggestion
- Validation errors list ALL invalid fields (not just the first)

**Also provide:**
- Error code naming convention recommendation
- Localization strategy for error messages
- Logging recommendations (what to log server-side vs. return to client)`
    },
    {
        id: 66,
        title: 'Google Ads Copy',
        category: 'marketing',
        models: ['chatgpt', 'claude', 'gemini'],
        tags: ['google-ads', 'ppc', 'advertising'],
        popularity: 88,
        prompt: `Write high-converting Google Ads copy:

**Campaign Details:**
- Product/Service: [WHAT YOU'RE ADVERTISING]
- Landing page URL: [WHERE CLICKS GO]
- Campaign goal: [LEADS/SALES/TRAFFIC/BRAND AWARENESS]
- Budget level: [LOW/MEDIUM/HIGH - for competition context]
- Geographic target: [LOCATION]

**Target audience:**
- Who: [DEMOGRAPHICS AND PSYCHOGRAPHICS]
- Search intent: [WHAT THEY'RE SEARCHING FOR WHEN THEY SEE YOUR AD]
- Awareness level: [UNAWARE/PROBLEM-AWARE/SOLUTION-AWARE/PRODUCT-AWARE]

**Primary keywords:** [LIST 5-10 TARGET KEYWORDS]

**Generate for each ad format:**

**1. Responsive Search Ads (RSA):**
- 15 headlines (30 chars max each) - mix of:
  - Keyword-focused (3-4)
  - Benefit-focused (3-4)
  - Urgency/CTA (2-3)
  - Social proof (2-3)
  - Unique value prop (2-3)
- 4 descriptions (90 chars max each)
- Pin recommendations (which headlines to pin to position 1/2)

**2. Ad Extensions:**
- 4 sitelink extensions (title + description)
- 4 callout extensions
- 2 structured snippets
- Call extension text

**3. Competitor differentiation:**
- What makes you different from top 3 competitors
- Counter-positioning headlines

**Best practices applied:**
- Include primary keyword in Headline 1
- Numbers and specifics over vague claims
- Strong CTA verbs (Get, Start, Try, Claim)
- Emotional triggers + logical benefits`
    },
    {
        id: 67,
        title: 'Weekly Status Report',
        category: 'productivity',
        models: ['chatgpt', 'claude', 'gemini'],
        tags: ['status-report', 'update', 'work'],
        popularity: 84,
        prompt: `Write a clear, professional weekly status report:

**Report Context:**
- Your role: [JOB TITLE]
- Team/Department: [YOUR TEAM]
- Reporting to: [MANAGER/STAKEHOLDERS]
- Report format: [EMAIL/DOCUMENT/SLACK/JIRA]
- Week ending: [DATE]

**This week's work:**
- Completed: [LIST TASKS/DELIVERABLES FINISHED]
- In progress: [LIST ONGOING WORK WITH % COMPLETION]
- Blocked: [ANY BLOCKERS OR DEPENDENCIES]
- Meetings/Collaboration: [KEY MEETINGS OR DISCUSSIONS]

**Generate a status report with:**

1. **TL;DR** (3 bullet points - biggest wins this week)
2. **Completed this week:**
   - Task description → Impact/Result
   - Metrics if applicable
3. **In progress:**
   - Task → Expected completion date → Current status (on track/at risk/behind)
4. **Blockers & Risks:**
   - What's blocked → Who/what can unblock → Impact if not resolved
5. **Next week's priorities:**
   - Top 3 goals (specific, measurable)
   - Key deadlines
6. **Decisions needed:**
   - Any items requiring manager input
7. **Wins & Learnings:**
   - One highlight to celebrate
   - One thing learned or improved

**Formatting:**
- Use bullet points (skimmable in 30 seconds)
- Bold the most important items
- Traffic light status: 🟢 On track / 🟡 At risk / 🔴 Blocked
- Keep total length under 300 words`
    },
    {
        id: 68,
        title: 'Debate Arguments Generator',
        category: 'education',
        models: ['chatgpt', 'claude', 'gemini'],
        tags: ['debate', 'arguments', 'critical-thinking'],
        popularity: 82,
        prompt: `Generate comprehensive debate arguments for both sides:

**Debate Topic:** [THE MOTION/STATEMENT TO DEBATE]

**Context:**
- Format: [FORMAL DEBATE/CLASSROOM/ESSAY/DISCUSSION]
- Level: [HIGH SCHOOL/UNIVERSITY/PROFESSIONAL]
- Time per side: [IF FORMAL - SPEAKING TIME]
- Judging criteria: [LOGIC/EVIDENCE/DELIVERY/PERSUASION]

**Generate for BOTH sides (Pro & Con):**

**FOR (Proposition/Affirmative):**
1. **Opening statement** (compelling frame for your side)
2. **Argument 1** - Strongest logical argument
   - Claim → Evidence → Impact
3. **Argument 2** - Emotional/moral argument
   - Claim → Example → Why it matters
4. **Argument 3** - Practical/economic argument
   - Claim → Data → Real-world implication
5. **Anticipated rebuttals** - What the other side will say + your counter

**AGAINST (Opposition/Negative):**
1. **Opening statement** (reframe the debate)
2. **Argument 1** - Deconstruct their strongest point
3. **Argument 2** - Alternative perspective/solution
4. **Argument 3** - Unintended consequences argument
5. **Anticipated rebuttals** - Counter their counters

**For both sides, provide:**
- Key statistics and studies to cite
- Real-world examples and case studies
- Logical fallacies to avoid (and to catch in opponent)
- Quotable one-liners for impact
- Closing statement (powerful final sentence)

**Also include:**
- Most common mistakes in debating this topic
- Judge's perspective: what would be most convincing
- Follow-up questions to prepare for`
    },
    {
        id: 69,
        title: 'Database Schema Designer',
        category: 'coding',
        models: ['chatgpt', 'claude', 'gemini'],
        tags: ['database', 'schema', 'architecture'],
        popularity: 85,
        prompt: `Design a database schema for my application:

**Application Details:**
- App type: [WHAT YOUR APP DOES - e.g., e-commerce, social network, SaaS]
- Scale: [USERS EXPECTED - hundreds/thousands/millions]
- Database: [POSTGRESQL/MYSQL/MONGODB/DYNAMODB/SUPABASE]
- Key features: [LIST 5-10 CORE FEATURES]

**Entities/Objects to model:**
[LIST YOUR MAIN DATA ENTITIES - e.g., Users, Products, Orders, Reviews]

**Requirements:**
- Multi-tenancy: [YES/NO]
- Soft delete: [YES/NO]
- Audit trail: [YES/NO]
- Internationalization: [YES/NO]
- Real-time features: [YES/NO]

**Generate:**

1. **Entity-Relationship Diagram** (text-based/mermaid format)
2. **Table definitions** (for each table):
   - Column name, type, constraints
   - Primary key, foreign keys
   - Indexes (with reasoning)
   - Default values
3. **CREATE TABLE statements** (copy-paste ready SQL)
4. **Relationships:**
   - One-to-one, one-to-many, many-to-many
   - Junction tables where needed
5. **Common queries** this schema supports efficiently
6. **Migration strategy** - Order to create tables (dependency-aware)
7. **Performance considerations:**
   - Denormalization opportunities
   - Partitioning strategy (if needed)
   - Caching layer suggestions
8. **Enum/lookup tables** - For status fields, categories, etc.
9. **Security:** Row-level security, sensitive data handling
10. **Seed data** - Sample INSERT statements for testing`
    },
    {
        id: 70,
        title: 'Brand Voice Guide',
        category: 'marketing',
        models: ['chatgpt', 'claude', 'gemini'],
        tags: ['branding', 'voice', 'tone'],
        popularity: 83,
        prompt: `Create a comprehensive brand voice and tone guide:

**Brand Details:**
- Brand name: [YOUR BRAND]
- Industry: [SECTOR]
- Product/Service: [WHAT YOU OFFER]
- Mission statement: [YOUR MISSION]
- Target audience: [WHO YOU SERVE]
- Competitors: [TOP 3 COMPETITORS]

**Brand personality:**
- If your brand were a person, who would it be? [CELEBRITY/ARCHETYPE]
- 3-5 personality traits: [e.g., witty, warm, bold, reliable, innovative]
- What your brand is NOT: [ANTI-TRAITS - e.g., not corporate, not sarcastic]

**Generate a complete voice guide:**

1. **Voice overview** - 1-paragraph brand voice statement
2. **Voice pillars** (4-5 key attributes):
   - Attribute name
   - What it means (do this)
   - What it doesn't mean (don't do this)
   - Example sentence showing this trait
3. **Tone spectrum** - How voice shifts by context:
   - Social media → [more casual/playful]
   - Customer support → [more empathetic/helpful]
   - Marketing → [more persuasive/exciting]
   - Legal/formal → [more professional/clear]
4. **Writing rules:**
   - Sentence length preference
   - Jargon: use or avoid?
   - Humor: when appropriate?
   - Emoji usage
   - Capitalization style
5. **Do/Don't examples** - 10 before/after rewrites
6. **Word bank** - Preferred words vs. words to avoid
7. **Competitor differentiation** - How your voice stands apart
8. **Template phrases** - Ready-to-use copy for common situations`
    },
    {
        id: 71,
        title: 'Feature Request Prioritizer',
        category: 'business',
        models: ['chatgpt', 'claude', 'gemini'],
        tags: ['product', 'prioritization', 'roadmap'],
        popularity: 81,
        prompt: `Help me prioritize these feature requests for my product roadmap:

**Product Context:**
- Product: [YOUR PRODUCT NAME AND DESCRIPTION]
- Stage: [PRE-LAUNCH/EARLY/GROWTH/MATURE]
- Team size: [NUMBER OF ENGINEERS]
- Sprint length: [1 WEEK/2 WEEKS/4 WEEKS]
- Current North Star metric: [KEY METRIC YOU'RE OPTIMIZING]

**Feature requests to prioritize:**
[LIST FEATURES - e.g.:
1. Dark mode
2. Mobile app
3. API integrations
4. Team collaboration
5. Advanced analytics]

**For each feature, evaluate:**

1. **RICE Score:**
   - Reach: How many users affected (per quarter)
   - Impact: Minimal (0.25) / Low (0.5) / Medium (1) / High (2) / Massive (3)
   - Confidence: Low (50%) / Medium (80%) / High (100%)
   - Effort: Person-weeks to build

2. **Strategic alignment:**
   - Does it serve the North Star metric?
   - Does it reduce churn or drive acquisition?
   - Does it create competitive moat?

3. **Urgency assessment:**
   - Customer demand signal (# of requests, revenue at risk)
   - Competitive pressure
   - Technical debt implications

**Output:**
- Ranked priority list with scores
- Recommended roadmap (Now / Next / Later / Never)
- Quick wins (high impact, low effort)
- "Not now" reasoning for deprioritized items
- Dependencies between features
- Suggested MVP scope for top 3 features`
    },
    {
        id: 72,
        title: 'Regex Explainer',
        category: 'coding',
        models: ['chatgpt', 'claude', 'gemini'],
        tags: ['regex', 'patterns', 'explanation'],
        popularity: 83,
        prompt: `Help me understand and build regular expressions:

**Mode:** [EXPLAIN EXISTING / BUILD NEW / DEBUG BROKEN]

**If EXPLAIN:**
\`\`\`
[PASTE YOUR REGEX HERE]
\`\`\`
- Language/Engine: [JAVASCRIPT/PYTHON/JAVA/PCRE/.NET/GO]

**If BUILD NEW:**
- What to match: [DESCRIBE IN PLAIN ENGLISH]
- Examples that should match: [LIST 3-5 EXAMPLES]
- Examples that should NOT match: [LIST 3-5 NON-MATCHES]
- Language: [FOR ENGINE-SPECIFIC FEATURES]

**If DEBUG:**
- Regex: [YOUR PATTERN]
- Input that fails: [WHAT DOESN'T WORK]
- Expected result: [WHAT YOU WANT]

**For any mode, provide:**

1. **The regex** (final, working version)
2. **Character-by-character breakdown:**
   - Each token explained in plain English
   - Grouping and capture groups labeled
3. **Visual diagram** (text-based railroad diagram)
4. **Test cases** (10 examples: 5 match, 5 don't)
5. **Edge cases** to watch for:
   - Empty strings
   - Unicode/special characters
   - Greedy vs. lazy matching issues
   - Catastrophic backtracking risk
6. **Performance notes** - Is this regex efficient?
7. **Alternative approaches:**
   - Simpler regex if possible
   - Non-regex solution (if regex is overkill)
8. **Common modifications** - How to adjust for slight variations
9. **Code snippet** - Ready-to-use in your language with proper escaping`
    },
    {
        id: 73,
        title: 'Event Planning Checklist',
        category: 'productivity',
        models: ['chatgpt', 'claude', 'gemini'],
        tags: ['event', 'planning', 'checklist'],
        popularity: 80,
        prompt: `Create a comprehensive event planning checklist:

**Event Details:**
- Event type: [CONFERENCE/WORKSHOP/PARTY/WEDDING/CORPORATE/MEETUP/WEBINAR]
- Expected attendees: [NUMBER]
- Date: [WHEN]
- Duration: [HOURS/DAYS]
- Format: [IN-PERSON/VIRTUAL/HYBRID]
- Budget: [RANGE]
- Venue: [TYPE OR SPECIFIC LOCATION]

**Generate a timeline-based checklist:**

**12+ weeks before:**
- [ ] Define goals and success metrics
- [ ] Set budget breakdown (venue, catering, speakers, marketing, contingency)
- [ ] Book venue/platform
- [ ] Identify speakers/entertainment
- [ ] Create event branding

**8-12 weeks before:**
- [ ] Open registration
- [ ] Launch marketing campaign
- [ ] Confirm vendors (catering, AV, photography)
- [ ] Plan agenda/schedule
- [ ] Arrange sponsorships

**4-8 weeks before:**
- [ ] Send speaker briefs
- [ ] Finalize menu/catering
- [ ] Create attendee communications
- [ ] Plan logistics (parking, signage, wifi)
- [ ] Prepare contingency plans

**1-4 weeks before:**
- [ ] Final headcount to vendors
- [ ] Print materials/badges
- [ ] Briefing for staff/volunteers
- [ ] Tech rehearsal (if virtual/hybrid)
- [ ] Send final reminders to attendees

**Day-of checklist:**
- [ ] Venue walkthrough
- [ ] AV check
- [ ] Registration desk setup
- [ ] Emergency contacts handy

**Post-event:**
- [ ] Send thank-you emails
- [ ] Collect feedback surveys
- [ ] Share photos/recordings
- [ ] Budget reconciliation
- [ ] Debrief and lessons learned

**Customize based on:** [YOUR SPECIFIC NEEDS]`
    },
    {
        id: 74,
        title: 'Academic Paper Abstract',
        category: 'education',
        models: ['chatgpt', 'claude', 'gemini'],
        tags: ['academic', 'research', 'abstract'],
        popularity: 79,
        prompt: `Write a compelling academic paper abstract:

**Paper Details:**
- Title: [YOUR PAPER TITLE]
- Field/Discipline: [e.g., Computer Science, Psychology, Economics]
- Paper type: [EMPIRICAL/THEORETICAL/REVIEW/CASE STUDY/META-ANALYSIS]
- Target journal/conference: [WHERE YOU PLAN TO SUBMIT]
- Word limit: [TYPICALLY 150-300 WORDS]

**Content to summarize:**
- Research question/Problem: [WHAT GAP IN KNOWLEDGE YOU ADDRESS]
- Methodology: [HOW YOU INVESTIGATED - experiments, surveys, analysis, etc.]
- Key findings: [MAIN RESULTS WITH NUMBERS]
- Significance: [WHY THIS MATTERS TO THE FIELD]
- Sample/Data: [PARTICIPANTS, DATASET, TIME PERIOD]

**Generate an abstract following this structure:**

1. **Background/Context** (1-2 sentences)
   - What is the broader problem?
   - What gap exists in current research?

2. **Purpose/Objective** (1 sentence)
   - "This study aims to..." / "We investigate..."

3. **Method** (2-3 sentences)
   - Design, participants/data, analysis approach
   - Key variables or measures

4. **Results** (2-3 sentences)
   - Primary findings with specific numbers
   - Statistical significance indicators
   - Unexpected findings (if any)

5. **Conclusion/Implications** (1-2 sentences)
   - What this means for the field
   - Practical applications
   - Future research directions

**Also provide:**
- 5-7 keywords (for indexing)
- Suggested highlights (3-5 bullet points for journal submission)
- One-sentence "elevator pitch" of the paper
- Title alternatives (if current title could be stronger)`
    },
    {
        id: 75,
        title: 'Sales Objection Handler',
        category: 'sales',
        models: ['chatgpt', 'claude', 'gemini'],
        tags: ['objections', 'sales', 'closing'],
        popularity: 87,
        prompt: `Create responses to common sales objections for my product:

**Product/Service:** [WHAT YOU SELL]
**Price point:** [COST]
**Target buyer:** [DECISION MAKER TITLE/TYPE]
**Sales stage:** [COLD OUTREACH/DEMO/PROPOSAL/NEGOTIATION/CLOSE]
**Industry:** [YOUR INDUSTRY]

**Common objections to handle:**
1. "It's too expensive" / "We don't have budget"
2. "We're happy with our current solution"
3. "I need to think about it" / "Send me more info"
4. "We're not ready right now" / "Maybe next quarter"
5. "I need to check with my team/boss"
6. [ADD YOUR SPECIFIC OBJECTION]
7. [ADD YOUR SPECIFIC OBJECTION]

**For each objection, provide:**

1. **Why they say it** - The real concern behind the words
2. **Acknowledge** - Validate without agreeing (never argue)
3. **Reframe** - Shift perspective with a question
4. **Respond** - 2-3 response options (soft/medium/direct)
5. **Evidence** - Social proof or data point to share
6. **Next step** - How to advance the conversation
7. **If they still object** - Graceful fallback / long-term play

**Response style:** [CONSULTATIVE/CHALLENGER/SOLUTION-SELLING]

**Also include:**
- Objection prevention tips (address before they come up)
- Discovery questions that eliminate objections early
- Email follow-up template for each objection type
- When to walk away (not every deal is worth saving)
- Framework: Feel → Felt → Found method examples`
    },
    {
        id: 76,
        title: 'Privacy Policy Generator',
        category: 'legal',
        models: ['chatgpt', 'claude', 'gemini'],
        tags: ['privacy', 'policy', 'compliance'],
        popularity: 78,
        prompt: `Generate a privacy policy for my website/app:

**Business Details:**
- Company/App name: [NAME]
- Website URL: [URL]
- Type of service: [E-COMMERCE/SAAS/BLOG/MOBILE APP/MARKETPLACE]
- Country/Region: [FOR LEGAL COMPLIANCE - US/EU/UK/GLOBAL]
- Target users: [GENERAL/CHILDREN/B2B]

**Data Collection:**
- Personal data collected: [EMAIL/NAME/PHONE/ADDRESS/PAYMENT/IP/COOKIES]
- Collection method: [FORMS/COOKIES/ANALYTICS/THIRD-PARTY/AUTO-COLLECTED]
- Purpose of collection: [ACCOUNT CREATION/MARKETING/ANALYTICS/PERSONALIZATION]
- Third-party sharing: [WHO YOU SHARE DATA WITH - analytics, ads, payment processors]
- Data storage: [WHERE - cloud provider, country]
- Retention period: [HOW LONG YOU KEEP DATA]

**Features/Integrations:**
- Analytics: [GOOGLE ANALYTICS/MIXPANEL/CUSTOM]
- Advertising: [GOOGLE ADS/FACEBOOK PIXEL/NONE]
- Payment processing: [STRIPE/PAYPAL/NONE]
- Email marketing: [MAILCHIMP/CONVERTKIT/NONE]
- Social login: [GOOGLE/FACEBOOK/APPLE/NONE]
- Cookies used: [YES - types / NO]

**Generate a policy that includes:**

1. Information we collect (and how)
2. How we use your information
3. Information sharing and disclosure
4. Cookies and tracking technologies
5. Data security measures
6. Your privacy rights (GDPR/CCPA as applicable)
7. Children's privacy (COPPA if applicable)
8. Data retention and deletion
9. International data transfers
10. Changes to this policy
11. Contact information
12. Effective date

**Compliance frameworks:** [GDPR/CCPA/PIPEDA/LGPD - based on your audience]

⚠️ This is a template starting point. Have a qualified attorney review before publishing.`
    },
    {
        id: 77,
        title: 'Meal Prep Plan',
        category: 'health',
        models: ['chatgpt', 'claude', 'gemini'],
        tags: ['meal-prep', 'nutrition', 'cooking'],
        popularity: 85,
        prompt: `Create a weekly meal prep plan optimized for time and nutrition:

**My Details:**
- Meals to prep: [BREAKFAST/LUNCH/DINNER/SNACKS - which ones?]
- Days to cover: [5 WORKDAYS/FULL 7 DAYS]
- Prep day: [SUNDAY/SATURDAY/TWO SHORTER SESSIONS]
- Max prep time: [1 HOUR/2 HOURS/3 HOURS]
- People eating: [NUMBER]
- Kitchen equipment: [OVEN/STOVETOP/INSTANT POT/AIR FRYER/SHEET PAN]
- Storage: [FRIDGE ONLY (3-4 days) / FREEZER AVAILABLE (longer)]

**Dietary needs:**
- Style: [OMNIVORE/VEGETARIAN/VEGAN/KETO/PALEO/HIGH-PROTEIN]
- Allergies: [LIST ANY]
- Calories/day: [TARGET OR "flexible"]
- Protein goal: [GRAMS/DAY IF TRACKING]
- Budget: [$/WEEK]
- Foods I don't like: [LIST]

**Generate:**

1. **The Menu** - What you'll eat each day (5-7 days)
   - Breakfast | Lunch | Dinner | Snack
   - Avoid repetition (max 2x same meal per week)

2. **Master Grocery List** (organized by store section):
   - Produce | Protein | Dairy | Pantry | Frozen

3. **Prep Day Timeline** (hour-by-hour):
   - What to start first (longest cook time)
   - What to prep simultaneously
   - Assembly order
   - Cool-down and storage sequence

4. **Storage Instructions:**
   - Container recommendations
   - What freezes well vs. fridge only
   - Reheating instructions per meal
   - Freshness timeline (eat by day X)

5. **Nutrition summary:** Daily averages (cal/protein/carb/fat)
6. **Shopping cost estimate**
7. **Substitution options** (if store is out of something)
8. **Leftover rescue ideas** (repurpose extras creatively)`
    },
    {
        id: 78,
        title: 'Code Refactoring Guide',
        category: 'coding',
        models: ['chatgpt', 'claude', 'gemini'],
        tags: ['refactoring', 'clean-code', 'best-practices'],
        popularity: 86,
        prompt: `Refactor this code to be cleaner, more maintainable, and more performant:

**Code to refactor:**
\`\`\`[LANGUAGE]
[PASTE YOUR CODE HERE]
\`\`\`

**Context:**
- Language/Framework: [LANGUAGE + VERSION]
- Project type: [WEB APP/API/CLI/LIBRARY/MICROSERVICE]
- Code age: [NEW/LEGACY/INHERITED]
- Test coverage: [YES WITH TESTS/NO TESTS/PARTIAL]
- Team style guide: [IF ANY - e.g., airbnb, google, standard]
- Performance requirements: [ANY SPECIFIC CONSTRAINTS]

**Refactoring goals (prioritize):**
- [ ] Readability (easier to understand)
- [ ] Maintainability (easier to change)
- [ ] Performance (faster execution)
- [ ] Testability (easier to unit test)
- [ ] Reusability (extract shared logic)
- [ ] Type safety (stronger typing)
- [ ] Error handling (more robust)

**Please provide:**

1. **Refactored code** (complete, working version)
2. **Change summary** - What was changed and why (bullet points)
3. **Design patterns applied** - Name the patterns used
4. **Code smells found** in the original:
   - Smell name → Location → Fix applied
5. **Before/After comparison** for key sections
6. **Performance impact** - Any measurable improvements
7. **Potential risks** - What could break (regression awareness)
8. **Test suggestions** - Unit tests to add for refactored code
9. **Further improvements** - What to tackle in a follow-up PR
10. **SOLID principles** - Which principles were violated/applied

**Rules:**
- Preserve all existing behavior (no functional changes)
- Keep the refactoring atomic (one concern per change)
- Add comments only where logic is genuinely complex`
    },
    {
        id: 79,
        title: 'Investor Update Email',
        category: 'business',
        models: ['chatgpt', 'claude', 'gemini'],
        tags: ['investor', 'startup', 'update'],
        popularity: 82,
        prompt: `Write a monthly/quarterly investor update email:

**Company Details:**
- Company name: [YOUR STARTUP]
- Stage: [PRE-SEED/SEED/SERIES A/SERIES B+]
- Industry: [SECTOR]
- Months since last raise: [NUMBER]
- Next fundraise timeline: [IF APPLICABLE]

**This period's metrics:**
- Revenue/MRR: [CURRENT] (vs. last period: [PREVIOUS])
- Growth rate: [MoM OR QoQ %]
- Users/Customers: [NUMBER]
- Burn rate: [MONTHLY SPEND]
- Runway: [MONTHS REMAINING]
- Key metric: [YOUR NORTH STAR - e.g., DAU, NRR, GMV]

**Highlights:**
- Top wins: [2-3 BIGGEST ACHIEVEMENTS]
- Key hires: [NEW TEAM MEMBERS]
- Product milestones: [WHAT YOU SHIPPED]
- Press/Awards: [ANY COVERAGE]

**Challenges:**
- What's hard right now: [HONEST ASSESSMENT]
- What you're doing about it: [YOUR PLAN]

**Generate an investor update with:**

1. **Subject line** (clear, professional: "Company Name - Month Year Update")
2. **TL;DR** (3 bullets - the headline metrics)
3. **Metrics dashboard** (formatted table/visual)
4. **Wins section** (celebrate momentum)
5. **Challenges section** (be transparent - investors respect honesty)
6. **Product update** (what shipped, what's next)
7. **Team update** (hires, org changes)
8. **Asks** (specific, actionable):
   - Intros needed
   - Hiring help
   - Customer referrals
   - Advice on specific decisions
9. **Looking ahead** (next 30/60/90 day priorities)
10. **Closing** (gratitude, next update date)

**Tone:** Confident but honest. Data-driven. Brief. Respectful of their time.`
    },
    {
        id: 80,
        title: 'TikTok Script Writer',
        category: 'marketing',
        models: ['chatgpt', 'claude', 'gemini'],
        tags: ['tiktok', 'video', 'short-form'],
        popularity: 90,
        prompt: `Write a viral TikTok video script:

**Video Details:**
- Niche: [YOUR CONTENT NICHE]
- Topic: [SPECIFIC SUBJECT OF THIS VIDEO]
- Video length: [15 SEC/30 SEC/60 SEC/3 MIN]
- Style: [TALKING HEAD/TUTORIAL/STORYTIME/SKIT/TRENDING AUDIO/GREEN SCREEN]
- Goal: [VIEWS/FOLLOWERS/SALES/EDUCATION/ENTERTAINMENT]

**Account context:**
- Follower count: [FOR CONTENT CALIBRATION]
- Target audience: [AGE/INTERESTS/PROBLEMS]
- Brand voice: [FUNNY/PROFESSIONAL/EDGY/WHOLESOME/SARCASTIC]
- Product to promote: [IF APPLICABLE - OR "no product"]

**Generate a complete video script:**

1. **Hook** (first 1-3 seconds - CRITICAL):
   - Visual hook (what's on screen)
   - Audio hook (first words spoken)
   - Text overlay hook
   - Why this stops the scroll

2. **Body** (main content):
   - Second-by-second breakdown:
     - [0:00-0:03] Hook
     - [0:03-0:08] Setup/context
     - [0:08-0:25] Main content/value
     - [0:25-0:30] Payoff/CTA
   - B-roll/visual suggestions for each section
   - Text overlays for each section

3. **CTA** (last 2-5 seconds):
   - What action you want (follow, comment, share, link in bio)
   - How to drive it naturally (not "follow for more")

4. **Captions:** Written out caption with hashtags (3-5 relevant)
5. **Audio suggestion:** Trending sound or original audio direction
6. **Posting strategy:**
   - Best time to post
   - First comment to pin
   - Reply strategy for engagement

**TikTok algorithm tips applied:**
- High watch-through rate (loop-worthy ending)
- Encourages comments (controversial take, question, "which one?")
- Shareable (relatable, surprising, or useful)
- Text on screen (most watch without sound)

**Generate 3 variations** of the same concept for A/B testing.`
    },
];

// Compute real category counts after PROMPTS is defined
computeCategoryCounts();
