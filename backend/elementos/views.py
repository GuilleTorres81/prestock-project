from django.shortcuts import render

# Create your views here.
def nuevo_elemento(request):
    if request.method == 'POST':
        # Aquí iría la lógica para procesar el formulario de nuevo elemento
        pass
    return render(request, 'elementos/nuevo_elemento.html')