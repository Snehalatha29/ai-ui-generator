export async function runGenerator(plan) {
  const { layout, components } = plan;

  if (layout === "sidebar + main") {
    let cards = components
      .filter(c => c.type === "Card")
      .map(
        c =>
          `<div style="padding:20px; background:#eee; border-radius:8px;">
            ${c.props.title}
           </div>`
      )
      .join("");

    return `
      <div style="display:flex; min-height:200px;">
        <div style="width:200px; background:#333; color:white; padding:20px;">
          Sidebar
        </div>
        <div style="flex:1; padding:20px;">
          <h2>Dashboard</h2>
          <div style="display:flex; gap:20px;">
            ${cards}
          </div>
        </div>
      </div>
    `;
  }

  if (layout === "centered form") {
    return `
      <div style="display:flex; justify-content:center; padding:40px;">
        <div style="padding:20px; border:1px solid #ccc; width:300px;">
          <h3>Login</h3>
          <input placeholder="Email" style="width:100%; margin-bottom:10px;" />
          <input type="password" placeholder="Password" style="width:100%; margin-bottom:10px;" />
          <button style="width:100%;">Login</button>
        </div>
      </div>
    `;
  }

  return `
    <div style="padding:20px;">
      <div style="padding:20px; background:#eee;">
        ${components[0]?.props?.title || "Fallback Component"}
      </div>
    </div>
  `;
}
