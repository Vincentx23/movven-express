<script>
import{Router, Route, Link, link} from "svelte-routing";
import LoginForm from './components/LoginForm.svelte';
import Dashboard from './Dashboard.svelte';
</script>

<Router>

<div>
	<Route path="/" component={LoginForm}/>
	<Route path="/Dashboard" component={Dashboard}/>
</div>

</Router>

