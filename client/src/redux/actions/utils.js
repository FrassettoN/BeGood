export const getCookie = (name) => {
  let cookieValue = null;
  if (document.cookie && document.cookie !== '') {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      // Does this cookie string begin with the name we want?
      if (cookie.substring(0, name.length + 1) === name + '=') {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
};

export const createConfig = (accessToken) => {
  return {
    headers: {
      'Content-Type': 'application/json',
      'X-CSRFToken': getCookie('csrftoken'),
      Authorization: `Bearer ${accessToken}`,
    },
    withCredentials: true,
  };
};

export const formatError = (error) => {
  let detail = error.response?.data.detail;
  if (detail === 'Given token not valid for any token type') {
    window.location.reload();
    return;
  }
  return detail || error.message;
};

export const validateSearchQuery = (query) => {
  if (!query) return false;
  if (query.includes('/')) return false;
  if (query.includes('.', 0)) return false;
  if (query.includes('..')) return false;
  return true;
};
