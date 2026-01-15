require 'sketchup.rb'

module ShelfCalculator
  class ShelfOptimizer
    OPERATING_CLEARANCE = 0.3 # 3mm converted to cm
    
    def self.calculate_shelves(total_length, shelf_sizes, range_type = :classic_no_panel)
      @shelf_sizes = shelf_sizes.sort.reverse
      @total_length = total_length
      @best_solution = {
        shelves: [],
        total_length: 0,
        remaining_length: Float::INFINITY,
        panel_space: 0
      }
      
      try_combinations(total_length, [], 0)
      @best_solution
    end
    
    private
    
    def self.try_combinations(remaining, current_shelves, start_index)
      if remaining >= 0 && !current_shelves.empty?
        total_shelf_length = current_shelves.sum { |shelf| 
          (shelf[:length] + OPERATING_CLEARANCE) * shelf[:count] 
        }
        
        panel_space = calculate_panel_space(current_shelves)
        total_length = total_shelf_length + panel_space
        actual_remaining = @total_length - total_length
        
        if actual_remaining >= 0 && actual_remaining < @best_solution[:remaining_length]
          @best_solution = {
            shelves: current_shelves.dup,
            total_length: total_length,
            remaining_length: actual_remaining,
            panel_space: panel_space
          }
        end
      end
      
      @shelf_sizes.each_with_index do |size, i|
        next if i < start_index
        
        actual_size = size + OPERATING_CLEARANCE
        next if actual_size > remaining
        
        max_count = (remaining / actual_size).floor
        max_count.downto(1) do |count|
          try_combinations(
            remaining - (actual_size * count),
            current_shelves + [{length: size, count: count}],
            i + 1
          )
        end
      end
    end
    
    def self.calculate_panel_space(shelves)
      total_shelves = shelves.sum { |shelf| shelf[:count] }
      5.0 # Pour classic_no_panel, 5cm pour les piètements
    end
  end
  
  # Interface SketchUp
  class ShelfCalculatorTool
    def activate
      @ip = Sketchup::InputPoint.new
      update_status_text
    end
    
    def draw(view)
      @ip.draw(view) if @ip.valid?
    end
    
    def update_status_text
      Sketchup.status_text = "Cliquez pour placer les étagères"
    end
    
    def onMouseMove(flags, x, y, view)
      @ip.pick(view, x, y)
      view.invalidate
    end
    
    def onLButtonDown(flags, x, y, view)
      return unless @ip.valid?
      
      # Demander la longueur totale
      prompts = ["Longueur totale (cm)"]
      defaults = ["300"]
      input = UI.inputbox(prompts, defaults, "Calculateur d'Étagères")
      return unless input
      
      total_length = input[0].to_f
      shelf_sizes = [101, 90, 75, 50]
      
      # Calculer la solution optimale
      solution = ShelfOptimizer.calculate_shelves(total_length, shelf_sizes)
      
      # Créer un nouveau groupe pour les étagères
      model = Sketchup.active_model
      model.start_operation("Créer Étagères", true)
      
      group = model.active_entities.add_group
      entities = group.entities
      
      # Point de départ basé sur le point cliqué
      start_point = @ip.position
      current_x = 0
      
      # Dessiner chaque étagère
      solution[:shelves].each do |shelf|
        shelf_length = shelf[:length]
        count = shelf[:count]
        
        count.times do
          # Créer une face pour l'étagère (2cm d'épaisseur)
          points = [
            start_point.offset(Geom::Vector3d.new(current_x, 0, 0)),
            start_point.offset(Geom::Vector3d.new(current_x + shelf_length, 0, 0)),
            start_point.offset(Geom::Vector3d.new(current_x + shelf_length, 40, 0)),
            start_point.offset(Geom::Vector3d.new(current_x, 40, 0))
          ]
          
          face = entities.add_face(points)
          face.pushpull(-2.cm) # Épaisseur de 2cm
          
          current_x += shelf_length + OPERATING_CLEARANCE
        end
      end
      
      model.commit_operation
      
      # Afficher le résumé
      summary = "Solution:\n"
      solution[:shelves].each do |shelf|
        summary += "#{shelf[:count]} étagères de #{shelf[:length]}cm\n"
      end
      summary += "\nEspace restant: #{solution[:remaining_length].round(2)}cm"
      
      UI.messagebox(summary)
    end
  end
end

# Ajouter le menu dans SketchUp
unless file_loaded?(__FILE__)
  menu = UI.menu("Plugins")
  menu.add_item("Calculateur d'Étagères") {
    Sketchup.active_model.select_tool(ShelfCalculator::ShelfCalculatorTool.new)
  }
  file_loaded(__FILE__)
end