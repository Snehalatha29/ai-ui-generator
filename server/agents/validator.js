export async function runValidator(plan) {
  if (!plan || !plan.components) {
    return {
      layout: "simple",
      components: [
        {
          type: "Card",
          props: { title: "Validated Fallback" }
        }
      ]
    };
  }

  return plan;
}
