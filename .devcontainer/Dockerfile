FROM mcr.microsoft.com/devcontainers/javascript-node:18-bullseye

ARG USER=vscode
ARG USER_ID=1000

RUN userdel -r node
RUN apt update && apt install sudo direnv python3 python3-pip -y
RUN python3 -m pip install --upgrade pip && pip install mkdocs-techdocs-core==1.0.2 

RUN useradd -m -u ${USER_ID} -s /bin/zsh ${USER}
RUN echo "${USER} ALL=(ALL) NOPASSWD:ALL" >> /etc/sudoers
USER vscode 
RUN sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"
RUN echo 'eval "$(direnv hook zsh)"' >> "/home/${USER}/.zshrc"
RUN mkdir -p "/home/${USER}/.config/direnv" && printf "[whitelist]\nprefix = [ \"/workspace\" ]" >> "/home/${USER}/.config/direnv/direnv.toml"
