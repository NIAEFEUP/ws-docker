# Dockerisation exercise: Python app

This a sample app, taken from https://github.com/digitalocean/sample-flask. To run it, you would normally install the requirements with:

```bash
pip install -r requirements.txt
```

And start the app by running:

```bash
python -m flask run --host=0.0.0.0
```

**Write a simple Dockerfile for the app.**

## Tips

- There is an official Docker base image for python called just `python`. I recommend using the `3.9.2-slim-buster` release.
- The app directory for this base image is `/usr/src/app`
- Don't forget to install the requirements first. Add the `--no-cache-dir` flag to pip to reduce image size

---

Sample app by Mason Egger, (c) 2020, used under the MIT license.
