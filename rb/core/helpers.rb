# Covid19Data SDK helpers

module Covid19DataHelpers
  def self.to_map(v)
    v.is_a?(Hash) ? v : nil
  end

  def self.to_int(v)
    v.is_a?(Numeric) ? v.to_i : -1
  end

  def self.get_ctx_prop(m, key)
    return nil if m.nil?
    m[key]
  end
end
