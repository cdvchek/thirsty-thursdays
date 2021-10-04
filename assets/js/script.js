// page handling - carsdan dvorachek
function pageDisplay(page){
    let pageDisplay = document.querySelectorAll('.page-'+page);
    let other = Math.abs(page-2)+1;
    let pageHide = document.querySelectorAll('.page-'+other);
    for (let i = 0; i < pageDisplay.length; i++) {
        pageDisplay[i].setAttribute('style','display:inline;');
    }
    for (let i = 0; i < pageHide.length; i++) {
        pageHide[i].setAttribute('style','display:none;');
    }
}
//page handling finished - carsdan dvorachek

//modal initialization - carsdan dvorachek
document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.modal');
    var instances = M.Modal.init(elems);
  });

/* See Recipe Modal Trigger Button
<a class="waves-effect waves-light btn modal-trigger" href="#modal1">See Recipe</a>
*/

//modal initialization finished - carsdan dvorachek