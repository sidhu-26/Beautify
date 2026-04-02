export function analyzeJSON(data) {
  const insights = [];

  function traverse(obj, path = "$", depth = 0) {
    if (depth > 5) {
      if (!insights.includes(`Deep nesting detected at \`${path}\` (depth > 5)`)) {
        insights.push(`Deep nesting detected at \`${path}\` (depth > 5)`);
      }
    }

    if (obj === null) {
      insights.push(`\`${path}\` is null`);
      return;
    }

    if (Array.isArray(obj)) {
      if (obj.length === 0) {
        insights.push(`\`${path}\` is an empty array`);
      } else {
        obj.forEach((item, index) => {
          traverse(item, `${path}[${index}]`, depth + 1);
        });
      }
      return;
    }

    if (typeof obj === "object") {
      const keys = Object.keys(obj);
      if (keys.length === 0) {
        insights.push(`\`${path}\` is an empty object`);
      } else {
        keys.forEach((key) => {
          traverse(obj[key], `${path}.${key}`, depth + 1);
        });
      }
      return;
    }
    
    // For primitives, check empty strings optionally
    if (typeof obj === "string" && obj.trim() === "") {
      insights.push(`\`${path}\` is an empty string`);
    }
  }

  traverse(data);
  return insights;
}
