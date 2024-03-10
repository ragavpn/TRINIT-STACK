import pandas as pd
from PIL import Image
from IPython.display import display
from transformers import AdamW
import os
import torch
import warnings
from transformers import AutoModelForCausalLM, AutoProcessor

CUDA_LAUNCH_BLOCKING = 1
warnings.filterwarnings("ignore", category=UserWarning)
warnings.filterwarnings("ignore", category=DeprecationWarning)
warnings.filterwarnings("ignore", category=FutureWarning)


class MLModel:
    def __init__(self,checkpoint_path = "GIT.pt", model_name = "microsoft/git-base", learning_rate = 5e-5):
        self.device = device = "cuda" if torch.cuda.is_available() else "cpu"
        if os.path.exists(checkpoint_path):
            checkpoint = torch.load(checkpoint_path)
            model = AutoModelForCausalLM.from_pretrained(model_name).to(device)
            model.load_state_dict(checkpoint['model_state_dict'])
            optimizer = AdamW(model.parameters(), lr=learning_rate)
            optimizer.load_state_dict(checkpoint['optimizer_state_dict'])
            print("Loaded saved model")
        else:
            # Initialize model, optimizer, scheduler if checkpoint doesn't exist
            model = AutoModelForCausalLM.from_pretrained(model_name).to(device)
            optimizer = AdamW(model.parameters(), lr=learning_rate)

        self.model = model
        self.optimizer = optimizer
        self.processor = AutoProcessor.from_pretrained(model_name)

    def run(self, image_path):
        image = Image.open(image_path)
        image = image.resize((224, 224))
        image = image.convert("RGB")
        Image._show(image)
        input = self.processor(images = image, return_tensors="pt").to(self.device)['pixel_values']
        generated_ids = self.model.generate(pixel_values=input, max_length=50)
        generated_captions = self.processor.batch_decode(generated_ids, skip_special_tokens=True)

        return generated_captions[0]



        
