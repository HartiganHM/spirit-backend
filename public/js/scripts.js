const authenticateUser = async () => {
  const email = document.querySelector('.email-input').value;
  const appName = document.querySelector('.appName-input').value;
  const getUser = await fetch('/authenticate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email: email,
      appName: appName
    })
  })

  console.log({ getUser })

  const jwt = await getUser.json();

  console.log({ jwt })

  saveJWTtoLS(jwt)
  return jwt;
}

const saveJWTtoLS = (jwt) => {
  localStorage.setItem('spirit-987', jwt)
}

document.querySelector('button').addEventListener('click', function(event) {
  event.preventDefault();
  authenticateUser();
});