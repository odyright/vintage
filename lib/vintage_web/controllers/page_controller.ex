defmodule VintageWeb.PageController do
  use VintageWeb, :controller

  def index(conn, _params) do
    render(conn, "index.html")
  end
end
