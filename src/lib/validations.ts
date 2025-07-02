// export function isValidGitHubUsername(username: string): boolean {
//     // GitHub username validation rules:
//     // - May only contain alphanumeric characters or single hyphens
//     // - Cannot begin or end with a hyphen
//     // - Maximum 39 characters
//     const githubUsernameRegex = /^[a-zA-Z0-9]([a-zA-Z0-9-]{0,37}[a-zA-Z0-9])?$/;
//     return githubUsernameRegex.test(username);
//   }

//   export function sanitizeUsername(username: string): string {
//     return username.trim().toLowerCase();
//   }

//   export function validateRepositoryData(repo: any): boolean {
//     return (
//       repo &&
//       typeof repo.id === 'number' &&
//       typeof repo.name === 'string' &&
//       typeof repo.full_name === 'string' &&
//       typeof repo.stargazers_count === 'number' &&
//       typeof repo.forks_count === 'number'
//     );
//   }

//   export function validateUserData(user: any): boolean {
//     return (
//       user &&
//       typeof user.id === 'number' &&
//       typeof user.login === 'string' &&
//       typeof user.avatar_url === 'string' &&
//       typeof user.public_repos === 'number' &&
//       typeof user.followers === 'number' &&
//       typeof user.following === 'number'
//     );
//   }
