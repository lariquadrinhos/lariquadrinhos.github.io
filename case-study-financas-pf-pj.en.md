# Case Study: Finanças PF+PJ

<!-- bloco: card -->
# The spreadsheet that became a product
A desktop app for managing personal and business finances together.

<!-- bloco: case -->

## 1. The idea
<!-- trilha: Introduction -->

<!-- bloco: hero -->
# The spreadsheet that became a product

**I saw someone trying to fit their personal finances and their company's into the same spreadsheet. I decided to turn that scene into a desktop app. Today: it works, and a real person uses it.**

**Role** · Product/UX Designer, present from discovery to code

**Scope** · Idea → product document → domain modeling → flows → wireframes → design system → mockups → development

**Deliverables** · 26 screens in light and dark, 24 empty states, a design system with 11 components and 16 icons, 9 design documents

**Status** · In use, being tested by a real user

**Repository** · The whole project in the open, from the product document to the implementation rules, [link](https://github.com/lariquadrinhos/case-financas)

I was in every stage, from the first conversation to the code: I defined the problem, modeled the domain, designed the entire product, built the design system and stayed on through implementation alongside a developer, learning version control and AI-assisted programming along the way.

The final delivery went beyond the screens: I kept a repository documenting the whole process, where every decision was recorded together with the reasoning behind it. That's what let information cross every stage without getting lost and reach development intact.

In Brazil, a person (PF, *pessoa física*) and their company (PJ, *pessoa jurídica*) are two separate financial lives. The product keeps both, and its main report is the DRE, the Brazilian income statement.

![Recording of the app in use, with demo data. The home screen shows the month's pending items. The cursor opens the DRE, the income statement, from the sidebar and switches between PF, PJ and Consolidated: the same month read three ways, with different numbers in each. Then it opens Financial Indicators and goes back from October to September, and ends in the History, filtered by paid entries in the Food category, month by month since May.](publico/midias/financas-1-produto-em-uso.mp4)
Legenda: Recorded in a window narrower than the 1440 the screens were designed for, with demo data.

---

## 2. I taught the tool before using it
<!-- trilha: Discovery -->

**Before opening any design tool, I defined the method.**

I ran the whole project with AI, and the first thing I built wasn't a screen: it was a skill. A reusable set of instructions that taught Claude to run every later stage, from brainstorming to domain modeling. I grounded that skill in frameworks for structuring uncertainty and framing questions, and set one non-negotiable rule in it: no information gap gets filled by assumption.

With the method in place, I directed the writing of the product document from two sources: a brainstorming document and the spreadsheet the user already had. I asked for the spreadsheet's formulas to be read, not just its visible values. That instruction surfaced the business logic the spreadsheet already held.

With the rules stable, I asked for the document to be translated into a formal domain model: events, commands, policies and aggregates. Where there was tension with no right answer yet, I had it marked as a hotspot instead of decided on autopilot.

![Two excerpts from project files. In the loop-produto skill, the never-assume guideline: make knowledge gaps explicit instead of filling them yourself, with the four quadrants, from known knowns to unknown unknowns. In the event storming, the start of the hotspot table, with H4 closed by an ADR and H5 modeled and not tested.](publico/midias/financas-2-descoberta.png)
Legenda: The rule in the skill, and the doubts it turned into hotspots.

---

## 3. Figma was half the delivery
<!-- trilha: Design and documentation -->

**With the business model validated, I moved from "what the system does" to "what the person sees".**

I started with the user flow: I mapped the complete path, from first access to day-to-day actions. That way I designed every screen knowing why it existed and what came before and after it.

Designing the wireframes brought up more decisions. Every time a screen raised a behavior question, I recorded the question, the answer and the reasoning behind it, in the order they happened. That habit became a document: a chronological record of why each screen is the way it is.

And the documentation became a handoff artifact. For each screen, I wrote the functional specification apart from the visual design, the exact data model of each field, and a closed naming glossary. The goal was simple: whoever implemented it shouldn't need to ask me anything that wasn't already written down.

Part of the interface is generated from data. So I also documented the rendering rules: the algorithm behind the drawing. Without them, whoever programmed it would have to invent behavior for every edge case.

![New Entry in three excerpts. In the FigJam flow, it leads to the four tabs and to Saved, success. In the wireframe of the Expense tab, the date comes filled in with today, the status Paid and the entity PF come preselected, and there's a field to search for or create a category. In the specification, lines 125 to 132, the same fields: date prefilled with today, Paid by default, PF by default, and a new category without leaving the form.](publico/midias/financas-3-desenho.png)
Legenda: New Entry in the flow, the wireframe and the specification.

---

## 4. Dark isn't light inverted
<!-- trilha: Design system -->

**Before applying any final visuals, I built the system.**

A closed collection of color tokens named by semantic role, each with its own value for the light theme and for the dark one. Alongside it, type, spacing and radius scales, and a component library documented with every variant and every state.

And it was only by seeing color on the real screen that new decisions appeared. The color pair that tells the person apart from the business passed contrast in the light theme and failed in the dark one. Fixing it took different hues per theme, not an automatic adjustment. A dark theme isn't an inversion: it's a second system, and it has to be validated on its own.

![The profit-by-entity card from the Monthly Evolution mockup, in the light and dark themes, with the PF and PJ bars. Below, each color's contrast against the card, with a minimum of 3:1: in light, PF 4.56 and PJ 5.99; in dark with the light colors, PJ drops to 2.89 and fails; with the corrected colors, PF 5.80 and PJ 5.13.](publico/midias/financas-4-design-system.png)
Legenda: The PF/PJ pair in both themes: in dark, the light theme's purple failed.

---

## 5. A hundred agents checking my design
<!-- trilha: Development -->

**I handed off the design and stayed on.**

I built the product alongside a developer and Claude: a complete backend, database, API contract and hundreds of automated tests, screen by screen, faithful to what I had designed and documented.

At the end, a fidelity audit. More than a hundred AI agents running in parallel, each checking an implemented screen against the real frame in Figma, showed how much the documentation carried on its own. With everything specified beforehand, the implementation only had to follow.

---

## 6. What stayed
<!-- trilha: Results -->

**The product exists, works and is in use.**

I learned to decide what things are, and to hold that decision across every screen afterwards. I learned to write for whoever comes after me, and found that documenting well is what lets design survive contact with implementation. And I learned that working with AI is decided before, not after: what defines the quality of what comes back is the rule I set at the start, not my judgment of each answer. Without it, any plausible result gets through.

<!-- bloco: par -->
![The product's Home, running with demo data: the Where My Money Is board, with accounts in blocks sized by balance, debts right below and net worth at the bottom, and the Expenses by Category board, with the month's spending in blocks.](publico/midias/financas-6-produto-home.png)
![The product's Monthly Evolution, running with demo data: the Net Profit by entity chart, with one bar per month from May to October and October's value, R$ 6,530, highlighted; below, the start of the month-by-month table, with revenue, EBITDA and net profit.](publico/midias/financas-6-produto-evolucao.png)
Legenda: The Home and the Monthly Evolution in the product, already with the improvements that came from usage tests.

<!-- bloco: provas -->
The UX decisions, the specification of each screen and the data model
[See the repository](https://github.com/lariquadrinhos/case-financas)

The 46 screens in light and dark, the style guide and the tokens
[See the file in Figma](https://www.figma.com/design/7IZBeQV15kgZp7Shcqh4c8)

The user flow mapped, from first access to day-to-day actions
[See the flow in FigJam](https://www.figma.com/board/6cLvP3Mwhy4yWGLJBDsp3z)

<!-- bloco: extra -->
## The Product

Anyone who has a business on top of their personal life doesn't have one financial life: they have
two. Mixed in the same spreadsheet, they can turn into a mess.

This app is a single ledger with three readings. Each entry is recorded once and feeds Consolidated,
PF and PJ at the same time. No duplicated data.

The result closes on a cash basis and already shows future months **without simulating anything**:
what's already scheduled (recurring items, debt installments) is the projection. Every gap between
planned and paid becomes an item in **Pending**, the single inbox for everything that needs a
decision.

Nothing is hidden in a menu. One sidebar holds the whole product: adding something new, the four
reports (DRE, Balance Sheet, Monthly Evolution, Indicators), Recurring Review, History, Chart of
Accounts. The Home is a command center the person arranges their own way: they reorder and
minimize each card, and the layout is saved. Adding income or an expense is one click on "+ New
Entry", from any screen.

In the **Pending** card, the person sees everything that needs a decision. Each item with the
right verb: Direct, Allocate, Review, Pay. "Where My Money Is" and "Expenses by Category" are
**interactive treemaps**: block size is value, and clicking opens the detail and lets you
**redirect money on the spot**.
Every report moves month by month, with Consolidated/PF/PJ and Paid/Planned always in view, never
behind a hidden filter.

**Free Spending** is for anyone who wants some money to spend however they like, without a label.
One click, just the amount. No category, no account, no date.
**Income and Outflows** shows where the month's money came from and where it went, line by line.
And every payment, adjustment or discrepancy creates an automatic **Event**.

The look is calm by decision, not by chance. Each screen's hierarchy follows the information the
data already carries. The design doesn't fight the number; it organizes on top of what the number
already says. With so many tables and charts together, visual overload was the real risk; what
matters gets a quiet emphasis, never one that wears you out. And no color stands for positive or
negative on its own. Judging the number is up to whoever is looking.

The depth is that of a real financial tool: an amortization schedule where an interest adjustment
recalculates only what hasn't come due yet, the sale of an asset split across several destinations,
18 financial indicators, recurring items with installments propagated automatically month by month.
All local, no login, no account friction.

---
