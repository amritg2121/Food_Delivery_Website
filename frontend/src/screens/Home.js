import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Card from '../components/card'
import Footer from '../components/Footer'

const API_URL = process.env.REACT_APP_API_URL;


export default function Home() {
  const [search, setSearch] = useState('')
  const [foodCat, setFoodCat] = useState([])
  const [foodItem, setFoodItem] = useState([])

  const loadData = async () => {
  let response = await fetch(`${API_URL}/api/foodData`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      }
    });

    response = await response.json();

    setFoodItem(response[0]);
    setFoodCat(response[1]);
  }

  useEffect(() => {
    loadData()
  }, [])


  return (
    <div>
  <div><Navbar /></div>
      <div> <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel"  data-bs-interval="2000" style={{ objectFit: "contain !important" }}>
        <div className="carousel-inner">
          <div className=" carousel-caption" style={{ zIndex: "10" }}>
            <div className="d-flex justify-content-center">
              <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={search} onChange={(e) => { setSearch(e.target.value) }} />
              {/* <button className="btn btn-outline-success text-white bg-success" type="submit">Search</button> */}
            </div>
          </div>
          <div className="carousel-item active" data-bs-interval="2000">
            <img src="/burger.jpg" className="d-block w-100 " style={{ filter: "brightness(30%)", height: '76vh' }} alt="No image" />
          </div>
          <div className="carousel-item" data-bs-interval="2000">
            <img src="/pizza.jpg" className="d-block w-100 " style={{ filter: "brightness(30%)", height: '76vh' }} alt="No image" />
          </div>
          <div className="carousel-item" data-bs-interval="2000">
            <img src="/pasta.jpg" className="d-block w-100 " style={{ filter: "brightness(30%)", height: '76vh' }} alt="No image" />
          </div>
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
      </div>

      <div className='container'>
        {
          foodCat.length > 0
            ? foodCat.map((data) => {
              return (
                // justify-content-center
                <div className='row mb-3'>
                  <div key={data.id} className='fs-3 m-3'>
                    {data.CategoryName}
                  </div>
                  <hr id="hr-success" style={{ height: "4px", backgroundImage: "-webkit-linear-gradient(left,rgb(0, 255, 137),rgb(0, 0, 0))" }} />
                  {foodItem != [] ? foodItem.filter(
                    (items) => (items.CategoryName === data.CategoryName) && (items.name.toLowerCase().includes(search.toLowerCase())))
                    .map(filterItem => {
                      return (
                        <div key={filterItem.id} className='col-12 col-md-6 col-lg-3'>
                          {console.log(filterItem.url)}
                          <Card foodName={filterItem.name} item={filterItem} options={filterItem.options[0]} ImgSrc={filterItem.img} ></Card>
                        </div>
                      )
                    }) : <div> No Such Data </div>}
                </div>
              )

            })
            : ""
        }
      </div>

      <div><Footer /></div>
    </div>
  )
}
