
  $(function(){

    $("#head1").on("click", function(){
        location.reload();
    });

  });


  

  $(document).ready(function(){


    
  //   function appendEmployeeToTable(employee){
  //     let row =   `<tr>
                 
                 
  //                  <td>${employee.name}</td>
  //                 <td>${employee.gender}</td>
  //                 <td>${employee.department}</td>
  //                 <td>${employee.salary}</td>
  //                 <td>${employee.startday}</td>
                  
  //                 <td>
  //                 <button class="editBtn" data-id="${employee.id}">Edit</button>
  //                 <button class ="deleteBtn" data-id="${employee.id}">Delete</button>
  //                 </tr>`;
  //     $('#employeeTable tbody').append(row);
  // }

  // function resetForm(){
  //     $("#employeeForm")[0].reset();
  //     $('input[name="profile_img"]:checked').prop('checked',false);
  //     $('input[name="gender"]:checked').prop('checked',false);
  //     $('input[name="department"]:checked').prop('checked',false);

  // }



// $('#search').click(function(){
//   $("#search").addClass('active').focus();
// });

// $('#search').blur(function(){
//   $(this).removeClass('active');
// });


 $("#search").on("click", function() {
        $(this).css("width", "200px");
        $(this).addClass('active').focus();
    }).on("blur", function() {
        $(this).removeClass('active');
    });


  function loadEmployee(){
      $.ajax({
          url: 'http://localhost:3000/employees',
          method: 'GET',
          success: function(employees){
              $('#employeeTable tbody').empty();
              employees.forEach(function(employee) {
              let row =   `<tr>
                  <td>
                  <img src=" ${employee.profile_img}">
                  </td>
                  <td>${employee.name}</td>
                  <td>${employee.gender}</td>
                  <td>${employee.department}</td>
                  <td>${employee.salary}</td>
                  <td>${employee.startday}</td>
                  
                  <td>
                  <img  class="delbtn" data-id="${employee.id}"  src="Assets/delete-black-18dp.svg" alt="John Doe"  tittle="Delete"  style="width: 20px; height: 20px; margin-right: 5px; cursor:pointer;">
         <img src="Assets/create-black-18dp.svg" class="editbtn" data-id="${employee.id}"alt="John Doe" style="width: 20px; height: 20px;  cursor:pointer; margin-right: 5px;">
        
                 
                  </tr>`;
              $('#employeeTable tbody').append(row);

              });
          },
          error: function(error){
              console.log('Error:' ,error);
          }
      });
  }

  loadEmployee();

//employee table refresh function

$("#bodytoptext").css("cursor", "pointer").click(function(){
  loadEmployee();
})


function displayEmplloyees(employees){
  $('#employeeTable tbody').empty();

  employees.forEach(function(employee){
       let row = `<tr>
      
       <td><img src="${employee.profile_img}" alt ="profile img"   </td>
       <td>${employee.name}</td>
       <td>${employee.gender}</td>
       <td>${employee.department.join(', ')}</td>
       <td>${employee.salary}</td>
       <td>${employee.startday}</td>
       
       <td>
       <img src ="./Assets/delete-black-18dp.svg" class ="" data-id="${employee.id}" alt ="Edit" title="Edit" , style ="cursor :pointer ;width:20px ;height;20px;">
       
       <img src ="./Assets/create-black-18dp.svg" class ="" data-id="${employee.id}" alt ="Edit" title="Edit" , style ="cursor :pointer ;width:20px ;height;20px;">
       </td>

       </tr>`;
       $('#employeeTable tbody').append(row);
  });
}


//Filter employee base on name and gender 

$("#inputsearch").on('input', function(){
  let query = $(this).val().toLowerCase();

  $.ajax({
    url: 'http://localhost:3000/employees',
    method: 'GET',
    success: function(employees){
      let fiterEmployees = employees.filter(function(employee){
        return employee.name.toLowerCase().includes(query) || employee.gender.toLowerCase().includes(query) ;
      }); 
            displayEmplloyees(fiterEmployees)
      },
      error : function(error ){
        console.log(error);
    }
  });
})



  //Delete the row by delet icon

  $(document).on('click','.delbtn',function(){
    let id=$(this).data('id');

    $.ajax({
      url: `http://localhost:3000/employees/${id}`,
      method: 'DELETE',
      success: function(){
          console.log('Employee deleted successfully');
          loadEmployee();
      },
      error: function(error){
          console.log('Error:' ,error);
      }
    })
  })


  $(document).on('click','.editbtn',function(){
    let id=$(this).data('id');
    window.location.href=`./template/userForm.html?id=${id}`;

  });

  })

