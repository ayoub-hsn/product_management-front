function updateUserTable() {
    $('#user-table').css("pointer-events", "none");
    $('#user-table').fadeTo('slow', 0.5);
    $.ajax({
        type: 'get',
        url: '/users',
        success: function(response) {
            $('#user-table').html('');
            $('#user-table').html(response.html);
            $('#table-1').DataTable();
            $('#user-table').css("pointer-events", "auto");
            $('#user-table').fadeTo('slow', 1);
        },
        error: function(error) {
            console.error(error);
        }
    });
}




function showsuccesstoast(title, message) {
    iziToast.success({
        title: title,
        message: message,
        position: 'topRight'
    });
}

function deleteUser(id) {
    swal({
            title: "Êtes-vous sûr?",
            text: "Une fois supprimée, vous ne pourrez plus récupérer cet user",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
        .then((willDelete) => {
            if (willDelete) {
                $('#User-table').css("pointer-events", "none");
                $('#User-table').fadeTo('slow', 0.5);
                $.ajax({
                    type: 'get',
                    url: '/users/delete/' + id,
                    data: {
                        '_token': $('#csrf-token')[0].content,
                    },
                    success: function(data) {
                        updateUserTable();
                        showsuccesstoast("Succès", "L'user a été supprimée");
                    },
                    error: function(error) {
                        console.error(error);
                    }
                });

            } else {
                swal("L'user n'est pas supprimée ");
            }
        });
}


$(document).ready(function(){

    var current_fs, next_fs, previous_fs; //fieldsets
    var opacity;
    var current = 1;
    var steps = $("fieldset").length;
    
    setProgressBar(current);
    
    $(".next").click(function(){
    
    current_fs = $(this).parent();
    next_fs = $(this).parent().next();
    
    //Add Class Active
    $("#progressbar li").eq($("fieldset").index(next_fs)).addClass("active");
    
    //show the next fieldset
    next_fs.show();
    //hide the current fieldset with style
    current_fs.animate({opacity: 0}, {
    step: function(now) {
    // for making fielset appear animation
    opacity = 1 - now;
    
    current_fs.css({
    'display': 'none',
    'position': 'relative'
    });
    next_fs.css({'opacity': opacity});
    },
    duration: 500
    });
    setProgressBar(++current);
    });
    
    $(".previous").click(function(){
    
    current_fs = $(this).parent();
    previous_fs = $(this).parent().prev();
    
    //Remove class active
    $("#progressbar li").eq($("fieldset").index(current_fs)).removeClass("active");
    
    //show the previous fieldset
    previous_fs.show();
    
    //hide the current fieldset with style
    current_fs.animate({opacity: 0}, {
    step: function(now) {
    // for making fielset appear animation
    opacity = 1 - now;
    
    current_fs.css({
    'display': 'none',
    'position': 'relative'
    });
    previous_fs.css({'opacity': opacity});
    },
    duration: 500
    });
    setProgressBar(--current);
    });
    
    function setProgressBar(curStep){
    var percent = parseFloat(100 / steps) * curStep;
    percent = percent.toFixed();
    $(".progress-bar")
    .css("width",percent+"%")
    }
    
    $(".submit").click(function(){
    return false;
    })
    
    });



    /******************************* partner **************************** */

    function updatePartnerTable() {
      $('#user-table').css("pointer-events", "none");
      $('#user-table').fadeTo('slow', 0.5);
      $.ajax({
          type: 'get',
          url: '/partners',
          success: function(response) {
              $('#user-table').html('');
              $('#user-table').html(response.html);
              $('#table-1').DataTable();
              $('#user-table').css("pointer-events", "auto");
              $('#user-table').fadeTo('slow', 1);
          },
          error: function(error) {
              console.error(error);
          }
      });
    }

    function changePartnerStatus(id) {
        $('#user-table').css("pointer-events", "none");
        $('#user-table').fadeTo('slow', 0.5);
       
        $.ajax({
            type: 'GET',
            url: '/updatePartnerStatus/'+id, 
            success: function(response) {
                console.log(response);
                showsuccesstoast("Succès", "Votre partenaire a été mise à jour");
                $('#user-table').css("pointer-events", "auto");
                $('#user-table').fadeTo('slow', 1);
    
            },
            error: function(error) {
                console.error(error);
            }
        });
    }

    function deletePartner(id) {
      swal({
              title: "Êtes-vous sûr?",
              text: "Une fois supprimée, vous ne pourrez plus récupérer ce partenaire",
              icon: "warning",
              buttons: true,
              dangerMode: true,
          })
          .then((willDelete) => {
              if (willDelete) {
                  $('#User-table').css("pointer-events", "none");
                  $('#User-table').fadeTo('slow', 0.5);
                  $.ajax({
                      type: 'get',
                      url: '/users/delete/' + id,
                      data: {
                          '_token': $('#csrf-token')[0].content,
                      },
                      success: function(data) {
                          updatePartnerTable();
                          showsuccesstoast("Succès", "Le partenaire a été supprimé");
                      },
                      error: function(error) {
                          console.error(error);
                      }
                  });
  
              } else {
                  swal("Le partenaire n'est pas supprimé");
              }
          });
    }
    
     /******************************* partner **************************** */

     function updateStudyOnlinesTable() {
      $('#user-table').css("pointer-events", "none");
      $('#user-table').fadeTo('slow', 0.5);
      $.ajax({
          type: 'get',
          url: '/studyOnlines',
          success: function(response) {
              $('#user-table').html('');
              $('#user-table').html(response.html);
              $('#table-1').DataTable();
              $('#user-table').css("pointer-events", "auto");
              $('#user-table').fadeTo('slow', 1);
          },
          error: function(error) {
              console.error(error);
          }
      });
    }

    function deletestudyOnline(id) {
      swal({
              title: "Êtes-vous sûr?",
              text: "Une fois supprimée, vous ne pourrez plus récupérer cette demmande",
              icon: "warning",
              buttons: true,
              dangerMode: true,
          })
          .then((willDelete) => {
              if (willDelete) {
                  $('#User-table').css("pointer-events", "none");
                  $('#User-table').fadeTo('slow', 0.5);
                  $.ajax({
                      type: 'get',
                      url: '/studyOnlines/delete/' + id,
                      data: {
                          '_token': $('#csrf-token')[0].content,
                      },
                      success: function(data) {
                          updateStudyOnlinesTable();
                          showsuccesstoast("Succès", "La demmande a été supprimée");
                      },
                      error: function(error) {
                          console.error(error);
                      }
                  });
  
              } else {
                  swal("La demmande n'est pas supprimée ");
              }
          });
    }

    //  ************************* studyonlines********************************





    //  ************************* studyonlines********************************


    //  *************************** inscrire **********************************

    function f11() {
        $("#field-2").hide();
        $("#field-1").show();
      }

      function f10() {
        $("#field-3").hide();
        $("#field-2").show();
      }
      function f9() {
        $("#field-4").hide();
        $("#field-3").show();
      }

      function f8() {
        $("#field-5").hide();
        $("#field-4").show();
      }
      
      function f7() {
        $("#field-6").hide();
        $("#field-5").show();
      }
      
      function f1() {
        if(document.getElementById('purchasePrice').value==""){
          showWarningtoast('Attention', 'le champe Prix d\'achats est obligatoire')
        }

        else if(document.getElementById('yearOfAcquisition').value==""){
          showWarningtoast('Attention', 'le champe Année d\'acquisition est obligatoire')
        }
        else if(document.getElementById('numberOfPieces').value==""){
          showWarningtoast('Attention', 'le champe Nombre de piéces est obligatoire')
        }
        else if(document.getElementById('propretyWithCredit').value==""){
          showWarningtoast('Attention', 'le champe Vous reste-t-il un crédit immobilier sur ce bien est obligatoire')
        }
        else if(document.getElementById('cashRequirement').value==""){
          showWarningtoast('Attention', 'le champe Besoin de trésorerie est obligatoire')
        }
        
        else if(document.getElementById('approximateValue').value==""){
          showWarningtoast('Attention', 'le champe Valeur de votre bien approximatif est obligatoire')
        }

          else{

              $("#field-1").hide();
              $("#field-2").show();
              console.log("Calling show");
              return true;
          }

      }
    
      function f2() {
        console.log("hhh");
        console.log(document.getElementsByName('landlordtenant').value);

        if (document.getElementById('locataire').checked) {
          rate_value = document.getElementById('locataire').value;
          console.log("test");
          console.log(rate_value);
          showWarningtoast('Attention', 'Si vous étes locataire vous pouvez pas continuer')
        }
       
        else if(document.getElementById('surface').value==""){
          showWarningtoast('Attention', 'le champe surface du bien est obligatoire')
        }else{

              $("#field-2").hide();
              $("#field-3").show();
              console.log("Calling show");
              return true;
          }
      }
    
      function f3() {

        if(document.getElementById('realisticEstimateOfRentalProperty').value==""){
          showWarningtoast('Attention', 'le champe estimation réaliste de votre bien à la location est obligatoire')
        }
        else if(document.getElementById('durationOfDesiredRepurchase').value==""){
          showWarningtoast('Attention', 'le champe durée du réméré souhaité (maximum 60 mois ) est obligatoire')
        }
        else if(document.getElementById('planToGetOutOfRepurchase').value==""){
          showWarningtoast('Attention', 'le champe Comment vous envisager de sortir du réméré  est obligatoire')
        }
        else if(document.getElementById('address').value==""){
          showWarningtoast('Attention', 'le champe Adresse est obligatoire')
        }
        else if(document.getElementById('postalCode').value==""){
          showWarningtoast('Attention', 'le champe Code postale est obligatoire')
        }
        
        else if(document.getElementById('city').value==""){
          showWarningtoast('Attention', 'le champe Ville est obligatoire')
        }
        else{

              $("#field-3").hide();
              $("#field-4").show();
              console.log("Calling show");
              return true;
          }
        
      }
      function f4() {

      

         

              $("#field-4").hide();
              $("#field-5").show();
              console.log("Calling show");
              return true;
          
      }
      function f5() {
        $("#field-5").hide();
        $("#field-6").show();
        console.log("Calling show");
        return true;
      }
      function f6() {
        $("#field-6").hide();
        $("#field-7").show();
        console.log("Calling show");
        return true;
      }
    
      
      
      
        
        window.onload = function() {
      
          // If sessionStorage is storing default values (ex. name), exit the function and do not restore data
          if (sessionStorage.getItem('name') == "name") {
            return;
          }
      
          // If values are not blank, restore them to the fields
          var name = sessionStorage.getItem('name');
          if (name !== null) $('#inputName').val(name);
      
          var city = sessionStorage.getItem('city');
          if (city !== null) $('#inputCity').val(city);
      
          var student = sessionStorage.getItem('student');
          if (student !== null) $('#inputStudent').val(student);
        }
      
        // Before refreshing the page, save the form data to sessionStorage
        window.onbeforeunload = function() {
          sessionStorage.setItem("name", $('#inputName').val());
          sessionStorage.setItem("email", $('#inputCity').val());
          sessionStorage.setItem("student", $('#inputStudent').val());
        }


        $('#formInscrire').on('submit', function(e) {

            console.log("1");
            e.preventDefault();
            $('#addVideo').css("pointer-events", "none");
            $('#addVideo').fadeTo('slow', .5);
            $.ajaxSetup({
                headers: {
                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                }
            });
            var formData = new FormData(this);
            formData.append("_token", $('meta[name="csrf-token"]').attr('content'));
            formData.append('familyRecordBook', $('.familyRecordBook').prop('files')[0]);
            formData.append('fullTitleDeedPrperty', $('.fullTitleDeedPrperty').prop('files')[0]);
            formData.append('latestPropertyTax', $('.latestPropertyTax').prop('files')[0]);
            formData.append('lastResidenceTax', $('.lastResidenceTax').prop('files')[0]);
            formData.append('lastImposition', $('.lastImposition').prop('files')[0]);
            formData.append('lastImposition', $('.lastImposition').prop('files')[0]);
            $.ajax({
                type: 'POST',
                url: '/login',
                processData: false,
                contentType: false,
                data: formData,
                success: function(response) {
                    console.log(response);
                    showsuccesstoast("Succès", "Votre vidéo a été ajoutée");
                    loadVideos();
                    $('#addVideo').css("pointer-events", "auto");
                    $('#addVideo').fadeTo('slow', 1);
                    hideAddVideo();
                },
                error: function(error) {
                    console.error(error);
                }
            });
        });


function showWarningtoast(title, message) {
  iziToast.warning({
      title: title,
      message: message,
      position: 'topRight'
  });
}