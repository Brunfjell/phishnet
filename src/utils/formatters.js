export const formatDate = (date) =>
  new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

export const fullName = (profile) =>
  `${profile.firstName ?? ""} ${profile.lastName ?? ""}`.trim();
