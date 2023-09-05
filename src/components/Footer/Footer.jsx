import "./Footer.scss";
import { useEffect } from 'react';

const Footer = ({user, setUser}) => {
  const currentYear = new Date().getFullYear();
  
      useEffect(() => {
        setUser(user)
        return () => {
        };
      }, [user]);

  return (
    <>
      {user

        ? 
          <div className="footer">
            <p className="footer__points">Total Points: {user.totalPoints}</p>
          
            <p className="footer__copyright">&copy; Mad Gabs Game {currentYear}</p>
          
            <p className="footer__rank">Rank: {user.ranking.userRank} / {user.ranking.totalPlayers} </p>
          
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