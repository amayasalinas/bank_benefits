from docx import Document
from docx.shared import Pt
from docx.enum.text import WD_ALIGN_PARAGRAPH

doc = Document()

title = doc.add_heading('Product Requirements Document (PRD) - Eliseo (Technical PM Edition)', 0)
title.alignment = WD_ALIGN_PARAGRAPH.CENTER

doc.add_heading('1. Executive Summary & KPIs', level=1)
doc.add_paragraph('Vision: Eliseo empowers Colombian consumers to effortlessly maximize the value of their credit and debit cards by providing real-time, category-based card recommendations, centralized benefits, and active offer discovery.', style='List Bullet')
doc.add_paragraph('Target Audience: Banked Colombians (25-45 y/o) who hold multiple payment cards and actively travel, dine out, or shop, but lack the time to track complex loyalty programs and benefits.', style='List Bullet')
doc.add_paragraph('Success Metrics (KPIs):', style='List Bullet')
doc.add_paragraph('Adoption: Average of >2.5 cards added per user during their first week.', style='List Number 2')
doc.add_paragraph('Engagement: >3 sessions per week per active user accessing the "Recommender" or "Offers" tab.', style='List Number 2')
doc.add_paragraph('Conversion (Monetization Proxy): >5% click-through rate (CTR) to official bank application links from the "Destacados" or "Offers" sections.', style='List Number 2')
doc.add_paragraph('North Star Metric: Number of "Optimized Transactions" generated (measured by how many times a user checks the recommender before making a purchase).', style='List Bullet')

doc.add_heading('2. Scope Definition (MoSCoW)', level=1)
doc.add_paragraph('Must Have (MVP - The "Walking Skeleton"):', style='List Bullet')
doc.add_paragraph('User authentication (Sign up / Login).', style='List Number 2')
doc.add_paragraph('Manual mechanism to add a card without storing sensitive data (Bin/Bank selection only, plus optional nickname and last 4 digits).', style='List Number 2')
doc.add_paragraph('Dashboard showing primary card and summary metrics.', style='List Number 2')
doc.add_paragraph('Category-based Recommender engine (matching user\'s added cards against hardcoded benefits DB).', style='List Number 2')
doc.add_paragraph('Card Detail view showing categorized benefits.', style='List Number 2')

doc.add_paragraph('Should Have:', style='List Bullet')
doc.add_paragraph('Dynamic Offers feed with expiration dates.', style='List Number 2')
doc.add_paragraph('Filtering of Offers by Bank and Category.', style='List Number 2')
doc.add_paragraph('Highlighting of "Best in Market" cards (Destacados) to drive affiliate conversions.', style='List Number 2')

doc.add_paragraph('Could Have:', style='List Bullet')
doc.add_paragraph('Push notifications for expiring offers.', style='List Number 2')
doc.add_paragraph('Geolocated benefits (e.g., "You are near an airport, here are your Lounge benefits").', style='List Number 2')

doc.add_paragraph('Won\'t Have (v1.0):', style='List Bullet')
doc.add_paragraph('Direct API integration with banks for real-time transaction history tracking (Open Banking).', style='List Number 2')
doc.add_paragraph('Automatic points/miles balance scraping.', style='List Number 2')

doc.add_heading('3. User Personas & Jobs to be Done (JTBD)', level=1)
doc.add_paragraph('Primary Persona: Andrés (32), Tech-savvy Millennial. Works in tech/marketing. Has 4 cards (Nu, Bancolombia LifeMiles, RappiCard, Falabella). Travels 3 times a year. Wants to get free flights but forgets which card gives lounge access or the best miles multiplier.', style='List Bullet')
doc.add_paragraph('JTBD:', style='List Bullet')
doc.add_paragraph('"When I am waiting to pay at a restaurant, I want to quickly see which of my 4 cards gives me the best cashback, so that I don\'t leave money on the table."', style='List Number 2')
doc.add_paragraph('"When I am planning a trip, I want to know which of my cards offers free airport lounge access, so that I can wait comfortably without paying $30 USD."', style='List Number 2')

doc.add_heading('4. Functional Requirements (User Stories)', level=1)

doc.add_heading('4.1. Core: Manage Wallet', level=2)
doc.add_paragraph('Story: As a user, I want to add a card to my digital wallet by selecting the bank and the card model, so that the app knows what benefits I have.', style='List Bullet')
doc.add_paragraph('Acceptance Criteria:', style='List Bullet')
doc.add_paragraph('[ ] System displays a searchable list of banks (traditional and digital).', style='List Number 2')
doc.add_paragraph('[ ] System filters card models immediately after bank selection.', style='List Number 2')
doc.add_paragraph('[ ] User can optionally enter a string (max 40 chars) for Nickname, and numeric (max 4 chars) for "Last 4 digits".', style='List Number 2')
doc.add_paragraph('[ ] System saves the mapping (user_id, card_id, nickname, last_four) to the database.', style='List Number 2')

doc.add_heading('4.2. Core: Recommendation Engine', level=2)
doc.add_paragraph('Story: As a user, I want to select a spending category (e.g., "Restaurants") so that the app ranks my cards from best to worst for that purchase.', style='List Bullet')
doc.add_paragraph('Acceptance Criteria:', style='List Bullet')
doc.add_paragraph('[ ] System retrieves all cards linked to the active user.', style='List Number 2')
doc.add_paragraph('[ ] System fetches benefits for those cards matching the selected category_id.', style='List Number 2')
doc.add_paragraph('[ ] System sorts cards based on a weighting algorithm (e.g., 5% cashback > 3% cashback > x2 points).', style='List Number 2')
doc.add_paragraph('[ ] Results load in < 500ms.', style='List Number 2')
doc.add_paragraph('[ ] If no card has specific benefits for the category, system displays a fallback message teaching the user to use their base baseline card.', style='List Number 2')

doc.add_heading('4.3. Core: Explorable Offers', level=2)
doc.add_paragraph('Story: As a user, I want to filter current market offers by category or bank, so that I can find discounts I can use this weekend.', style='List Bullet')
doc.add_paragraph('Acceptance Criteria:', style='List Bullet')
doc.add_paragraph('[ ] System queries the Offers table for active promotions (valid_until >= today OR valid_until is NULL).', style='List Number 2')
doc.add_paragraph('[ ] User can toggle one or multiple bank chips to filter.', style='List Number 2')
doc.add_paragraph('[ ] User can toggle category chips to filter.', style='List Number 2')
doc.add_paragraph('[ ] Clicking an offer opens a detailed view with a direct, trackable outbound link to the bank.', style='List Number 2')

doc.add_heading('5. Core Logical Flows', level=1)

doc.add_heading('Flow 1: Add a Card (Happy Path)', level=2)
doc.add_paragraph('1. User clicks "+" or "Agregar tarjeta".', style='List Number')
doc.add_paragraph('2. System fetches SELECT id, name, logo FROM banks ORDER BY name. User selects bank "Bancolombia".', style='List Number')
doc.add_paragraph('3. System fetches SELECT * FROM cards WHERE bank_id = "Bancolombia". User selects "Visa LifeMiles Platinum".', style='List Number')
doc.add_paragraph('4. User enters nickname "Mi tarjeta principal".', style='List Number')
doc.add_paragraph('5. User clicks "Guardar".', style='List Number')
doc.add_paragraph('6. Frontend sends POST /api/user-cards with payload { user_id: "uuid", card_id: "uuid", nickname: "Mi tarjeta principal", is_primary: true/false }.', style='List Number')
doc.add_paragraph('7. Backend validates payload and inserts into cards_user. Returns 200 OK.', style='List Number')
doc.add_paragraph('8. Frontend redirects to Dashboard /dashboard and displays the newly added card via optimistic UI update.', style='List Number')

doc.add_heading('Flow 2: The Recommender (Edge Case: No Cards Added)', level=2)
doc.add_paragraph('1. User navigates to /recommender and selects "Combustible".', style='List Number')
doc.add_paragraph('2. System checks user\'s wallet. Wallet count = 0.', style='List Number')
doc.add_paragraph('3. System interrupts flow and shows Empty State: "Agrega tu primera tarjeta para obtener recomendaciones personalizadas."', style='List Number')
doc.add_paragraph('4. User clicks CTA -> Redirects to Add Card flow.', style='List Number')

doc.add_heading('6. Data Requirements', level=1)
doc.add_paragraph('Key Entities:', style='List Bullet')
doc.add_paragraph('Users: id (UUID), email, created_at. (Managed via Supabase Auth).', style='List Number 2')
doc.add_paragraph('Banks: id (string/PK), name, short_name, is_digital, logo_color, website.', style='List Number 2')
doc.add_paragraph('Cards: id (PK), bank_id (FK), name, franchise (Visa/MC/Amex), tier (Classic, Gold, Black...), type (Credit/Debit).', style='List Number 2')
doc.add_paragraph('Benefits: id (PK), card_id (FK), category (enum: viajes, restaurantes, etc.), value_type (cashback_percent, points_multiplier, etc.), value (numeric).', style='List Number 2')
doc.add_paragraph('Cards_User (Junction): id (PK), user_id (FK), card_id (FK), nickname, last_four, is_primary (boolean).', style='List Number 2')
doc.add_paragraph('Offers: id (PK), bank_id (FK), title, description, category, valid_until (timestamp).', style='List Number 2')

doc.add_paragraph('Privacy:', style='List Bullet')
doc.add_paragraph('Data Scoping: Row Level Security (RLS) policies must ensure users can ONLY read/write their own cards_user records.', style='List Number 2')
doc.add_paragraph('Sensitive Data: Real credit card PANs, expiration dates, and CVVs are explicitly NOT collected or processed to avoid PCI-DSS scope entirely.', style='List Number 2')

doc.add_heading('7. Non-Functional Requirements (NFRs)', level=1)
doc.add_paragraph('Performance:', style='List Bullet')
doc.add_paragraph('Time To Interactive (TTI) < 1.5 seconds on 3G mobile networks.', style='List Number 2')
doc.add_paragraph('DB Queries for the Recommender must execute in < 100ms.', style='List Number 2')
doc.add_paragraph('Scalability: Horizontal scaling for reads via Supabase Edge Functions/CDN, supporting up to 1,000 Concurrent Users.', style='List Bullet')
doc.add_paragraph('Security: AuthN via Supabase JWT. AuthZ managed via RLS in Postgres. HTTPS/TLS 1.3 forced on all connections.', style='List Bullet')
doc.add_paragraph('Maintainability: Strict TypeScript interfaces for all DB entity mappings. Standardized error handling mechanism.', style='List Bullet')

doc.add_heading('8. Technical Constraints & Stack Recommendation', level=1)
doc.add_paragraph('Constraints: Launch must be completed rapidly to test market fit. Budget is limited, requiring free-tier or pay-as-you-go infrastructure.', style='List Bullet')
doc.add_paragraph('Recommended Stack:', style='List Bullet')
doc.add_paragraph('Frontend: React (Vite) + Tailwind CSS + Framer Motion (for glassmorphism and Micro-animations). Hosted on Vercel or Netlify.', style='List Number 2')
doc.add_paragraph('Backend/DB: Supabase (PostgreSQL, Auth, Edge Functions). Eliminates the need to write boilerplate CRUD APIs and offers out-of-the-box realtime capabilities and RLS.', style='List Number 2')

doc.add_heading('9. Open Questions / Blockers', level=1)
doc.add_paragraph('1. Recommender Algorithm Logic: How do we objectively rank a card offering "10% cashback" vs a card offering "x3 LATAM Miles"? Does the user need a "Preferences" screen to weight miles vs. cashback?', style='List Number')
doc.add_paragraph('2. Data Ingestion: Manual entry of Card Benefits does not scale. What is the process or tool for scraping bank websites to keep the Offers table and Benefits table updated?', style='List Number')

doc.save('PRD_Eliseo.docx')
print("Document generated successfully.")
