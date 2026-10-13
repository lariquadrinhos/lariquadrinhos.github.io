# Case Study: Redesigning the reimbursement flow

<!-- bloco: card -->
# Every week, from scratch
I redesigned the user flow for recurring reimbursement requests in an insurance app.


<!-- bloco: case -->

## 1. The idea
<!-- trilha: Introduction -->

<!-- bloco: hero -->
# Every week, from scratch

**I watched up close someone who has to request reimbursements. Even though it's a recurring task, the app treats it as if it were always the first time. I decided to redesign the flow so the second time would be different from the first.**

**Role** · UX/UI Designer. From diagnosis to prototype.

**Method** · Diagnosis measured on the real product, before any proposal

**Deliverables** · Heuristic evaluation of 32 screens, redesigned flow, wireframes, design system, mockups, complete microcopy, error, empty and loading states, clickable prototype

**Repository** · Documentation of the process, from diagnosis to implementation rules, [link](https://github.com/lariquadrinhos/case-reembolso)

I followed the frustration of someone I know, repeating every month a process the app made harder than it needed to be. Before proposing anything, I measured the real flow, screen by screen. And I rebuilt the app's own visual system. The result: a flow that's done in 5 screens with active input, an initial capture that removes typing, and an onboarding that collects information so the user doesn't have to repeat it. This case goes up to the prototype, where the proposed flow can be tried.

---

## 2. Look before judging
<!-- trilha: Diagnosis -->

**Before any analysis, there was observation.**

I did qualitative research with one participant: repeated observation, conversation and feedback on the proposal. That gave me a suspicion before I opened any tool: the problem wasn't a specific screen, it was the disorder.

**I turned "I think it's bad" into a diagnosis.**

I went through the real flow screen by screen and evaluated each one against Nielsen's ten usability heuristics, with a score and a severity, tying each problem to the exact place where it happens.

Then I mapped the path as the person lives it, noting at each step what they do and where they get stuck. That map is what showed where someone is likely to give up.

![Four annotations over app screenshots, each numbered by the step of the flow: a telemedicine cross-sell pop-up at step 5, choosing the category at 9, procedure details at 11, treatment dates at 12.](publico/midias/reembolso-2-diagnostico.png)
Legenda: Four of the eighteen steps in the current flow. The number on each annotation is its position in the flow: that's how each problem stays tied to the place where it happens.

**The constraint wasn't the enemy.**

I realized that many of the heaviest steps exist because of regulatory requirements, and no redesign can remove them. The weight didn't come from them; it came from where they were and how many times they repeated. Biometric validation happened at the end, when giving up is already costly. The terms came back with every request. Bank details were retyped every month, even though they were already in the plan's records. I marked each one and changed the question: instead of "does this need to exist?", I started asking "does this need to exist *like this*, and *now*?".

---

## 3. From diagnosis to flow
<!-- trilha: New flow -->

**Five principles, and a filter for every decision.**

Before designing, I wrote five principles, each tied to the heuristics it fixes.

1. OCR and reuse replace typing whenever the data already exists somewhere.
2. A persistent stepper, because nobody should have to wonder how much is left.
3. Validation as you type, with a message that says what to do.
4. Plain language, with help next to the hard term.
5. A recurring mode, because asking for the fourth time can't weigh like the first.

The cause was structural. Data that never changes lived inside the request, and so it was demanded again with every request. That flow was one thing that should have been two.

I separated what happens once in a lifetime from what happens with every reimbursement request. What used to be a prerequisite became a one-time setup, saved after the first access. What belongs to the request itself became short enough to fit in a lunch break. No requirement was removed: they just stopped being charged to people who had already met them.

**In the onboarding, done only on first access: confirming the bank details, the terms of acknowledgment, and identity validation.**

**In the monthly flow: five steps, and none of them repeats what's already been settled.**

![A crop of the new flow's flowchart at the point where it splits: the Completion Screen box closes the identity-validation sequence, and a line coming in from the left goes around that stretch and reaches Request Reimbursement directly, next to Request from the last reimbursement. From there come Choose Treatment, Edit Provider Details and Edit Appointment Details. The edges of the crop cut through the drawing, which continues on both sides.](publico/midias/reembolso-3-novo-fluxo.png)
Legenda: The point where the new flow splits in two. The Completion Screen closes the setup that happens once; whoever has done it comes in from the left and goes straight to Request Reimbursement.


<!-- só no desktop -->
## What the new flow changed

| | Current flow | New flow |
|---|---|---|
| Steps with active typing | ~12 | **5** (+1 one-time onboarding) |
| Screens until submission | 30+ | ~10 |
| Typing CRP, CPF and amount | yes | **no**, OCR |
| Knowing how much is left | no | stepper on every screen |
| When the error shows up | at the end | as you type |
| Shortcut for returning users | no | *Redo last* and *Add one more session* |
| Modals on top of the flow | 3 | **0** |
| Leaving the app midway | yes | no |
| Biometrics | at the end | in onboarding, via Face ID |
| Compliance steps | 5 | **5**, reorganized |

---

## 4. From gray to real
<!-- trilha: Wireframes and interface -->

**A flow on paper is a hypothesis. Designing each screen is how you test it.**

I took the new flow into Figma and built the wireframes. At this stage it mattered to notice the need for the less obvious screens: the error screens, to keep the promise of inline validation with a prescriptive message. I also designed the loading, first-access and history screens.

![Two screens of the redesigned app, overlapping. Behind, the treatment-dates form with an error message right below the filled field: date outside the 12-month window, last valid date 05/04/2025. In front, the tracking of a request with the notice Awaiting document, the text The medical order is missing (as soon as you send it, the review picks up where it stopped) and the button Fix now.](publico/midias/reembolso-4-telas-de-erro.png)
Legenda: Two of the error screens. On the left, validation happens as you type and the message says what the valid date would be; on the right, the pending item says what's missing and promises the review picks up where it stopped.

With the structure in place came the need to see how the real screens would look. And I didn't need to invent a visual identity. Keeping the same visual language, the only variable that changes is the flow, and the comparison starts to mean something.

So I rebuilt, as faithfully as possible, the visual system that already existed. First, I read the public CSS of SulAmérica's website, which exposes the company's design system: 149 color variables, complete ramps and the declared type family. Second, I measured the app's screenshots. I wrote scripts that count pixels: the frequency of each color, cap height to infer the body size, the profile of the corner curve to find the radius, the contrast of each text and background pair.
### The finding that changed my diagnosis

**The app doesn't follow its own company's system.**

I expected to find an app without a system. I found **a system the app doesn't follow**. And those are different problems: the first calls for building, the second calls for governance and migration.


With the system rebuilt, the mockups could look like the real app. So I could truly compare the two flows. By then I had 44 good-looking screens and a well-documented system. I connected everything into a clickable prototype.

![Two screens of the redesigned app, overlapping, already with the colors and type of SulAmérica's visual system. On the left, the bank-account registration in onboarding, with bank, branch and account filled in and the orange button Save and continue. On the right, the request-submitted screen, with a confirmation sign, the protocol number with the copied notice, the list of what happens next and the orange button Track status.](publico/midias/reembolso-4-sistema-remontado.png)
Legenda: Two screens in the rebuilt visual system: the orange, the type and the components came from the public CSS and from measuring the screenshots. On the left, onboarding; on the right, the request confirmation.

## 5. What stayed
<!-- trilha: Results -->

**The result is a redesigned flow. From eighteen steps to five, plus a setup that happens only once. From first access to tracking the request, clickable in a prototype.**

![Recording of the prototype in use, on a device over the page color. A finger taps Request reimbursement on the home screen, picks the category, attaches the receipt, checks the fields the OCR filled in, enters the sessions and dates, attaches the three documents, reviews the request and submits. The last screen shows the request under review, with the protocol number and the expected response date.](publico/midias/reembolso-5-prototipo.mp4)
Legenda: Video of the reimbursement request prototype.
Convite: Find out more by exploring the full prototype. [Open the prototype](https://www.figma.com/proto/LUp4aT7fVYH4cD8ZwrHIfd?node-id=235-844&starting-point-node-id=235%3A844)

<!-- só no desktop -->
## What I delivered

| | |
|---|---|
| Screens designed | **44**, in low and high fidelity |
| Prototype | **43 reachable screens, 145 links, zero dead ends** |
| Design system | 7 documents, 94 color variables, 18 components, 148 icons |
| Measurement | 14 scripts that reproduce every number in the system |
| Documentation | heuristic evaluation, current flow, new flow, microcopy and the decision behind each screen |

## What I expect to happen, stated as a hypothesis



- **Time to submission** should drop from 8 to 14 minutes to 3 to 5 on the recurring path,
  mainly because OCR removes the typing and the shortcut removes the repetition.
- **Drop-off between the dates and attachments steps** should fall, because that's exactly
  where the two heuristics with critical severity are.
- **Back-office rework** should decrease, because CPF, CRP and amount stop being typed.
- **Fewer support calls** about "what is a CRP", "the app won't accept my file" and "how do I
  get the income tax receipt".

## What I would do next

1. **Take the prototype to 5 to 8 people** in recurring treatment, with an end-to-end task.
2. **Validate the OCR and the built-in tutorial** with engineering.
3. **Sit down with compliance and legal** for the plain-language version of the terms.
4. **Set a baseline before any rollout**: time to submission, drop-off per step, rework per
   request.
5. **Settle the orange with the brand team.**
6. **Define governance.** Without someone responsible for the system, five grays become six.

<!-- bloco: provas -->
The diagnosis and the implementation rules
[See the repository](https://github.com/lariquadrinhos/case-reembolso)

The evaluation of the 32 screens, the current flow mapped step by step, and the redesign in wireframe and mockup
[See the file in Figma](https://www.figma.com/design/LUp4aT7fVYH4cD8ZwrHIfd)

The current flow annotated screen by screen, and the new one beside it
[See the board in FigJam](https://www.figma.com/board/lCpgyPMBg7BXj0DxgiOUh1)

The new flow, from first access to tracking
[Open the prototype](https://www.figma.com/proto/LUp4aT7fVYH4cD8ZwrHIfd?node-id=235-844&starting-point-node-id=235%3A844)


---
