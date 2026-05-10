from rest_framework import serializers
from .models import Product, PromoCode, Order, OrderItem

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'

class PromoCodeSerializer(serializers.ModelSerializer):
    class Meta:
        model = PromoCode
        fields = ['code', 'discount_percent']

class OrderItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderItem
        fields = ['product', 'quantity', 'price']

class OrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True)
    status_display = serializers.CharField(source='get_status_display', read_only=True)
    notification_message = serializers.CharField(read_only=True)
    
    class Meta:
        model = Order
        fields = [
            'id',
            'customer_name',
            'customer_phone',
            'total_price',
            'promo_code_used',
            'items',
            'status',
            'status_display',
            'cancellation_reason',
            'notification_message',
            'created_at',
            'updated_at',
        ]
        read_only_fields = ['id', 'status', 'status_display', 'notification_message', 'created_at', 'updated_at']
    
    def create(self, validated_data):
        items_data = validated_data.pop('items')
        request = self.context.get('request')
        if request and request.user.is_authenticated:
            validated_data['customer'] = request.user
        order = Order.objects.create(**validated_data)
        for item_data in items_data:
            OrderItem.objects.create(order=order, **item_data)
        return order
