import { Component } from '@angular/core';
import { Producto } from 'src/app/modelos/producto';
import { StockService } from 'src/app/servicios/stock.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  public listaProductos: Producto[];
  public categorias: Map<any, any>;
  public categoriaSeleccionada: number;
  public precios: Map<any, any>;

  constructor(public stockService: StockService) {
    this.listaProductos = [];
    this.categorias = new Map();
    this.categoriaSeleccionada = 0;
    this.precios = new Map();
  }

  ngOnInit(): void {
    this.stockService.productos().subscribe((productos: any) => {
      productos.forEach((producto: Producto) => {
        this.listaProductos.push(producto);
      });
    });

    this.stockService.precio().subscribe((data: any) => {
      data.forEach((element: { article: any; price: any; }) => {
        this.precios.set(element.article, element.price);
      });
    });
  }

  printCarta() {
    var rep = 0;
    this.listaProductos.forEach(element => {
      if (element.parent == null) {
        this.listaProductos.forEach(elemento =>{
          if(element.number == elemento.parent){
            rep++;
          }
        });
        if (element.description1 && rep>1) {
          this.categorias.set(element.number, element.description1);
        }
        rep=0;
      }
    });
  }

  mostrarCategoria(key: number) {
    this.categoriaSeleccionada = key;
  }

}
