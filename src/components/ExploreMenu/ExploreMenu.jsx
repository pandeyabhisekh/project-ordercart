import "./ExploreMenu.css";
import { menu_list } from '../../assets/assets';

function ExploreMenu({ category, setCategory }) {
  const filteredMenuList = category === "All" ? menu_list : menu_list.filter(item => item.menu_name === category);

  return (
    <div className="explore-menu" id="explore-menu">
      <h1>Explore Our Menu</h1>
      <p className="explore-menu-text">Choose from a diverse menu featuring a delectable array of dishes. Our mission is to satisfy your cravings and elevate your dining experience, one delicious meal at a time.</p>
      <div className="explore-menu-list">
        {filteredMenuList.map((item, index) => (
          <div
            onClick={() => setCategory(prev => prev === item.menu_name ? "All" : item.menu_name)}
            className="explore-menu-list-item"
            key={index}
          >
            <img src={item.menu_image} alt={item.menu_name} />
            <p>{item.menu_name}</p>
          </div>
        ))}
        <div>
          <hr />
        </div>
      </div>
    </div>
  );
}

export default ExploreMenu;
