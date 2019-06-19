defmodule Vintage.Repo do
  use Ecto.Repo,
    otp_app: :vintage,
    adapter: Ecto.Adapters.Postgres
end
