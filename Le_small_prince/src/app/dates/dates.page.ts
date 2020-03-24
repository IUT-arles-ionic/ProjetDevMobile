import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute, NavigationExtras } from '@angular/router';



@Component({
  selector: 'app-dates',
  templateUrl: './dates.page.html',
  styleUrls: ['./dates.page.scss'],
})
export class DatesPage implements OnInit {

  data:any;
  dates:[]
  email:''
  password:''


  constructor(private route: ActivatedRoute, private router: Router) { 
    this.route.queryParams.subscribe(params => {
      console.log('params',params);

        if(this.router.getCurrentNavigation().extras.state)
        {
          this.data=this.router.getCurrentNavigation().extras.state.user;
          console.log(this.data)
        }
      
    })
  }

  ngOnInit() {
    this.email=this.data.email
    this.password=this.data.password
  }

  async rafraichirListe(event){
    this.getData()
    event.target.complete();
  }

  verifappartenance(value)
  {
    if(this.email=='classe'+value || value==0)
    {
      return true
    }
    else
    {
      return false
    }
  }

  getData()
  {
    fetch('http://www.sebastien-thon.fr/cours/M4104Cip/projet/index.php?&login='+this.email+'&mdp='+this.password)
    .then(response => response.json())
    .then(data => {
        this.dates=data.dates
    }) 
    .catch(error => {
      console.log('Serveur non accessible')
    })
  }
  async retour(){
    this.router.navigate(['folder']);
  }


}
