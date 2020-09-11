<script>
import BarNav from './components/BarNav.svelte';
// import BarAside from './components/BarAside.svelte';
</script>

<BarNav></BarNav>
<!-- <BarAside></BarAside> -->


<div class="container-fluid">
    <div class="row">
      <nav id="sidebarMenu" class="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse">
        <div class="sidebar-sticky pt-3">
          <ul class="nav flex-column">
            <li class="nav-item">
              <i class="nav-link active" href="#">
                <span data-feather="home"></span>
                Dashboard <span class="sr-only">(current)</span>
              </i>
            </li>
            <li class="nav-item">
       
                <span data-feather="file"></span>
                Orders
    
            </li>
            <li class="nav-item">
       
                <span data-feather="shopping-cart"></span>
                Products
     
            </li>
            <li class="nav-item">
    
                <span data-feather="users"></span>
                Customers
     
            </li>
            <li class="nav-item">

                <span data-feather="bar-chart-2"></span>
                Reports
        
            </li>
            <li class="nav-item">
       
                <span data-feather="layers"></span>
                Integrations
           
            </li>
          </ul>
  
          <h6 class="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
            <span>Saved reports</span>
            <a class="d-flex align-items-center text-muted" href="#" aria-label="Add a new report">
              <span data-feather="plus-circle"></span>
            </a>
          </h6>
          <ul class="nav flex-column mb-2">
            <li class="nav-item">
          
                <span data-feather="file-text"></span>
                Current month
            
            </li>
            <li class="nav-item">
        
                <span data-feather="file-text"></span>
                Last quarter
        
            </li>
            <li class="nav-item">
          
                <span data-feather="file-text"></span>
                Social engagement
          
            </li>
            <li class="nav-item">
              <!-- <a  > -->
                <span data-feather="file-text"></span>
                Year-end sale
              <!-- </a> -->
            </li>
          </ul>
        </div>
      </nav>
  
      <main role="main" class="col-md-9 ml-sm-auto col-lg-10 px-md-4">
        <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
          <h1 class="h2">Dashboard</h1>
          <div class="btn-toolbar mb-2 mb-md-0">
            <div class="btn-group mr-2">
              <button type="button" class="btn btn-sm btn-outline-secondary">Share</button>
              <button type="button" class="btn btn-sm btn-outline-secondary">Export</button>
            </div>
            <button type="button" class="btn btn-sm btn-outline-secondary dropdown-toggle">
              <span data-feather="calendar"></span>
              This week
            </button>
          </div>
        </div>
  
  
  
        <h2>Section title</h2>
        <div class="table-responsive">
          <table class="table table-striped table-sm ">
            <thead class="thead-dark">
              <tr>
                <th>#</th>
                <th>Header</th>
                <th>Header</th>
                <th>Header</th>
                <th>Header</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1,001</td>
                <td>Lorem</td>
                <td>ipsum</td>
                <td>dolor</td>
                <td>sit</td>
              </tr>
              <tr>
                <td>1,002</td>
                <td>amet</td>
                <td>consectetur</td>
                <td>adipiscing</td>
                <td>elit</td>
              </tr>
              <tr>
                <td>1,002</td>
                <td>amet</td>
                <td>consectetur</td>
                <td>adipiscing</td>
                <td>elit</td>
              </tr>           
            </tbody>
          </table>
        </div>
      </main>
    </div>
  </div>

