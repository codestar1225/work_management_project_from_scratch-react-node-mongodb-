import React from 'react';
import OwlCarousel from 'react-owl-carousel';
import $ from 'jquery';

class Team extends React.Component {

    showTeamDetails(i)
    {
        $('.team-box').hide(1000);
        $('.team-hover-'+i).show(1000);
        $('.team-hover-'+i).fadeIn("slow");
    }
    closeTeamDetails()
    {
        $(".team-hover").hide(1000);
        $('.team-box').show(1000);
        $('.team-box').fadeIn("slow");
    }

  render() {
    // OwlCarousel Option for Team Members
		const options = {
	     0:{
            items:1,
            margin:5,
        },
        600:{
            items:1,
            margin:5,
        },
        768:{
            items:2,
        },
        992:{
            items:3,
        },
        1000:{
            items:3,
        }
		};

    // Dynamic Team Members Easy to Update
    let data = [
        {name: 'mark jkcno', designation:'designer', photo:'1.jpg', facebook:'#', google:'#', twitter:'#', instagram:'#', rss:'#'},
        {name: 'john doe', designation:'devloper', photo:'4.jpg', facebook:'#', google:'#', twitter:'#', instagram:'#', rss:'#'},
        {name: 'johanson let', designation:'ux designer', photo:'3.jpg', facebook:'#', google:'#', twitter:'#', instagram:'#', rss:'#'},
        {name: 'Walo Boni', designation:'app devloper', photo:'2.jpg', facebook:'#', google:'#', twitter:'#', instagram:'#', rss:'#'},
        {name: 'John Shipmen', designation:'app designer', photo:'4.jpg', facebook:'#', google:'#', twitter:'#', instagram:'#', rss:'#'},
        {name: 'Robert Tomkins', designation:'ceo', photo:'3.jpg', facebook:'#', google:'#', twitter:'#', instagram:'#', rss:'#'},
        ];

    // Dynamic Team Members Data Loop
    let DataList = data.map((val, i) => {
        return (
            <div className="item" key={i}>
                <div className={`team-box`}>
                    <div className="team-under-box">
                        <div className="team-under-box-button text-white" onClick={() => this.showTeamDetails(i)}>
                            <i className="fa fa-plus" aria-hidden="true"></i>
                        </div>
                        <img src={`assets/images/${val.photo}`} alt="1" className="img-fluid"/>
                        <div className="team-overlay">
                            <div className="social-icon">
                                <ul >
                                  <li><a href={val.facebook} dangerouslySetInnerHTML={{ __html: '<i class="fa fa-facebook" aria-hidden="true"></i>' }}></a></li>
                                  <li><a href={val.google} dangerouslySetInnerHTML={{ __html: '<i class="fa fa-google-plus" aria-hidden="true"></i>' }}></a></li>
                                  <li><a href={val.twitter}  dangerouslySetInnerHTML={{ __html: '<i class="fa fa-twitter" aria-hidden="true"></i>' }}></a></li>
                                  <li><a href={val.instagram}  dangerouslySetInnerHTML={{ __html: '<i class="fa fa-instagram" aria-hidden="true"></i>' }}></a></li>
                                  <li><a href={val.rss}  dangerouslySetInnerHTML={{ __html: '<i class="fa fa-rss" aria-hidden="true"></i>' }}></a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    });
		
  	return (
        <section className="team-bg" id="team">
            <div className="animation-circle-inverse">
                <i></i>
                <i></i>
                <i></i>
            </div>
            <div className="container">
                <div className="row">
                    <div className="col-md-12 text-center">
                        <div className="section-title">
                            <h2>Our Work Place</h2>
                            <img src="assets/images/title-line.png" alt="title-line" className="img-fluid"/>
                        </div>
                    </div>
                    <div className="col-md-12">
                           <OwlCarousel
                                className="team-slider-rtl owl-carousel owl-theme"
                                loop={true}
                                margin={30}
                                nav={false}
                                dots={false}
                                responsive={options}
                            >
                              {DataList}
                           </OwlCarousel>

                        {data.map((value, index) =>    
                            <div className="col-md-12" key={index}>
                                <div className={`team-hover team-hover-${index}`}>
                                    <div className="row">
                                        <div className="col-md-4">
                                            <div  className="team-profile">
                                                <img src={`assets/images/${value.photo}`} alt="1" className="img-fluid"/>
                                            </div>
                                        </div>
                                        <div className="col-md-8">
                                            <div className="d-flex-1">
                                                <div className="hover-text">
                                                    <div className="team-close-btn" onClick={this.closeTeamDetails}>
                                                        <a dangerouslySetInnerHTML={{ __html: '<i class="fa fa-times" aria-hidden="true"></i>' }}></a>
                                                    </div>
                                                    <h3>{value.name}</h3>
                                                    <h4 className="m-0 text-muted">{value.designation}</h4>
                                                    <h5>PHP, Laravel, Cake , Wordpress, HTML5 </h5>
                                                    <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text,</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
  	);
  }
}


export default Team;