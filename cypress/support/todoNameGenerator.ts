export const todoNameGenerator = (length: number): string => {
    let todoName = '';
    const possible =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < length; i++) {
      todoName += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return todoName;
  };