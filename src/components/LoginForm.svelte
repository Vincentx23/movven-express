<script>
  import Axios from "axios";

  let user = {
    email: "",
    password: "",
  };

  const login = async (e) => {
    e.preventDefault();
    try {
      const loginRes = await Axios.post(
        "http://localhost:8080/api/auth/login",
        user
      );

      localStorage.setItem("x-access-token", loginRes.data.token);
      window.location.replace('/Dashboard')
    } catch (err) {
        console.log(err.response.data.message)
        err.response.data.message  
    }
  };
</script>

<style>
</style>

<div class="registration-form">
  <form on:submit={login}>
    <div class="form-icon">
      <span><i class="icon icon-user" /></span>
      <!-- <img src="./img/Movven-Logo.png" alt="Movven-Logo"> -->
    </div>
    <div class="form-group">
      <input
        id="email"
        bind:value={user.email}
        type="text"
        class="form-control item"
        placeholder="Nombre de usuario o correo electrónico" />
    </div>
    <div class="form-group">
      <input
        bind:value={user.password}
        type="password"
        class="form-control item"
        id="password"
        placeholder="Contraseña" />
    </div>
    <div class="form-group">
      <button
        type="submit"
        class="btn btn-block create-account">Acceder</button>
    </div>
  </form>
</div>
