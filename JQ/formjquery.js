// $(document).ready(function(){
//     $("#sbtn").click(function(){
//         $(this).css("backgroundColor" , "red") ;
//     })
// })

console.log("kky");

$(document).ready(function(){

    
    const urlParams = new URLSearchParams(window.location.search);
    const employeeId = urlParams.get('id');
    

    if(employeeId){
        $.ajax({
            url :`http://localhost:3000/employees/${employeeId}`,
            type : 'GET',
            success : function(employee){
               $('#name').val(employee.name);
               $(`input[name="profile_img"][valu="${employee.profile_img}"]`).prop('checked',true);
               $(`input[name="gender"][value="${employee.gender}"]`).prop('checked',true);
               $('#salary').val(employee.salary);
               $('#startday').val(employee.startday);
               $('#month').val(employee.month);
               $('#year').val(employee.year);
               $('#notes').val(employee.notes);

               employee.department.forEach(function(dept){
                $(`input[name="department"][value="${dept}"]`).prop('checked',true);
               });
            },
            error:function(error){
                console.log(error);
            }
        });
    }


    $("#sbtn").click(function(){
 
        let employee={
            name:$("#name").val(),
            profile_img :$('input[name="profile_img"]:checked').val(),
            gender :$('input[name="gender"]:checked').val(),
            department:[],
            //salary:$("#salary").val(),
            salary :"₹ " +$("select[name='salary']").val(),

            
            startday:$("#startdate").val()+" " +$("#month").val() + " "+$("#year").val(),
            notes:$("#notes").val()
        };
        // console.log($('input[name="department"]:checked')) 
        console.log("salary",""+$("select[name='salary").val())
        $('input[name="department"]:checked').each(function(){
            console.log($(this).val());  // get selected value

            employee.department.push($(this).val());
        });

       let method = employeeId ? 'PUT' :'POST';
       let url = employeeId ? `http://localhost:3000/employees/${employeeId}` : 'http://localhost:3000/employees';

        $.ajax({
            url :url,
           method  : method,
            data : JSON.stringify(employee),
            contentType : 'application/json',
            success : function(response){
                console.log(response);
               // appendEmployeeToTable(response);
               // resetForm();
                 window.location.href = '../index.html';
            },
            error:function(error){
                console.log(error);
            }
        });
    });



    // edit Load data on form page

    // const urlParams = new URLSearchParams(window.location.search);
    // const employeeId = urlParams.get('id');
    

    // if(employeeId){
    //     $.ajax({
    //         url :`http://localhost:3000/employees/${employeeId}`,
    //         type : 'GET',
    //         success : function(employee){
    //            $('#name').val(employee.name);
    //            $(`input[name="profile_img"][valu="${employee.profile_img}"]`).prop('checked',true);
    //            $(`input[name="gender"][value="${employee.gender}"]`).prop('checked',true);
    //            $('#salary').val(employee.salary);
    //            $('#startday').val(employee.startday);
    //            $('#notes').val(employee.notes);

    //            employee.department.forEach(function(dept){
    //             $(`input[name="department"][value="${dept}"]`).prop('checked',true);
    //            });
    //         },
    //         error:function(error){
    //             console.log(error);
    //         }
    //     });
    // }



    // $("#sbtn").click(function(){
    //     event.preventDefault();
    //     let employee= {
    //         id:employeeId,
    //         name :$('#name').val(),
    //         profile_img :$('input[name="profile_img"]:checked').val(),
    //         gender :$('input[name="gender"]:checked').val(),
    //         department:[],
    //         salary:$('#salary').val(),
    //         startday:$('#startday').val(),
    //         notes:$('#notes').val()
    //     };

    //     $('input[name="department"]:checked').each(function(){
    //         employee.department.push($(this).val());
    //     });

    //     let requestMethod = 'POST';
    //     let requestUrl = 'https://localhost:3000/employees';

    //     console.log("id is ",employeeId)
    //     if(employeeId){

    //         requestMethod = 'PUT';
    //         requestUrl = `https://localhost:3000/employees/${employeeId}`;
    //     }

    //     $.ajax({
    //         url : requestUrl,
    //         type : requestMethod,
    //         data : JSON.stringify(employee),
    //         contentType : 'application/json',
    //         success : function(response){
    //             console.log('response');
    //             window.location.href = '../index.html';
    //         },
    //         error:function(error){
    //             console.log(error);
    //         }
    //     });
    
    // });



    $("#cancelbtn").click(function(){
        window.location.href = '../index.html';
    })


});


