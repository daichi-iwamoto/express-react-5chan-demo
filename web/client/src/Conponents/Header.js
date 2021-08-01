import '../Style/Header.css';

function Header() {
  return (
    <header>
      <p className="logo">null ちゃんねる</p>
      <fieldset>
        <input type="text" />
        <label>&#x1f50d; 検索</label>
      </fieldset>
    </header>
  )
}

export default Header;