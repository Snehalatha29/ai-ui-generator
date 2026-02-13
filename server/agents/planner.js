export async function runPlanner(prompt) {
  if (!prompt) {
    return {
      layout: "simple",
      components: [
        {
          type: "Card",
          props: { title: "Fallback Component" }
        }
      ]
    };
  }

  if (prompt.toLowerCase().includes("dashboard")) {
    return {
      layout: "sidebar + main",
      components: [
        { type: "Sidebar" },
        { type: "Card", props: { title: "Revenue" } },
        { type: "Card", props: { title: "Users" } },
        { type: "Card", props: { title: "Orders" } }
      ]
    };
  }

  if (prompt.toLowerCase().includes("login")) {
    return {
      layout: "centered form",
      components: [
        { type: "Input", props: { label: "Email" } },
        { type: "Input", props: { label: "Password" } },
        { type: "Button", props: { label: "Login" } }
      ]
    };
  }

  return {
    layout: "simple",
    components: [
      {
        type: "Card",
        props: { title: "Default Component" }
      }
    ]
  };
}
