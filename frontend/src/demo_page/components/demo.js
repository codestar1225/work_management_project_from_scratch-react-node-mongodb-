import React from 'react';


class Demo extends React.Component {
  render() {
  		
    return (
		<section className="fadinup" id="home-demo">
			<div className="container-fluid m-width">
				<div className="row">
					<div className="col-md-12 text-center">
						<div className="section-title mb-2">
							<h2>View Landing Page</h2>
							<img src="assets/images/title-line.png" alt="title-line" className="img-fluid" />
						</div>
					</div>
					<div className="col-lg-6 offset-lg-3 col-md-10 offset-md-1">
						<p className="demo-description">Clean and clear designs makes websites differ from others. We've pre-build demo for giving you as much as flexibility in making your site unique.</p>
					</div>
				</div>
				<div className="row mt-35 landing-screen-animation">
					<div className="col-xl-12 col-lg-12 col-12 text-center">
						<div>
							<a href={`${process.env.PUBLIC_URL}/home`} target="_blank">
                        <span className="pc-bg">
                          <span style={{backgroundImage: 'url(assets/images/demo/ltr.jpg)' }} className="img-scroll"></span>
                      </span>
							</a>
						</div>
						<h2 className="demo-title">Home Page</h2>
					</div>
				</div>
			</div>
		</section>
      );
  	}
 }

 export default Demo;
