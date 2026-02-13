export async function runExplainer(plan) {
  console.log("🧠 Explainer running...");

  const { layout, components } = plan;

  let explanation = "";

  if (layout === "sidebar + main") {
    explanation +=
      "A sidebar layout was selected because dashboards typically require navigation and structured sections. ";
  }

  const componentTypes = components.map((c) => c.type);

  if (componentTypes.includes("Card")) {
    explanation +=
      "Card components were used to display structured content such as analytics or summaries. ";
  }

  if (componentTypes.includes("Modal")) {
    explanation +=
      "A modal component was included to allow overlay-based interaction without leaving the current context. ";
  }

  explanation +=
    "All components were selected from the predefined deterministic component library to maintain visual consistency.";

  return explanation;
}
