from rest_framework import serializers

from users.models import ProfileImage


class ProfileImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProfileImage
        fields = ['id', 'profile', 'image']


class ChangeProfileImageSerializer(serializers.ModelSerializer):
    button_numbers = serializers.ListField(child=serializers.IntegerField(), write_only=True, required=False)
    uploaded_images = serializers.ListField(
        child=serializers.ImageField(allow_empty_file=False, use_url=False),
        write_only=True,
    )

    def create(self, validated_data):
        profile = validated_data.pop('profile')
        uploaded_images = validated_data.pop('uploaded_images')
        button_numbers = validated_data.pop('button_numbers')

        for uploaded_image, button_number in zip(uploaded_images, button_numbers):
            existing_image = ProfileImage.objects.filter(profile=profile, button_number=button_number).first()

            if existing_image:
                existing_image.image = uploaded_image
                existing_image.save()
            else:
                new_image = ProfileImage.objects.create(
                    profile=profile,
                    button_number=button_number,
                    image=uploaded_image
                )

        return new_image if not existing_image else existing_image

    class Meta:
        model = ProfileImage
        fields = ('profile', 'uploaded_images', 'button_numbers')
