export function isAdmin(user) {
  return (
    user &&
    user.emailAddresses &&
    user.emailAddresses[0]?.emailAddress === process.env.ADMIN_EMAIL
  );
} 