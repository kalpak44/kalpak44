**Documentation** is how a system explains itself when the people who built it are
unavailable, busy, or gone.

Good documentation is not a separate deliverable written once at the end of a project. It is
a living part of the system that is updated in the same pull request as the code it
describes, reviewed like code, and deleted when it stops being true.

### The Onboarding Trick: Let Newcomers Fix the Docs

The classic technique here is to tell the newly onboarded person that if anything is lacking
about documentation they should ask and then fix it themselves.

It works because a new joiner is the only person on the team who can still see the gaps. After
a few weeks, everyone else has silently filled in the missing steps from memory: the undocumented
environment variable, the VPN that has to be connected first, the service that must be started
before the tests pass. Those gaps are invisible to the author and painfully obvious to the
newcomer - but only during their first days, before the knowledge becomes tacit.

The two halves of the rule matter equally. **Ask** keeps the newcomer unblocked and gives them
permission to admit confusion instead of quietly losing a day to it. **Fix it themselves** turns
the answer into a durable artifact rather than a one-off message in a chat thread that the next
hire will never find. The person who answered the question should not be the one writing it down;
they already know too much to write it well.

Make the expectation explicit on day one, and make it cheap to act on: the docs live in the repo,
a documentation pull request needs no ticket, and a small fix from someone who joined yesterday
gets reviewed and merged the same way any other change does. Onboarding then becomes a self-repairing
loop - every new hire leaves the documentation slightly better than they found it, and the quality
of the onboarding experience improves on its own instead of decaying.

A useful side effect: the first-week documentation pull request is also the new joiner's first
safe exercise in the team's whole delivery process - branch, review, CI, merge - with no risk of
breaking production.

### Types of Documentation

Different readers need different documents. Mixing them into one page is a common failure.

- **README**: what the project is, how to run it locally, how to run the tests. The entry point.
- **Architecture**: how the pieces fit together - see the [C4 Model](https://pavel-usanli.online/cheat-sheets/c4-model).
- **API Documentation**: contracts for consumers, usually generated from [OpenAPI](https://swagger.io/) or [gRPC](https://grpc.io/) definitions.
- **Runbooks**: what to do when an alert fires at 03:00 - symptoms, checks, remediation, escalation.
- **ADRs (Architecture Decision Records)**: why a decision was made, which alternatives were rejected, and what the consequences are.
- **Onboarding Guide**: the path from laptop to first merged change.

### Architecture Decision Records

An ADR is a short, immutable, numbered file stored next to the code:

```text
docs/adr/0007-use-kafka-for-order-events.md

# 7. Use Kafka for order events
Status: Accepted
Context: ...
Decision: ...
Consequences: ...
```

ADRs are never edited after acceptance. When a decision changes, write a new ADR that supersedes
the old one. The value is the trail of reasoning: future maintainers can see *why* rather than
guessing from the result.

### Keep Documentation Close to the Code

Documentation that lives in a separate wiki drifts, because nothing forces it to change when the
code does.

- Store docs in the repository, in Markdown, versioned with the code.
- Review doc changes in the same pull request as the behaviour change.
- Generate what can be generated: API references, diagrams-as-code ([Mermaid](https://mermaid.js.org/), [PlantUML](https://plantuml.com/), [Structurizr](https://structurizr.com/)), configuration tables.
- Add doc updates to the [Definition of Done](https://pavel-usanli.online/cheat-sheets/dor-dod) so they are not optional.

### Signs Documentation Is Failing

- The same question is asked in the team chat more than twice.
- Onboarding takes weeks and depends on one specific person being available.
- Setup instructions have undocumented prerequisites.
- Pages are long, generic, and visibly stale - no one trusts them, so no one reads them.
- Incidents last longer because the runbook does not match the current system.

### Common Pitfalls

- **Writing too much.** Documentation that is expensive to maintain is maintained badly. Prefer a short, correct page over a long, outdated one.
- **Documenting what the code already says.** Describe intent and constraints, not line-by-line behaviour.
- **One giant page.** Split by audience and purpose.
- **No owner.** Every document needs a team responsible for its accuracy.
- **Treating docs as a phase.** Documentation is continuous work, the same as [testing](https://pavel-usanli.online/cheat-sheets/maintainability).

### Quick Summary

Good documentation is:

- close to the code and versioned with it
- written for a specific reader and purpose
- short enough to stay correct
- owned by a team, not by an individual
- improved by the newest person on the team, every time they join
