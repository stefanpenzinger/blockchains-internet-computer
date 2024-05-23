import Random "mo:base/Random";
import Text "mo:base/Text";

actor SmileyGenerator {
  private func generate_hash(str : Text) : Nat {
    let seed = Text.encodeUtf8(str);
	return Random.rangeFrom(27, seed);
  };

  public func get_smiley_hash(name : Text) : async Nat {
    let hash = generate_hash(name);
	return hash;
  };
};
