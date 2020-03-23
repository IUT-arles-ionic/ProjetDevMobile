import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';



@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.page.html',
  styleUrls: ['./connexion.page.scss'],
})


export class ConnexionPage implements OnInit {
  public folder: string;
  public email: string;
  public password: string;
  public array: string [];
  public arraytemp : string;
  public verifconnection: boolean;

  constructor(private activatedRoute: ActivatedRoute, private http: HttpClient) { }

  ngOnInit() {
  }

  connexion()
  {
    fetch('http://www.sebastien-thon.fr/cours/M4104Cip/projet/index.php?connexion&login='+this.email+'&mdp='+this.password)
    .then(response => response.json())
    .then(data => { if(data.resultat=='OK')
      {

      }
      else
      {
       alert('Ben juste nique ta maman')
      }
    }) 
    .catch(error => {
      return false
    })


  } 
}
