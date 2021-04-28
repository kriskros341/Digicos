import uvicorn


if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8001, reload=True, ssl_keyfile="privkey.pem", ssl_certfile="fullchain.pem")
