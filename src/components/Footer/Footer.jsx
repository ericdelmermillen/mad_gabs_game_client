import "./Footer.scss"

const Footer = ({user}) => {
  const currentYear = new Date().getFullYear();

  return (
    <>
      {user 

        ? 
          <div className="footer">
            <p className="footer__points">Total Points: 500, 000</p>
          
            <p className="footer__copyright">&copy; Mad Gabs Game {currentYear}</p>
          
            <p className="footer__rank">Rank: 100, 000 / 100,000 </p>
          
          </div>

        :
          <div className="footer footer__centered">
            <p className="footer__copyright">
              &copy; Mad Gabs Game {currentYear}
            </p>
          </div>
      }
    </>
  )};

export default Footer;